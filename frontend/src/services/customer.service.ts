import api from "./api";
import type { Customer } from "../types/customer";

export const getCustomers = async (): Promise<Customer[]> => {
    const response = await api.get("/customers");
    return response.data;
};

export const addCustomer = async (
    customer: Omit<Customer, "id">
) => {
    const response = await api.post("/customers", customer);
    return response.data;
};

export const updateCustomer = async (
    id: number,
    customer: Omit<Customer, "id">
) => {
    const response = await api.put(`/customers/${id}`, customer);
    return response.data;
};

export const deleteCustomer = async (id: number) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
};