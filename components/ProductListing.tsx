"use client"
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
}

interface FetchResponse {
  data: Product[];
  error?: string;
}

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-1 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4">
          <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
          <h2 className="text-lg font-bold">{product.name} - ${product.price}</h2>
          <p>{product.description}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
