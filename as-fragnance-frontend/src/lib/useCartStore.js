import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Global Cart State Management Store using Zustand with Persistence.
 * Syncs the compiled cart items with browser localStorage automatically.
 */
export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],       // Array storing compiled cart objects
      isCartOpen: false,   // Structural visibility state of the slide-out sidebar drawer

      // --- Sidebar Visibility Handlers ---
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      /**
       * Appends an item to the global cart matrix.
       */
      addToCart: (product, size) =>
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item._id === product._id && item.selectedSize === size
          );

          if (existingItemIndex > -1) {
            const updatedCart = [...state.cartItems];
            updatedCart[existingItemIndex].quantity += 1;
            return { cartItems: updatedCart, isCartOpen: true };
          }

          const newItem = {
            _id: product._id,
            title: product.perfumeTitle,
            image: product.imageUrl || "/assets/defaultPerfumeImage.png",
            category: product.category,
            price: product.price,
            selectedSize: size,
            quantity: 1,
          };

          return { cartItems: [...state.cartItems, newItem], isCartOpen: true };
        }),

      /**
       * Adjusts volume matrix configuration settings.
       */
      updateQuantity: (id, size, action) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) => {
              if (item._id === id && item.selectedSize === size) {
                const newQty = action === "increase" ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQty };
              }
              return item;
            })
            .filter((item) => item.quantity > 0),
        })),

      /**
       * Forcefully removes target records from runtime configuration mappings.
       */
      removeFromCart: (id, size) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item._id === id && item.selectedSize === size)
          ),
        })),

      /**
       * Resets collection state indexes cleanly upon transactional completion routines.
       */
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "as-fragrance-cart", // Unique storage identifier key inside localStorage
    }
  )
);