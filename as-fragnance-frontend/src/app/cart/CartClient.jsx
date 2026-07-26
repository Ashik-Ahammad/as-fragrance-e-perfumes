"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/useCartStore";
import {
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCheckCircle,
  FiArrowLeft,
  FiTag,
  FiCreditCard,
  FiDollarSign,
  FiSmartphone,
} from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "sonner";

// --- BD Data Arrays ---
const districts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokati",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Maulvibazar",
  "Meherpur",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Nawabganj",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajgonj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
].sort();

const dhakaMetroThanas = [
  "Adabor",
  "Badda",
  "Bangshal",
  "Bimanbandar",
  "Cantonment",
  "Chakbazar",
  "Dakshinkhan",
  "Darus Salam",
  "Demra",
  "Dhanmondi",
  "Gendaria",
  "Gulshan",
  "Hazaribagh",
  "Jatrabari",
  "Kadamtali",
  "Kafrul",
  "Kalabagan",
  "Kamrangirchar",
  "Khilgaon",
  "Khilkhet",
  "Kotwali",
  "Lalbagh",
  "Mirpur",
  "Mohammadpur",
  "Motijheel",
  "Mugda",
  "New Market",
  "Pallabi",
  "Paltan",
  "Ramna",
  "Rampura",
  "Sabujbagh",
  "Shah Ali",
  "Shahbagh",
  "Sher-e-Bangla Nagar",
  "Shyampur",
  "Sutrapur",
  "Tejgaon",
  "Turag",
  "Uttara",
  "Uttar Khan",
  "Vatara",
  "Wari",
].sort();
const dhakaSuburbs = [
  "Savar",
  "Ashulia",
  "Dhamrai",
  "Keraniganj",
  "Nawabganj",
  "Dohar",
].sort();
const allDhakaThanas = [...dhakaMetroThanas, ...dhakaSuburbs].sort();

const CartItemImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(
    src || "/assets/defaultPerfumeImage.png",
  );
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full bg-stone-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-stone-200 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="100px"
        className={`object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc("/assets/defaultPerfumeImage.png");
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default function CartClient() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart } =
    useCartStore();

  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactionId, setTransactionId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const deliveryCharge = useMemo(() => {
    if (!district) return 0;
    if (district !== "Dhaka") return 120;
    if (dhakaMetroThanas.includes(thana)) return 60;
    if (dhakaSuburbs.includes(thana)) return 120;
    return 0;
  }, [district, thana]);

  const grandTotal = subtotal + deliveryCharge - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-coupon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: couponCode }),
        },
      );

      const data = await res.json();

      if (data.success) {
        const discountAmount = Math.round(
          (subtotal * data.discountPercent) / 100,
        );
        setDiscount(discountAmount);
        setIsCouponApplied(true);
        toast.success(`${data.discountPercent}% discount applied!`);
      } else {
        toast.error(data.message || "Invalid or Expired Coupon");
        setDiscount(0);
        setIsCouponApplied(false);
      }
    } catch (error) {
      toast.error("Failed to verify coupon. Check server connection.");
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return toast.error("Your cart is empty!");
    if (!district) return toast.error("Please select a District.");
    if (district === "Dhaka" && !thana)
      return toast.error("Please select a Thana.");
    if (paymentMethod === "bkash" && !transactionId)
      return toast.error("Transaction ID is required for bKash!");

    setIsSubmitting(true);
    const loadingToast = toast.loading("Processing your premium order...");
    const formData = new FormData(e.currentTarget);
    const customerInfo = Object.fromEntries(formData.entries());

    const orderPayload = {
      customer: {
        name: customerInfo.customerName,
        phone: customerInfo.customerPhone,
        email: customerInfo.customerEmail,
        district: district,
        thana: thana || "N/A",
        address: customerInfo.customerAddress,
      },
      payment: {
        method: paymentMethod,
        transactionId: paymentMethod === "bkash" ? transactionId : null,
        status: "Unpaid",
      },
      items: cartItems.map((item) => ({
        productId: item._id,
        title: item.title,
        size: item.selectedSize,
        price: item.price,
        quantity: item.quantity,
      })),
      financials: {
        subtotal,
        deliveryCharge,
        discount,
        grandTotal,
      },
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success("Order confirmed successfully! ✨", { id: loadingToast });

        const newOrder = {
          ...orderPayload,
          customOrderId: result.customOrderId,
          createdAt: new Date().toISOString(),
        };

        const existingGuestOrders = JSON.parse(
          localStorage.getItem("as_guest_orders") || "[]",
        );
        existingGuestOrders.push(newOrder);
        localStorage.setItem(
          "as_guest_orders",
          JSON.stringify(existingGuestOrders),
        );

        clearCart();
        router.push("/profile");
      } else {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Server Error: ${res.status}`);
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to place order. Check server connection.",
        { id: loadingToast },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#fcfaf8] min-h-screen pt-32 pb-20 flex items-center justify-center font-sans text-stone-700">
        <div className="max-w-md w-full mx-auto text-center px-6">
          <div className="w-20 h-20 bg-white rounded-full border border-stone-100 flex items-center justify-center text-stone-300 mx-auto mb-6 shadow-xs">
            <FiShoppingBag className="text-3xl" />
          </div>
          <h2 className="font-serif text-2xl text-stone-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
            You have not selected any luxury fragrances yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-stone-900 text-white font-bold tracking-widest uppercase text-xs px-8 py-4 rounded-xl hover:bg-amber-600 transition-all duration-300"
          >
            <FiArrowLeft className="text-sm" /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-50 via-stone-50 to-white min-h-screen text-stone-700 font-sans pt-28 pb-20 relative overflow-hidden selection:bg-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-2">
            Checkout Terminal
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light tracking-wide">
            REVIEW YOUR OLFACTORY SELECTIONS AND ENTER SECURE DELIVERY DISPATCH
            PARAMETERS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-xl shadow-stone-200/40">
              <h2 className="text-lg font-serif text-stone-900 mb-6 pb-4 border-b border-stone-100">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item._id}-${item.selectedSize}`}
                    className="flex gap-4 p-4 md:p-5 bg-white rounded-2xl border border-stone-100 shadow-2xs relative group"
                  >
                    <div className="relative w-24 md:w-28 h-28 md:h-32 rounded-xl overflow-hidden border border-stone-100 shrink-0">
                      <CartItemImage src={item.image} alt={item.title} />
                    </div>

                    <div className="flex flex-col justify-between flex-1 min-w-0 pr-12 md:pr-14">
                      <div>
                        <h4 className="font-serif text-base md:text-lg font-medium text-stone-900 truncate tracking-wide">
                          {item.title}
                        </h4>
                        <span className="inline-block px-2 py-1 bg-stone-50 text-stone-500 border border-stone-200 text-[10px] font-bold tracking-wider rounded-md uppercase mt-1.5">
                          {item.selectedSize}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                        <div className="flex items-center border border-stone-200 bg-white rounded-lg overflow-hidden shadow-sm p-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.selectedSize,
                                "decrease",
                              )
                            }
                            className="p-2.5 md:p-3 text-stone-500 hover:bg-stone-50 transition-colors"
                          >
                            <FiMinus className="text-base md:text-lg" />
                          </button>
                          <span className="px-3 md:px-5 text-sm md:text-base font-semibold text-stone-800 min-w-8 md:min-w-10 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.selectedSize,
                                "increase",
                              )
                            }
                            className="p-2.5 md:p-3 text-stone-500 hover:bg-stone-50 transition-colors"
                          >
                            <FiPlus className="text-base md:text-lg" />
                          </button>
                        </div>
                        <div className="flex items-center text-base md:text-lg font-semibold text-stone-900 gap-0.5">
                          <FaBangladeshiTakaSign className="text-sm md:text-base" />
                          <span>{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item._id, item.selectedSize)
                      }
                      className="absolute top-4 right-4 text-stone-300 hover:text-rose-600 p-2.5 md:p-3 rounded-md transition-colors"
                    >
                      <FiTrash2 className="text-xl md:text-2xl" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic Coupon Section */}
              <div className="mt-8 pt-6 border-t border-stone-100">
                <label className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">
                  <FiTag className="text-xs" /> Apply Coupon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={isCouponApplied}
                    placeholder="Enter discount code"
                    className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-all uppercase placeholder:normal-case"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isCouponApplied || !couponCode}
                    className="bg-stone-900 text-white px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- Billing Dispatch Form --- */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-5 space-y-6">
            <div className="bg-white/60 backdrop-blur-md border border-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-stone-200/40 space-y-6">
              <h2 className="text-lg font-serif text-stone-900 pb-2 border-b border-stone-100">
                Shipping Details
              </h2>

              <div className="group flex flex-col">
                <label className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                  <FiUser className="text-xs" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  name="customerName"
                  placeholder="Abu Abdullah"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 shadow-2xs transition-all"
                />
              </div>

              <div className="group flex flex-col">
                <label className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                  <FiPhone className="text-xs" /> Phone Number
                </label>
                <input
                  required
                  type="tel"
                  name="customerPhone"
                  placeholder="017XXXXXXXX"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 shadow-2xs transition-all"
                />
              </div>

              <div className="group flex flex-col">
                <label className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                  <FiMail className="text-xs" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  name="customerEmail"
                  placeholder="abdullah@email.com"
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 shadow-2xs transition-all"
                />
              </div>

              {/* Advanced District & Thana Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                    <FiMapPin className="text-xs" /> District
                  </label>
                  <select
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setThana("");
                    }}
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 shadow-2xs transition-all cursor-pointer"
                    required
                  >
                    <option value="" disabled>
                      Select District
                    </option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {district === "Dhaka" && (
                  <div className="flex flex-col">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                      <FiMapPin className="text-xs" /> Thana / Area
                    </label>
                    <select
                      value={thana}
                      onChange={(e) => setThana(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 shadow-2xs transition-all cursor-pointer"
                      required
                    >
                      <option value="" disabled>
                        Select Thana
                      </option>
                      <optgroup label="Inside Metro (৳60)">
                        {dhakaMetroThanas.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Outside Metro (৳120)">
                        {dhakaSuburbs.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                )}
              </div>

              <div className="group flex flex-col">
                <label className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                  <FiMapPin className="text-xs" /> Full Address
                </label>
                <textarea
                  required
                  rows="2"
                  name="customerAddress"
                  placeholder="House, Road, Details..."
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-amber-500 shadow-2xs transition-all resize-none"
                />
              </div>

              {/* --- Payment Toggles & Inputs --- */}
              <div className="pt-4 border-t border-stone-100">
                <h2 className="text-lg font-serif text-stone-900 pb-4">
                  Payment Method
                </h2>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all ${paymentMethod === "cod" ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-500 border-stone-200 hover:border-amber-400"}`}
                  >
                    <FiDollarSign className="text-lg" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      COD
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bkash")}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all ${paymentMethod === "bkash" ? "bg-pink-600 text-white border-pink-600" : "bg-white text-stone-500 border-stone-200 hover:border-pink-400"}`}
                  >
                    <FiSmartphone className="text-lg" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      bKash
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all ${paymentMethod === "bank" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-stone-500 border-stone-200 hover:border-indigo-400"}`}
                  >
                    <FiCreditCard className="text-lg" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      Bank
                    </span>
                  </button>
                </div>

                {/* Conditional Payment Details */}
                {paymentMethod === "bkash" && (
                  <div className="p-4 bg-pink-50 border border-pink-100 rounded-xl mb-4 space-y-3">
                    <p className="text-xs text-pink-900 leading-relaxed">
                      Send <strong>৳ {grandTotal}</strong> to our bKash Personal
                      Number:{" "}
                      <strong className="select-all">017XXXXXXXX</strong>
                    </p>
                    <input
                      type="text"
                      minLength={6}
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter bKash TrxID here"
                      className="w-full bg-white border border-pink-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-pink-500 transition-all"
                    />
                  </div>
                )}
                {paymentMethod === "bank" && (
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-4">
                    <p className="text-xs text-indigo-900 leading-relaxed">
                      <strong>Bank:</strong> City Bank Ltd
                      <br />
                      <strong>Account Name:</strong> AS Fragrance
                      <br />
                      <strong>Account No:</strong> 11223344556677
                      <br />
                      <span className="text-[10px] mt-2 block opacity-80">
                        * Please use your name as the reference.
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Ledger Statement Calculations */}
              <div className="pt-4 border-t border-stone-100 space-y-3 text-sm">
                <div className="flex justify-between text-stone-500">
                  <span className="font-light">Subtotal</span>
                  <div className="flex items-center font-medium gap-0.5">
                    <FaBangladeshiTakaSign className="text-xs" />
                    <span>{subtotal}</span>
                  </div>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="font-light">Discount Applied</span>
                    <div className="flex items-center font-medium gap-0.5">
                      - <FaBangladeshiTakaSign className="text-xs" />
                      <span>{discount}</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span className="font-light">Delivery Dispatches</span>
                  <div className="flex items-center font-medium gap-0.5">
                    {deliveryCharge > 0 ? (
                      <>
                        <FaBangladeshiTakaSign className="text-xs" />
                        <span>{deliveryCharge}</span>
                      </>
                    ) : (
                      <span className="text-[10px] text-amber-600 font-bold tracking-wide uppercase">
                        Select Location
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-base font-medium text-stone-900 pt-2 border-t border-dashed border-stone-200">
                  <span className="font-serif tracking-wide">Grand Total</span>
                  <div className="flex items-center font-bold gap-0.5">
                    <FaBangladeshiTakaSign className="text-xs" />
                    <span>{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Submission */}
              <button
                disabled={
                  isSubmitting ||
                  !district ||
                  (district === "Dhaka" && !thana) ||
                  (paymentMethod === "bkash" && !transactionId)
                }
                type="submit"
                className={`w-full py-4.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-md transition-all hover:cursor-pointer duration-300 ${
                  !district ||
                  (district === "Dhaka" && !thana) ||
                  (paymentMethod === "bkash" && !transactionId)
                    ? "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                    : "bg-stone-900 text-white hover:bg-amber-600 cursor-pointer"
                }`}
              >
                <FiCheckCircle className="text-sm" />{" "}
                {isSubmitting ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
