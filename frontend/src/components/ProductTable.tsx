import { useState } from "react";
import type { Product } from "../types/product";
import "../styles/table.css";

import toast from "react-hot-toast";

import {
    deleteProduct,
    updateProduct
} from "../services/product.service";


interface ProductTableProps {
    products: Product[];
    reloadProducts: () => void;
}


function ProductTable({
    products,
    reloadProducts
}: ProductTableProps) {


    const [editProductId, setEditProductId] = useState<number | null>(null);

const [editData, setEditData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    min_stock: "",
    warehouse: ""
});


    // Delete Product
    const handleDelete = async (id: number) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

        await deleteProduct(id);

        toast.success("Product deleted successfully");

        reloadProducts();

    } catch (error) {

        console.error(error);

        toast.error("Failed to delete product");

    }

};


    // Open Edit Mode
    const handleEdit = (product: Product) => {
        setEditProductId(product.id);
        setEditData({
    name: product.name,
    sku: product.sku,
    category: product.category,
    price: String(product.price),
    stock: String(product.stock),
    min_stock: String(product.min_stock),
    warehouse: product.warehouse
});

    };

    // Update Product
    const handleUpdate = async () => {


        if(editProductId === null)
            return;

        try {
            await updateProduct(
    editProductId,
    {
        name: editData.name,
        sku: editData.sku,
        category: editData.category,
        price: Number(editData.price),
        stock: Number(editData.stock),
        min_stock: Number(editData.min_stock),
        warehouse: editData.warehouse
    }
);

            toast.success("Product updated successfully");

            setEditProductId(null);

            reloadProducts();

        } catch(error) {

            console.error(error);

            toast.error("Update failed");

        }

    };

    return (

    <table
        style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            background: "white"
        }}
    >

       <thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>SKU</th>
<th>Category</th>
<th>Price</th>
<th>Stock</th>
<th>Minimum Stock</th>
<th>Warehouse</th>
<th>Actions</th>
</tr>
</thead>


        <tbody>
{products.map((product) => (
<tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>
<td>{product.id}</td>

<td>
{editProductId===product.id?
<input
value={editData.name}
onChange={(e)=>setEditData({...editData,name:e.target.value})}
/>
:
product.name}
</td>

<td>{product.sku}</td>

<td>{product.category}</td>

<td>
{editProductId===product.id?
<input
type="number"
value={editData.price}
onChange={(e)=>setEditData({...editData,price:e.target.value})}
/>
:
product.price}
</td>

<td>
{editProductId===product.id?
<input
type="number"
value={editData.stock}
onChange={(e)=>setEditData({...editData,stock:e.target.value})}
/>
:
product.stock}
</td>

<td>{product.min_stock}</td>

<td>{product.warehouse}</td>

<td>
{editProductId===product.id?
<button onClick={handleUpdate}>Save</button>
:
<button onClick={()=>handleEdit(product)}>Edit</button>
}

<button
style={{marginLeft:"10px"}}
onClick={()=>handleDelete(product.id)}
>
Delete
</button>
</td>

</tr>
))}
</tbody>


    </table>

);

}

export default ProductTable;