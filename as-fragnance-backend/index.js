const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8888;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`),
);

// ==========================================
// NODEMAILER TRANSPORTER SETUP
// ==========================================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function for sending order emails
const sendOrderEmails = async (orderData, customOrderId) => {
  const { customer, financials, items, payment } = orderData;

  const itemsHtml = items
    .map(
      (item) =>
        ` <tr> <td style=" padding:14px 12px; border-bottom:1px solid #f1f5f9; color:#111827; font-size:14px; line-height:1.7; word-break:break-word; "> <strong>${item.title}</strong> <div style=" color:#6b7280; font-size:12px; margin-top:4px; "> Size: ${item.size} </div> </td> <td style=" padding:14px 12px; border-bottom:1px solid #f1f5f9; text-align:center; color:#111827; font-size:14px; font-weight:700; vertical-align:middle; "> ${item.quantity} </td> <td style=" padding:14px 12px; border-bottom:1px solid #f1f5f9; text-align:right; color:#d97706; font-size:14px; font-weight:800; vertical-align:middle; white-space:nowrap; "> ${item.price * item.quantity} BDT </td> </tr> `,
    )
    .join("");

  // Customer Email HTML
  const customerHtml = `
  <div style=" margin:0; padding:20px 10px; background:#f5f7fb; font-family:Arial,sans-serif; color:#1f2937; ">

  <div style=" width:100%; max-width:680px; margin:auto; background:#ffffff; border-radius:22px; overflow:hidden; border:1px solid #eceff3; ">

    <div style="
      background:
      radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 30%),
      linear-gradient(135deg,#111827,#1f2937,#374151);
      padding:50px 38px;
      text-align:center;
    ">

      <div style="
        display:inline-block;
        padding:10px 18px;
        border-radius:999px;
        background:rgba(255,255,255,0.08);
        border:1px solid rgba(255,255,255,0.08);
        color:#f9fafb;
        font-size:13px;
        letter-spacing:.5px;
        font-weight:600;
      ">
        ✨ Luxury Fragrance Order
      </div>

      <h1 style="
        margin:22px 0 0;
        color:#ffffff;
        font-size:36px;
        line-height:1.2;
        font-weight:800;
        letter-spacing:-1px;
      ">
        Thank You For Your Order
      </h1>

      <p style="
        margin:16px auto 0;
        max-width:520px;
        color:rgba(255,255,255,0.75);
        font-size:15px;
        line-height:1.9;
      ">
        Your premium fragrance order has been successfully placed and is now being prepared with care.
      </p>

    </div>

    <div style="padding:42px 38px;">

      <p style="
        margin:0;
        color:#374151;
        font-size:16px;
        line-height:1.9;
      ">
        Hello <strong>${customer.name}</strong>,
      </p>

      <p style="
        margin-top:18px;
        color:#4b5563;
        font-size:15px;
        line-height:2;
      ">
        Thank you for shopping with <strong>AS Fragrance</strong>. We truly appreciate your trust in our premium collection.
      </p>

      <!-- Order Info Card -->
      <div style="
        margin-top:30px;
        background:linear-gradient(to right,#fff7ed,#ffffff);
        border:1px solid #fde7c3;
        border-radius:24px;
        padding:28px;
      ">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tbody>

            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;width:180px;">
                🧾 Order ID
              </td>

              <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:700;">
                ${customOrderId}
              </td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;">
                💳 Payment Method
              </td>

              <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:700;">
                ${payment.method.toUpperCase()}
              </td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;">
                💰 Total Bill
              </td>

              <td style="
                padding:10px 0;
                color:#d97706;
                font-size:18px;
                font-weight:800;
              ">
                ${financials.grandTotal} BDT
              </td>
            </tr>

            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;vertical-align:top;">
                📍 Delivery Address
              </td>

              <td style="
                padding:10px 0;
                color:#111827;
                font-size:14px;
                line-height:1.8;
                font-weight:600;
              ">
                ${customer.address}, ${customer.thana}, ${customer.district}
              </td>
            </tr>

          </tbody>
        </table>

      </div>

      <div style="margin-top:36px;">

        <h3 style="
          margin:0 0 18px;
          color:#111827;
          font-size:22px;
          font-weight:800;
          letter-spacing:-0.5px;
        ">
          Order Summary
        </h3>

        <div style="
          border:1px solid #eceff3;
          border-radius:22px;
          overflow:hidden;
        ">

          <table style="
            width:100%;
            border-collapse:collapse;
            font-size:14px;
          ">

            <thead>
              <tr style="background:#f8fafc;">
                <th style="
                  padding:16px;
                  text-align:left;
                  color:#6b7280;
                  font-size:12px;
                  letter-spacing:1px;
                  text-transform:uppercase;
                ">
                  Product
                </th>

                <th style="
                  padding:16px;
                  text-align:center;
                  color:#6b7280;
                  font-size:12px;
                  letter-spacing:1px;
                  text-transform:uppercase;
                ">
                  Qty
                </th>

                <th style="
                  padding:16px;
                  text-align:right;
                  color:#6b7280;
                  font-size:12px;
                  letter-spacing:1px;
                  text-transform:uppercase;
                ">
                  Price
                </th>
              </tr>
            </thead>

            <tbody>
              ${itemsHtml}
            </tbody>

          </table>

        </div>

      </div>

      <div style="
        margin-top:34px;
        padding:24px;
        border-radius:22px;
        background:linear-gradient(to right,#eff6ff,#f8fafc);
        border:1px solid #dbeafe;
      ">

        <p style="
          margin:0;
          color:#475569;
          font-size:14px;
          line-height:2;
        ">
          🚚 Your order is currently being processed and will be dispatched shortly.
          If you need any assistance, simply reply to this email or contact us directly at
          <strong>+8801575606733</strong>.
        </p>

      </div>

      <div style="
        margin-top:42px;
        padding-top:28px;
        border-top:1px solid #eceff3;
      ">

        <p style="
          margin:0;
          color:#111827;
          font-size:16px;
          font-weight:700;
        ">
          Best Regards,
        </p>

        <div style="margin-top:14px;">

          <div style="
            font-size:22px;
            font-weight:800;
            color:#111827;
            letter-spacing:-0.7px;
          ">
            AS Fragrance
          </div>

          <div style="
            margin-top:6px;
            color:#6b7280;
            font-size:14px;
            line-height:1.8;
          ">
            Luxury Fragrance Collection • Crafted Elegance
          </div>

        </div>

      </div>

    </div>

    <div style="
      background:#f8fafc;
      border-top:1px solid #eceff3;
      padding:24px;
      text-align:center;
    ">

      <p style="
        margin:0;
        color:#9ca3af;
        font-size:12px;
        line-height:1.8;
      ">
        © 2026 AS Fragrance — Premium scents crafted for unforgettable impressions.
      </p>

    </div>

  </div>

</div>
`;

  // Admin Alert Email HTML
  const adminHtml = ` <div style="margin:0;padding:40px 20px;background:#f5f7fb;font-family:Arial,sans-serif;color:#1f2937;"> <div style=" max-width:680px; margin:auto; background:#ffffff; border-radius:28px; overflow:hidden; border:1px solid #eceff3; box-shadow:0 18px 50px rgba(15,23,42,0.08); "> <div style=" background: radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 30%), linear-gradient(135deg,#065f46,#047857,#10b981); padding:50px 38px; "> <div style=" display:inline-block; padding:10px 18px; border-radius:999px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.08); color:#ecfdf5; font-size:13px; font-weight:700; letter-spacing:.5px; "> 🎉 New Order Notification </div> <h1 style=" margin:22px 0 0; color:#ffffff; font-size:34px; line-height:1.2; font-weight:800; letter-spacing:-1px; "> New Order Received </h1> <p style=" margin:16px 0 0; color:rgba(255,255,255,0.78); font-size:15px; line-height:1.9; max-width:520px; "> A new customer order has been successfully placed on AS Fragrance. </p> </div> <div style="padding:42px 38px;"> <div style=" background:linear-gradient(to right,#ecfdf5,#ffffff); border:1px solid #d1fae5; border-radius:24px; padding:30px; "> <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"> <tbody> <tr> <td style=" padding:12px 0; color:#6b7280; font-size:13px; width:180px; "> 🧾 Order ID </td> <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:800; "> ${customOrderId} </td> </tr> <tr> <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 👤 Customer Name </td> <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:700; "> ${customer.name} </td> </tr> <tr> <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 📞 Phone Number </td> <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:700; "> ${customer.phone} </td> </tr> <tr> <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 📧 Email Address </td> <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:700; "> ${customer.email || "N/A"} </td> </tr> <tr> <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 💳 Payment Method </td> <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:700; "> ${payment.method.toUpperCase()} </td> </tr> ${payment.transactionId ? ` <tr> <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 🪪 Transaction ID </td> <td style=" padding:12px 0; color:#db2777; font-size:15px; font-weight:800; "> ${payment.transactionId} </td> </tr> ` : ""} </tbody> </table> </div> <div style=" margin-top:34px; border-radius:24px; background:linear-gradient(135deg,#111827,#1f2937); padding:32px; text-align:center; "> <p style=" margin:0; color:#9ca3af; font-size:13px; letter-spacing:1px; text-transform:uppercase; "> Total Order Value </p> <h2 style=" margin:14px 0 0; color:#ffffff; font-size:42px; font-weight:900; letter-spacing:-1px; "> ${financials.grandTotal} BDT </h2> </div> <div style=" margin-top:34px; padding:24px; border-radius:22px; background:#f8fafc; border:1px solid #eceff3; "> <p style=" margin:0; color:#475569; font-size:14px; line-height:2; "> Please review this order from the admin dashboard and proceed with payment verification, packaging, and delivery processing. </p> </div> <div style=" margin-top:42px; padding-top:26px; border-top:1px solid #eceff3; "> <div style=" font-size:22px; font-weight:900; color:#111827; letter-spacing:-0.7px; "> AS Fragrance </div> <div style=" margin-top:8px; color:#6b7280; font-size:14px; line-height:1.8; "> Automated Order Management System </div> </div> </div> <div style=" background:#f8fafc; border-top:1px solid #eceff3; padding:22px; text-align:center; "> <p style=" margin:0; color:#9ca3af; font-size:12px; line-height:1.8; "> © 2026 AS Fragrance — Premium fragrance commerce platform. </p> </div> </div> </div> `;

  try {
    // Send to Customer (if email exists)
    if (customer.email) {
      await transporter.sendMail({
        from: `"AS Fragrance" <${process.env.EMAIL_USER}>`,
        to: customer.email,
        subject: `Order Confirmation - ${customOrderId}`,
        html: customerHtml,
      });
    }

    // Send to Admin
    await transporter.sendMail({
      from: `"AS Fragrance System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Order Alert: ${customOrderId} (${financials.grandTotal} BDT)`,
      html: adminHtml,
    });
  } catch (error) {
    console.error("Failed to send order emails:", error);
  }
};

//  Basic token verify
const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token format" });
  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.tokenPayload = payload;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden - Token expired or invalid" });
  }
};

