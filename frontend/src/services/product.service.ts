import api from "./api";
import type { Product } from "../types/product";

export const getProducts = async (
    params?: {
        name?: string;
        minPrice?: number;
        maxPrice?: number;
    }
): Promise<Product[]> => {

    const response = await api.get("/products", {
        params
    });

    return response.data;
};

export const addProduct = async (
    product: Omit<Product, "id">
) => {
    const response = await api.post("/products", product);
    return response.data;
};

export const updateProduct = async (
    id: number,
    product: Omit<Product, "id">
) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};