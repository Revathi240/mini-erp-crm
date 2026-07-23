import { useEffect, useState } from "react";
import type { Customer } from "../types/customer";

import Card from "../components/Card";
import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";

import { getCustomers } from "../services/customer.service";

function Customers() {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {

        try {

            const data = await getCustomers();

            setCustomers(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
    return <h2>Loading Customers...</h2>;
}

    return (

        <>

            <h2>Customers</h2>

            <CustomerForm
                reloadCustomers={loadCustomers}
            />

            {
                loading ?

                    <p>Loading...</p>

                    :

                    <Card title="Customer List">
    <CustomerTable
        customers={customers}
        reloadCustomers={loadCustomers}
    />
</Card>
            }

        </>

    );

}

export default Customers;