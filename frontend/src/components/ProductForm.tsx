import { useState } from "react";
import { addProduct } from "../services/product.service";
import toast from "react-hot-toast";

interface ProductFormProps {
    reloadProducts: () => void;
}

function ProductForm({ reloadProducts }: ProductFormProps) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [sku, setSku] = useState("");
const [category, setCategory] = useState("");
const [minStock, setMinStock] = useState("");
const [warehouse, setWarehouse] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            await addProduct({
    name,
    sku,
    category,
    price: Number(price),
    stock: Number(stock),
    min_stock: Number(minStock),
    warehouse
});

            toast.success("Product added successfully");


            setName("");
setSku("");
setCategory("");
setPrice("");
setStock("");
setMinStock("");
setWarehouse("");

            await reloadProducts();


        } catch(error) {

            console.error(error);

            toast.error("Failed to add product");

        }
    };


    return (

        <form onSubmit={handleSubmit}>

    <h3>Add Product</h3>

    <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
    />

    <input
        type="text"
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
    />

    <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
    />

    <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
    />

    <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
    />

    <input
        type="number"
        placeholder="Minimum Stock"
        value={minStock}
        onChange={(e) => setMinStock(e.target.value)}
    />

    <input
        type="text"
        placeholder="Warehouse"
        value={warehouse}
        onChange={(e) => setWarehouse(e.target.value)}
    />

    <button type="submit">
        Add Product
    </button>

</form>

    );
}

export default ProductForm;