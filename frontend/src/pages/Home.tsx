import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../services/product.service";
import ProductTable from "../components/ProductTable";

function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Mini ERP CRM</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ProductTable
    products={products}
    reloadProducts={loadProducts}
/>
            )}
        </div>
    );
}

export default Home;