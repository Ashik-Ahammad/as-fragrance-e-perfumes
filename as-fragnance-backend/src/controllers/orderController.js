const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");
const { generateCustomOrderId, sendOrderEmails } = require("../utils/orderUtils");

const getOrdersCollection = () => getDB().collection("orders");
const getPerfumesCollection = () => getDB().collection("perfumes");
const getCombosCollection = () => getDB().collection("combos");

// Size multipliers matching the frontend PurchaseOptions.jsx
const sizeMultipliers = {
  "3ml": 1,
  "6ml": 1.8,
  "12ml": 3.2,
  "30ml": 7.5,
  "100ml": 22,
};

exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    orderData.createdAt = new Date();
    orderData.paymentStatus =
      orderData.payment.method === "cod"
        ? "Pending (COD)"
        : "Awaiting Verification";
        
    if (!orderData.payment.status) orderData.payment.status = "Unpaid";

    // --- SECURITY ENHANCEMENT: Recalculate prices from DB ---
    let calculatedSubtotal = 0;
    
    // Fetch all items from DB to prevent frontend price manipulation
    for (let item of orderData.items) {
      if (!item.productId) continue;
      
      let dbPrice = 0;
      
      // Determine if item is a Combo or Perfume based on selected size
      if (item.size === "Combo Pack") {
        const combo = await getCombosCollection().findOne({ _id: new ObjectId(item.productId) });
        if (combo) dbPrice = Number(combo.price);
      } else {
        const perfume = await getPerfumesCollection().findOne({ _id: new ObjectId(item.productId) });
        if (perfume) {
          const basePrice = Number(perfume.price);
          const multiplier = sizeMultipliers[item.size] || 1;
          dbPrice = Math.round(basePrice * multiplier);
        }
      }
      
      // Override the frontend's price with the DB price
      item.price = dbPrice;
      calculatedSubtotal += (dbPrice * Number(item.quantity || 1));
    }
    
    // Validate financials to prevent negative manipulations
    const deliveryCharge = Math.max(0, Number(orderData.financials.deliveryCharge || 0));
    const discount = Math.max(0, Number(orderData.financials.discount || 0));
    
    // Calculate final grand total safely on the server
    const grandTotal = Math.max(0, calculatedSubtotal + deliveryCharge - discount);
    
    // Override the financials object completely
    orderData.financials = {
      subtotal: calculatedSubtotal,
      deliveryCharge,
      discount,
      grandTotal,
    };
    // --------------------------------------------------------

    const result = await getOrdersCollection().insertOne(orderData);
    const firstItemName = orderData.items[0]?.title || "PRD";
    const customOrderId = generateCustomOrderId(firstItemName, result.insertedId);

    await getOrdersCollection().updateOne(
      { _id: result.insertedId },
      { $set: { customOrderId: customOrderId } }
    );

    // Trigger Email asynchronously
    sendOrderEmails(orderData, customOrderId).catch(console.error);

    res.json({
      success: true,
      customOrderId,
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error during order submission" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};
    if (email) query = { "customer.email": email };
    
    const result = await getOrdersCollection()
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
      
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.syncGuestOrders = async (req, res) => {
  try {
    const { email, orders } = req.body;
    if (!email || !orders || orders.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Invalid sync payload" });

    const orderIds = orders
      .map((order) => order.customOrderId)
      .filter(Boolean);
      
    if (orderIds.length > 0) {
      await getOrdersCollection().updateMany(
        { customOrderId: { $in: orderIds } },
        { $set: { "customer.email": email } }
      );
    }
    
    res.status(200).json({
      success: true,
      message: "Guest orders synced successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error during sync",
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const result = await getOrdersCollection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { paymentStatus: req.body.status } }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update delivery status" });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const result = await getOrdersCollection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { "payment.status": req.body.paymentState } }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update payment status" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const result = await getOrdersCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};
