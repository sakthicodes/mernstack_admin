import { create } from "zustand";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../controllers/productController";

export const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    const products = await fetchProducts();
    set({ products });
  },
  addProduct: async (product) => {
    const newProduct = await addProduct(product);
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },
  updateProduct: async (id, updatedProduct) => {
    const updated = await updateProduct(id, updatedProduct);
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? updated : product
      ),
    }));
  },
  deleteProduct: async (id) => {
    await deleteProduct(id);
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },
}));
