export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export const getCartItems = (): CartItem[] => {
  const items = localStorage.getItem("cart");
  return items ? JSON.parse(items) : [];
};

export const addToCart = (item: CartItem) => {
  const cartItems = getCartItems();
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (!existingItem) {
    localStorage.setItem("cart", JSON.stringify([...cartItems, item]));
  }
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const removeFromCart = (id: string) => {
  const cartItems = getCartItems();
  const filteredItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(filteredItems));
};
