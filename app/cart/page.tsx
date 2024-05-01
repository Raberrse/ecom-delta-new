"use client";
import React, { useEffect, useState } from "react";
import {
  CartItem,
  clearCart,
  getCartItems,
  removeFromCart,
} from "@/utils/helpers";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const onClearCart = () => {
    setCartItems([]);
    clearCart();
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price.toString()),
      0
    );
  };

  const handleOrderNow = async () => {
    console.log(cartItems)
    const response = await fetch("/api/orderNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });

    if (response.ok) {
      router.push("/order-success"); 
      clearCart();
      setCartItems([]);
    } else {
      throw new Error("Failed to place order");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-2"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-cover mr-4"
              />
              <span className="flex-1">
                {item.name} - ${parseFloat(item.price.toString()).toFixed(2)}
              </span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-xl font-semibold mb-4">
            Total: ${getTotalPrice().toFixed(2)}
          </div>
          <button
            onClick={onClearCart}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
          >
            Clear Cart
          </button>
          <button
            onClick={handleOrderNow}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Order Now
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
