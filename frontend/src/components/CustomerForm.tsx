import { useState } from "react";
import { addCustomer } from "../services/customer.service";
import toast from "react-hot-toast";

interface CustomerFormProps {
    reloadCustomers: () => void;
}

function CustomerForm({ reloadCustomers }: CustomerFormProps) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            await addCustomer({
                name,
                email,
                phone,
                address
            });

            toast.success("Customer added successfully");

            setName("");
            setEmail("");
            setPhone("");
            setAddress("");

            reloadCustomers();

        } catch (error) {

            console.error(error);
            toast.error("Failed to add customer");

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h3>Add Customer</h3>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
            />

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
            />

            <button type="submit">
                Add Customer
            </button>

        </form>

    );
}

export default CustomerForm;