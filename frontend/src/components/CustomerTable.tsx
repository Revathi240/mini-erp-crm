import { useState } from "react";
import type { Customer } from "../types/customer";
import toast from "react-hot-toast";
import "../styles/table.css";

import {
    deleteCustomer,
    updateCustomer
} from "../services/customer.service";

interface CustomerTableProps {
    customers: Customer[];
    reloadCustomers: () => void;
}

function CustomerTable({
    customers,
    reloadCustomers
}: CustomerTableProps) {

    const [editId, setEditId] = useState<number | null>(null);

    const [editData, setEditData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleEdit = (customer: Customer) => {
        setEditId(customer.id);
        setEditData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address
        });
    };

    const handleUpdate = async () => {

        if (editId === null) return;

        try {

            await updateCustomer(editId, editData);

            toast.success("Customer updated successfully");

            setEditId(null);

            reloadCustomers();

        } catch (error) {

            console.error(error);

            toast.error("Update failed");

        }

    };

    const handleDelete = async (id: number) => {

        if (!window.confirm("Delete this customer?")) return;

        try {

            await deleteCustomer(id);

            toast.success("Customer deleted successfully");

            reloadCustomers();

        } catch (error) {

            console.error(error);

            toast.error("Delete failed");

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

            <thead style={{ background: "#f2f2f2" }}>

                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>

            </thead>

            <tbody>

                {customers.map((customer) => (

                    <tr key={customer.id}>

                        <td>{customer.id}</td>

                        <td>
                            {editId === customer.id ? (
                                <input
                                    value={editData.name}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            name: e.target.value
                                        })
                                    }
                                />
                            ) : (
                                customer.name
                            )}
                        </td>

                        <td>
                            {editId === customer.id ? (
                                <input
                                    value={editData.email}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            email: e.target.value
                                        })
                                    }
                                />
                            ) : (
                                customer.email
                            )}
                        </td>

                        <td>
                            {editId === customer.id ? (
                                <input
                                    value={editData.phone}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            phone: e.target.value
                                        })
                                    }
                                />
                            ) : (
                                customer.phone
                            )}
                        </td>

                        <td>
                            {editId === customer.id ? (
                                <input
                                    value={editData.address}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            address: e.target.value
                                        })
                                    }
                                />
                            ) : (
                                customer.address
                            )}
                        </td>

                        <td>

                            {editId === customer.id ? (

                                <button onClick={handleUpdate}>
                                    Save
                                </button>

                            ) : (

                                <button onClick={() => handleEdit(customer)}>
                                    Edit
                                </button>

                            )}

                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => handleDelete(customer.id)}
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

export default CustomerTable;