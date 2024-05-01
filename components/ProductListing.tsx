"use client";
import React, { useEffect, useState } from "react";
import { addToCart } from "@/utils/helpers"; 

interface Product {
  id: string;  
  name: string;
  description: string;
  image_url: string;
  price: number;
}

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json() as Product[];
        setProducts(data);
      } catch (err: any) {
        console.error("Fetch error:", err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-lg font-bold mb-1">
              {product.name} - ${product.price}
            </h2>
            <p className="mb-2">{product.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url 
              })}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProductListing;