//  Admin-only verify
const verifyAdmin = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token format" });
  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.tokenPayload = payload;

    const email = payload?.email || payload?.sub;
    if (!email)
      return res.status(403).json({ message: "Forbidden - No email in token" });

    const db = client.db("as_fragrance");
    const userCollection = db.collection("user");
    const dbUser = await userCollection.findOne({ email });

    if (dbUser?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden - Admin only" });
    }

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden - Token expired or invalid" });
  }
};

const generateCustomOrderId = (perfumeName, mongoId) => {
  const idSuffix = mongoId.toString().slice(-4).toUpperCase();
  const cleanName = perfumeName.replace(/\s+/g, "");
  const namePrefix = cleanName.substring(0, 3).toUpperCase();
  return `ASF-ORDER-${namePrefix}-${idSuffix}`;
};

async function run() {
  try {
    // await client.connect();
    const db = client.db("as_fragrance");

    const perfumeCollection = db.collection("perfumes");
    const ordersCollection = db.collection("orders");
    const couponCollection = db.collection("coupons");
    const bannerCollection = db.collection("banners");
    const comboCollection = db.collection("combos");
    const userCollection = db.collection("user");
    const reviewCollection = db.collection("reviews");

    // ==========================================
    // BANNER ROUTES
    // ==========================================

    app.get("/banners", async (req, res) => {
      try {
        const result = await bannerCollection
          .find()
          .sort({ order: 1 })
          .toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch banners" });
      }
    });

    app.post("/banners", verifyAdmin, async (req, res) => {
      try {
        const result = await bannerCollection.insertOne(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to add banner" });
      }
    });

    app.patch("/banners/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await bannerCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body },
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to update banner" });
      }
    });

    app.delete("/banners/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await bannerCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to delete banner" });
      }
    });

    // ==========================================
    // COMBO ROUTES
    // ==========================================

    app.get("/combos", async (req, res) => {
      try {
        const result = await comboCollection.find().toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch combos" });
      }
    });

    app.get("/combos/:id", async (req, res) => {
      try {
        const result = await comboCollection.findOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch combo" });
      }
    });

    app.post("/combos", verifyAdmin, async (req, res) => {
      try {
        const result = await comboCollection.insertOne(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to add combo" });
      }
    });

    app.patch("/combos/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await comboCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body },
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to update combo" });
      }
    });

    app.delete("/combos/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await comboCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to delete combo" });
      }
    });

    // ==========================================
    // COUPON ROUTES
    // ==========================================

    app.post("/coupons", verifyAdmin, async (req, res) => {
      try {
        const { code, discountPercent } = req.body;
        const result = await couponCollection.insertOne({
          code: code.toUpperCase(),
          discountPercent: Number(discountPercent),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to save coupon" });
      }
    });

    app.post("/verify-coupon", async (req, res) => {
      try {
        const { code } = req.body;
        const coupon = await couponCollection.findOne({
          code: code.toUpperCase(),
        });
        if (coupon) {
          res.json({ success: true, discountPercent: coupon.discountPercent });
        } else {
          res.status(400).json({ success: false, message: "Invalid Coupon" });
        }
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    });

    app.get("/coupons", verifyAdmin, async (req, res) => {
      try {
        const result = await couponCollection.find().toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch coupons" });
      }
    });

    app.delete("/coupons/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await couponCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to delete coupon" });
      }
    });

    // ==========================================
    // PERFUME ROUTES
    // ==========================================

    app.post("/perfume", verifyAdmin, async (req, res) => {
      try {
        const result = await perfumeCollection.insertOne(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to add perfume" });
      }
    });

    // SEARCH PERFUMES BY NAME OR CATEGORY
    app.get("/perfume", async (req, res) => {
      try {
        const { search } = req.query;

        let query = {};

        // regex search for perfumeTitle OR category
        if (search) {
          query = {
            $or: [
              {
                perfumeTitle: {
                  $regex: search,
                  $options: "i",
                },
              },
              {
                category: {
                  $regex: search,
                  $options: "i",
                },
              },
            ],
          };
        }

        const result = await perfumeCollection.find(query).toArray();

        res.json(result);
      } catch (error) {
        res.status(500).json({
          message: "Failed to fetch perfumes",
        });
      }
    });

    app.get("/perfume/:id", async (req, res) => {
      try {
        const result = await perfumeCollection.findOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch perfume details" });
      }
    });

    app.patch("/perfume/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await perfumeCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body },
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to update perfume" });
      }
    });

    app.delete("/perfume/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await perfumeCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to delete perfume" });
      }
    });

    // ==========================================
    // ORDER ROUTES
    // ==========================================

    app.post("/orders", async (req, res) => {
      try {
        const orderData = req.body;
        orderData.createdAt = new Date();
        orderData.paymentStatus =
          orderData.payment.method === "cod"
            ? "Pending (COD)"
            : "Awaiting Verification";
        if (!orderData.payment.status) orderData.payment.status = "Unpaid";

        const result = await ordersCollection.insertOne(orderData);
        const firstItemName = orderData.items[0]?.title || "PRD";
        const customOrderId = generateCustomOrderId(
          firstItemName,
          result.insertedId,
        );

        await ordersCollection.updateOne(
          { _id: result.insertedId },
          { $set: { customOrderId: customOrderId } },
        );

        // ✅ Trigger Email asynchronously
        sendOrderEmails(orderData, customOrderId).catch(console.error);

        res.json({
          success: true,
          customOrderId,
          insertedId: result.insertedId,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Internal server error during order submission" });
      }
    });

    app.get("/orders", verifyToken, async (req, res) => {
      try {
        const { email } = req.query;
        let query = {};
        if (email) query = { "customer.email": email };
        const result = await ordersCollection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
      }
    });

    app.post("/orders/sync", verifyToken, async (req, res) => {
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
          await ordersCollection.updateMany(
            { customOrderId: { $in: orderIds } },
            { $set: { "customer.email": email } },
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
    });

    app.patch("/orders/:id/status", verifyAdmin, async (req, res) => {
      try {
        const result = await ordersCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { paymentStatus: req.body.status } },
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to update delivery status" });
      }
    });

    app.patch("/orders/:id/payment", verifyAdmin, async (req, res) => {
      try {
        const result = await ordersCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { "payment.status": req.body.paymentState } },
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to update payment status" });
      }
    });

    app.delete("/orders/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await ordersCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to delete order" });
      }
    });

    // ==========================================
    // USER MANAGEMENT ROUTES
    // ==========================================

    app.get("/users", verifyAdmin, async (req, res) => {
      try {
        const result = await userCollection
          .find({}, { projection: { password: 0 } })
          .sort({ createdAt: -1 })
          .toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
      }
    });

    app.patch("/users/role", verifyAdmin, async (req, res) => {
      try {
        const { email, role } = req.body;
        if (!email || !role)
          return res.status(400).json({ message: "Email and role required" });
        if (!["admin", "user"].includes(role))
          return res.status(400).json({ message: "Invalid role" });

        const result = await userCollection.updateOne(
          { email: email.toLowerCase() },
          { $set: { role } },
        );

        if (result.matchedCount === 0)
          return res.status(404).json({ message: "User not found" });
        res.json({
          success: true,
          message: `Role updated to "${role}" for ${email}`,
        });
      } catch (error) {
        res.status(500).json({ message: "Failed to update user role" });
      }
    });

    app.delete("/users/:id", verifyAdmin, async (req, res) => {
      try {
        const result = await userCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
      }
    });

    app.get("/user-role", async (req, res) => {
      try {
        const internalKey = req.headers["x-internal-key"];
        const expectedKey =
          process.env.INTERNAL_API_KEY || "as-fragrance-internal";

        if (internalKey !== expectedKey) {
          return res.status(403).json({ message: "Forbidden" });
        }

        const { email } = req.query;
        if (!email) return res.status(400).json({ message: "Email required" });

        const user = await userCollection.findOne(
          { email: decodeURIComponent(email).toLowerCase() },
          { projection: { role: 1 } },
        );

        res.json({ role: user?.role || "user" });
      } catch (error) {
        console.error("[user-role] error:", error);
        res.status(500).json({ role: "user" });
      }
    });

    // ==========================================
    // REVIEW ROUTES
    // ==========================================

    // Get Reviews for a specific perfume
    app.get("/reviews/:perfumeId", async (req, res) => {
      try {
        const { perfumeId } = req.params;
        const result = await reviewCollection
          .find({ perfumeId })
          .sort({ createdAt: -1 })
          .toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews" });
      }
    });

    // Post a new Review (Only Logged in Users)
    app.post("/reviews", verifyToken, async (req, res) => {
      try {
        const reviewData = req.body;
        reviewData.createdAt = new Date();
        const result = await reviewCollection.insertOne(reviewData);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to post review" });
      }
    });

    // Get ALL recent reviews (For Home Page Slider)
    app.get("/reviews", async (req, res) => {
      try {
        const result = await reviewCollection
          .find()
          .sort({ createdAt: -1 })
          .limit(10)
          .toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch all reviews" });
      }
    });

    // ==========================================
    // NEWSLETTER ROUTE
    // ==========================================
    app.post("/newsletter", async (req, res) => {
      try {
        const { email } = req.body;
        if (!email)
          return res.status(400).json({ message: "Email is required" });

        const newsletterCollection = db.collection("newsletters");
        const existing = await newsletterCollection.findOne({ email });

        if (existing) {
          return res.status(400).json({ message: "Already subscribed!" });
        }

        await newsletterCollection.insertOne({
          email,
          subscribedAt: new Date(),
        });
        res
          .status(200)
          .json({ success: true, message: "Subscribed successfully!" });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("Ping Pong. AS-F Server successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("AS Fragrance - Secured Server is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
