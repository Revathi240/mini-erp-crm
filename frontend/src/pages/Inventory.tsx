import InventoryTable from "../components/InventoryTable";
import Card from "../components/Card";

function Inventory() {
  return (
    <>
      <h1>Inventory Management</h1>

      <Card title="Current Inventory">
        <InventoryTable />
      </Card>
    </>
  );
}

export default Inventory;