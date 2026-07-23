import { useEffect, useState } from "react";
import type { Product } from "../types/product";

import ProductForm from "../components/ProductForm";

import ProductTable from "../components/ProductTable";
import Card from "../components/Card";

import { getProducts } from "../services/product.service";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

const loadProducts = async () => {
    try {
        setLoading(true);

        const data = await getProducts();

        setProducts(data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }
};

if (loading) {
    return <h2>Loading Products...</h2>;
}
    return (

    <>


        <h2>Products</h2>

        <div
    style={{
        display:"flex",
        gap:"10px",
        margin:"20px 0"
    }}
>


<input
    placeholder="Search product"
    value={search}
    onChange={(e)=>
        setSearch(e.target.value)
    }
/>


<input
    type="number"
    placeholder="Min price"
    value={minPrice}
    onChange={(e)=>
        setMinPrice(e.target.value)
    }
/>

<input
    type="number"
    placeholder="Max price"
    value={maxPrice}
    onChange={(e)=>
        setMaxPrice(e.target.value)
    }
/>


<button onClick={loadProducts}>
    Search
</button>
</div>
        <ProductForm 
            reloadProducts={loadProducts}
        />
{
    loading ?

    (
        <p>
            Loading products...
        </p>
    ):
    error ?

    (
        <p>
            {error}
        </p>
    )
    :
    products.length === 0 ? (
    <p>No products found</p>
) : (
    <Card title="Product List">
        <ProductTable
            products={products}
            reloadProducts={loadProducts}
        />
    </Card>
)

}
    </>

);
}

export default Products;