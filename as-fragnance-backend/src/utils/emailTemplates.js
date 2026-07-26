/**
 * Generates HTML string for the customer order confirmation email
 * @param {Object} orderData The order details
 * @param {string} customOrderId The generated custom order ID
 * @param {string} itemsHtml The HTML string of order items
 * @returns {string} Customer Email HTML
 */
const getCustomerEmailHtml = (orderData, customOrderId, itemsHtml) => {
  const { customer, financials, payment } = orderData;
  return `
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
};

/**
 * Generates HTML string for the Admin order notification email
 * @param {Object} orderData The order details
 * @param {string} customOrderId The generated custom order ID
 * @returns {string} Admin Email HTML
 */
const getAdminEmailHtml = (orderData, customOrderId) => {
  const { customer, financials, payment } = orderData;
  return `
  <div style="margin:0;padding:40px 20px;background:#f5f7fb;font-family:Arial,sans-serif;color:#1f2937;">
    <div style=" max-width:680px; margin:auto; background:#ffffff; border-radius:28px; overflow:hidden; border:1px solid #eceff3; box-shadow:0 18px 50px rgba(15,23,42,0.08); ">
      <div style=" background: radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 30%), linear-gradient(135deg,#065f46,#047857,#10b981); padding:50px 38px; ">
        <div style=" display:inline-block; padding:10px 18px; border-radius:999px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.08); color:#ecfdf5; font-size:13px; font-weight:700; letter-spacing:.5px; ">
          🎉 New Order Notification
        </div>
        <h1 style=" margin:22px 0 0; color:#ffffff; font-size:34px; line-height:1.2; font-weight:800; letter-spacing:-1px; ">
          New Order Received
        </h1>
        <p style=" margin:16px 0 0; color:rgba(255,255,255,0.78); font-size:15px; line-height:1.9; max-width:520px; ">
          A new customer order has been successfully placed on AS Fragrance.
        </p>
      </div>
      <div style="padding:42px 38px;">
        <div style=" background:linear-gradient(to right,#ecfdf5,#ffffff); border:1px solid #d1fae5; border-radius:24px; padding:30px; ">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tbody>
              <tr>
                <td style=" padding:12px 0; color:#6b7280; font-size:13px; width:180px; "> 🧾 Order ID </td>
                <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:800; "> ${customOrderId} </td>
              </tr>
              <tr>
                <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 👤 Customer Name </td>
                <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:700; "> ${customer.name} </td>
              </tr>
              <tr>
                <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 📞 Phone Number </td>
                <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:700; "> ${customer.phone} </td>
              </tr>
              <tr>
                <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 📧 Email Address </td>
                <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:700; "> ${customer.email || "N/A"} </td>
              </tr>
              <tr>
                <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 💳 Payment Method </td>
                <td style=" padding:12px 0; color:#111827; font-size:15px; font-weight:700; "> ${payment.method.toUpperCase()} </td>
              </tr>
              ${
                payment.transactionId
                  ? `
              <tr>
                <td style=" padding:12px 0; color:#6b7280; font-size:13px; "> 🪪 Transaction ID </td>
                <td style=" padding:12px 0; color:#db2777; font-size:15px; font-weight:800; "> ${payment.transactionId} </td>
              </tr>
              `
                  : ""
              }
            </tbody>
          </table>
        </div>
        <div style=" margin-top:34px; border-radius:24px; background:linear-gradient(135deg,#111827,#1f2937); padding:32px; text-align:center; ">
          <p style=" margin:0; color:#9ca3af; font-size:13px; letter-spacing:1px; text-transform:uppercase; "> Total Order Value </p>
          <h2 style=" margin:14px 0 0; color:#ffffff; font-size:42px; font-weight:900; letter-spacing:-1px; "> ${financials.grandTotal} BDT </h2>
        </div>
        <div style=" margin-top:34px; padding:24px; border-radius:22px; background:#f8fafc; border:1px solid #eceff3; ">
          <p style=" margin:0; color:#475569; font-size:14px; line-height:2; ">
            Please review this order from the admin dashboard and proceed with payment verification, packaging, and delivery processing.
          </p>
        </div>
        <div style=" margin-top:42px; padding-top:26px; border-top:1px solid #eceff3; ">
          <div style=" font-size:22px; font-weight:900; color:#111827; letter-spacing:-0.7px; "> AS Fragrance </div>
          <div style=" margin-top:8px; color:#6b7280; font-size:14px; line-height:1.8; "> Automated Order Management System </div>
        </div>
      </div>
      <div style=" background:#f8fafc; border-top:1px solid #eceff3; padding:22px; text-align:center; ">
        <p style=" margin:0; color:#9ca3af; font-size:12px; line-height:1.8; "> © 2026 AS Fragrance — Premium fragrance commerce platform. </p>
      </div>
    </div>
  </div>
  `;
};

module.exports = {
  getCustomerEmailHtml,
  getAdminEmailHtml,
};
