"use client"

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  isEditing?: boolean;
}


interface NewProductState {
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
}

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<NewProductState>({ name: '', description: '', image_url: '', price: 0, category: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json() as Product[];
    setProducts(data.map(product => ({ ...product, isEditing: false })));
  };

  const addProduct = async () => {
    const res = await fetch('/api/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      const product = await res.json();
      setProducts([...products, product]);
    } else {
    }
  };

 const updateProduct = async (product: Product) => {
  const { isEditing, ...productData } = product; 

  const res = await fetch(`/api/products/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData), 
  });

    if (res.ok) {
    const updated = await res.json();
    console.log('Failed to update product');
    setProducts(products.map(p => p.id === product.id ? { ...updated, isEditing: false } : p));
  } else {
    console.error('Failed to update product');
  }
};

  const deleteProduct = async (id: string) => {
    const res = await fetch('/api/products/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
      if (res.ok) {
      setProducts(products.filter(product => product.id !== id));
    } else {
      console.error('Failed to delete product');
    }
  };

  const toggleEdit = (id: string) => {
    setProducts(products.map(product => product.id === id ? { ...product, isEditing: !product.isEditing } : product));
  };
  
  const handleInputChange = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(product => product.id === id ? { ...product, [field]: value } : product));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-5 text-white">Product Management</h1>
      
      {/* Add Product Form */}
      <div className="mb-10 ">
        <h2 className="text-xl font-semibold  mb-4 text-white">Add a New Product</h2>
        <div className="flex gap-4 mb-4 text-gray-600">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Name"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={newProduct.image_url}
            onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
            placeholder="Image URL"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            placeholder="Price"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            placeholder="Category"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button onClick={addProduct} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Product Name</th>
              <th scope="col" className="py-3 px-6">Description</th>
              <th scope="col" className="py-3 px-6">Image</th>
              <th scope="col" className="py-3 px-6">Price</th>
              <th scope="col" className="py-3 px-6">Category</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
  {products.map((product) => (
    <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
      {product.isEditing ? (
        <>
          <td className="py-4 px-6">
            <input type="text" value={product.name} onChange={(e) => handleInputChange(product.id, 'name', e.target.value)} className="p-2 border border-gray-300 rounded" />
          </td>
          <td className="py-4 px-6">
            <input type="text" value={product.description} onChange={(e) => handleInputChange(product.id, 'description', e.target.value)} className="p-2 border border-gray-300 rounded" />
          </td>
          <td className="py-4 px-6">
            <input type="text" value={product.image_url} onChange={(e) => handleInputChange(product.id, 'image_url', e.target.value)} className="p-2 border border-gray-300 rounded" />
          </td>
          <td className="py-4 px-6">
            <input type="number" value={product.price} onChange={(e) => handleInputChange(product.id, 'price', parseFloat(e.target.value))} className="p-2 border border-gray-300 rounded" />
          </td>
          <td className="py-4 px-6">
            <input type="text" value={product.category} onChange={(e) => handleInputChange(product.id, 'category', e.target.value)} className="p-2 border border-gray-300 rounded" />
          </td>
        </>
      ) : (
        <>
          <td className="py-4 px-6">{product.name}</td>
          <td className="py-4 px-6">{product.description}</td>
          <td className="py-4 px-6"><img src={product.image_url} alt={product.name} className="w-10 h-10 rounded-full" /></td>
          <td className="py-4 px-6">${product.price}</td>
          <td className="py-4 px-6">{product.category}</td>
        </>
      )}
      <td className="py-4 px-6">
        {product.isEditing ? (
          <button onClick={() => updateProduct(product)} className="text-sm bg-green-500 text-white py-1 px-3 rounded mr-2">
            Save
          </button>
        ) : (
          <button onClick={() => toggleEdit(product.id)} className="text-sm bg-blue-500 text-white py-1 px-3 rounded mr-2">
            Edit
          </button>
        )}
        <button onClick={() => deleteProduct(product.id)} className="text-sm bg-red-500 text-white py-1 px-3 rounded">
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdmin;

