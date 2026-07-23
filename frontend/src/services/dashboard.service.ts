import api from "./api";

export interface DashboardStats {
    totalProducts: number;
    totalCustomers: number;
    lowStock: number;
    totalSales: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get("/dashboard");
    return response.data;
};