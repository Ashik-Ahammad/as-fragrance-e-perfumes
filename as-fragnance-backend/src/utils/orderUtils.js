const transporter = require("../config/email");
const { getCustomerEmailHtml, getAdminEmailHtml } = require("./emailTemplates");

/**
 * Generates a custom order ID based on the first item name and MongoDB Object ID
 * @param {string} perfumeName First item name in the order
 * @param {ObjectId} mongoId MongoDB Inserted ID
 * @returns {string} Custom formatted order ID (e.g., ASF-ORDER-ROU-AB12)
 */
const generateCustomOrderId = (perfumeName, mongoId) => {
  const idSuffix = mongoId.toString().slice(-4).toUpperCase();
  const cleanName = perfumeName.replace(/\s+/g, "");
  const namePrefix = cleanName.substring(0, 3).toUpperCase();
  return `ASF-ORDER-${namePrefix}-${idSuffix}`;
};

/**
 * Sends order confirmation emails to the customer and admin
 * @param {Object} orderData The order details
 * @param {string} customOrderId Generated custom order ID
 */
const sendOrderEmails = async (orderData, customOrderId) => {
  const { customer, financials, items } = orderData;

  const itemsHtml = items
    .map(
      (item) =>
        ` <tr> 
            <td style=" padding:14px 12px; border-bottom:1px solid #f1f5f9; color:#111827; font-size:14px; line-height:1.7; word-break:break-word; "> 
              <strong>${item.title}</strong> 
              <div style=" color:#6b7280; font-size:12px; margin-top:4px; "> Size: ${item.size} </div> 
            </td> 
            <td style=" padding:14px 12px; border-bottom:1px solid #f1f5f9; text-align:center; color:#111827; font-size:14px; font-weight:700; vertical-align:middle; "> 
              ${item.quantity} 
            </td> 
            <td style=" padding:14px 12px; border-bottom:1px solid #f1f5f9; text-align:right; color:#d97706; font-size:14px; font-weight:800; vertical-align:middle; white-space:nowrap; "> 
              ${item.price * item.quantity} BDT 
            </td> 
          </tr> `
    )
    .join("");

  const customerHtml = getCustomerEmailHtml(orderData, customOrderId, itemsHtml);
  const adminHtml = getAdminEmailHtml(orderData, customOrderId);

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

module.exports = {
  generateCustomOrderId,
  sendOrderEmails,
};
