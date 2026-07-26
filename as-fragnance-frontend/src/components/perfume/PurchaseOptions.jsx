"use client";
import React, { useState } from 'react';
import { FiMinus, FiPlus, FiShoppingBag, FiAlertCircle } from 'react-icons/fi';
import { useCartStore } from '@/lib/useCartStore';
import { toast } from 'sonner';

const PurchaseOptions = ({ perfume, basePrice, stock }) => {
  // Default selected size is 3ml
  const [selectedSize, setSelectedSize] = useState('3ml');
  const [quantity, setQuantity] = useState(1);

  // Zustand Store Function
  const addToCart = useCartStore((state) => state.addToCart);

  // Safely fallback variables
  const safeBasePrice = basePrice || perfume?.price || 0;
  const safeStock = stock || perfume?.stock;
  const isInStock = safeStock === 'InStock';

  const sizes = [
    { label: '3ml', multiplier: 1 },
    { label: '6ml', multiplier: 1.8 },
    { label: '12ml', multiplier: 3.2 },
    { label: '30ml', multiplier: 7.5 },
    { label: '100ml', multiplier: 22 },
  ];

  const currentPrice = Math.round(Number(safeBasePrice) * sizes.find(s => s.label === selectedSize).multiplier);
  const totalPrice = currentPrice * quantity;

  // --- Add to Cart Handler ---
  const handleAddToCart = () => {
    if (!perfume) {
      toast.error("Product data missing!");
      return;
    }

    // Override the base price with the calculated size price
    const customProductData = {
      ...perfume,
      price: currentPrice
    };

    // Add the item 'quantity' times to respect the user's selection
    for (let i = 0; i < quantity; i++) {
      addToCart(customProductData, selectedSize);
    }
  };

  return (
    <div className="space-y-10">

      {/* --- ML Selection --- */}
      <div className="flex flex-col items-center sm:items-start">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Select Bottle Size</span>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
          {sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size.label)}
              className={`px-5 py-2.5 rounded-xl border text-[11px] uppercase tracking-wider font-bold transition-all duration-300 ${
                selectedSize === size.label
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20 scale-105'
                  : 'bg-white text-stone-500 border-stone-200 hover:border-amber-400 hover:text-amber-700'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- Quantity & Price Row --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-stone-50 p-6 rounded-[1.5rem] border border-stone-100">

        {/* Price Display */}
        <div className="flex flex-col items-center sm:items-start w-full sm:w-auto justify-center text-center sm:text-left">
          <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mb-1.5">
            Total Amount (BDT)
          </span>
          <span className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight flex items-center justify-center sm:justify-start gap-1">
            <span>৳</span>
            <span>{totalPrice.toLocaleString('en-IN')}</span>
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <span className="text-[10px] text-stone-400 uppercase tracking-widest sm:hidden">Quantity</span>
          <div className="flex items-center bg-white rounded-xl p-1.5 border border-stone-200 shadow-sm">
            <button
              onClick={() => quantity > 1 && setQuantity(prev => prev - 1)}
              className="w-10 h-10 flex items-center justify-center bg-stone-50 rounded-lg text-stone-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <FiMinus />
            </button>
            <span className="w-12 text-center font-bold text-stone-800 text-lg select-none">{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="w-10 h-10 flex items-center justify-center bg-stone-50 rounded-lg text-stone-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          disabled={!isInStock}
          onClick={handleAddToCart}
          className={`flex-1 py-5 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-500 shadow-xl ${
            isInStock
             ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-stone-900/20 active:scale-95 cursor-pointer'
             : 'bg-stone-200 text-stone-400 shadow-none cursor-not-allowed'
          }`}
        >
          {isInStock ? (
             <>
               <FiShoppingBag className="text-lg" />
               Add to Cart
             </>
          ) : (
             <>
               <FiAlertCircle className="text-lg" />
               Out of Stock
             </>
          )}
        </button>
      </div>

    </div>
  );
};

export default PurchaseOptions;