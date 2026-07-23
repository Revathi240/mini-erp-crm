import SalesForm from "../components/SalesForm";
import SalesTable from "../components/SalesTable";
import Card from "../components/Card";

function Sales() {
  return (
    <>
      <h1>Sales Challan Management</h1>

      <Card title="Create Sales Challan">
        <SalesForm />
      </Card>

      <Card title="Sales Challans">
        <SalesTable />
      </Card>
    </>
  );
}

export default Sales;