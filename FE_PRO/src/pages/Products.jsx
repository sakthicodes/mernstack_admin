import React, { useEffect, useState } from "react";
import { useProductStore } from "../models/productStore";

const Products = () => {
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", category: "" });
  const [editingProduct, setEditingProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await addProduct(newProduct);
    setNewProduct({ name: "", price: "", description: "", category: ""});
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true); 
  };

  const handleModalUpdate = async () => {
    if (editingProduct) {
      await updateProduct(editingProduct._id, editingProduct); 
      setEditingProduct(null);
      setIsModalOpen(false); 
      fetchProducts();
    }
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="m-10 p-5 shadow-Shadowcur items-center content-center flex justify-center">
      <div className="w-full p-5">
        <h2 className="text-2xl pb-3 font-semibold">Manage Products</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
            <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
         <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Category</option>
            <option value="Home Appliance">Home Appliance</option>
            <option value="Kitchen Appliance">Kitchen Appliance</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
            <option value="Sports & Fitness">Sports & Fitness</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Automotive">Automotive</option>
            <option value="Groceries">Groceries</option>
            <option value="Stationery">Stationery</option>
          </select>

          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Product</button>
        </form>

        <h3 className="mt-6 text-xl  font-medium">Existing Products</h3>
        <div  className="max-h-80 overflow-y-auto">
        <table className="min-w-full   mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Price</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border p-3">{product.name}</td>
                <td className="border p-3">{product.price}</td>
                <td className="border p-3">{product.description}</td>
                <td className="border p-3">{product.category}</td>
                <td className="border p-3">
                  <button onClick={() => handleEditClick(product)} className="bg-yellow-400 text-white px-4 py-2 rounded-md mr-2">Update</button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
              <h3 className="text-xl font-semibold">Edit Product</h3>
              <input
                type="text"
                placeholder="Product Name"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full p-2 border rounded-md mt-4"
              />
              <input
                type="number"
                placeholder="Price"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                className="w-full p-2 border rounded-md mt-4"
              />
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Category</option>
                  <option value="Home Appliance">Home Appliance</option>
                  <option value="Kitchen Appliance">Kitchen Appliance</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Toys & Games">Toys & Games</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Stationery">Stationery</option>
                </select>

              <textarea
                placeholder="Description"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full p-2 border rounded-md mt-4"
              />
              <div className="mt-4 flex justify-end space-x-4">
                <button onClick={handleModalUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
