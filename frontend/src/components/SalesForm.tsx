import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "../services/api";

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface SaleItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}


function SalesForm() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);


  const [customerId, setCustomerId] = useState("");

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [availableStock, setAvailableStock] = useState(0);


  const [items, setItems] = useState<SaleItem[]>([]);


  const [status, setStatus] = useState("Confirmed");


 useEffect(() => {
  const loadData = async () => {
    try {
      const customersResponse = await api.get("/customers");
      setCustomers(customersResponse.data);

      const productsResponse = await api.get("/products");
      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error loading Sales Form data:", error);
    }
  };

  loadData();
}, []);



  const addItem = () => {
    if (!productId || !quantity || !price) {

      alert(
        "Please select product, quantity and price."
      );

      return;
    }
    if (Number(quantity) > availableStock) {
      alert(
        "Quantity exceeds available stock."
      );

      return;
    }

    const selectedProduct = products.find(
      (p) => p.id === Number(productId)
    );


    if (!selectedProduct) return;

    const alreadyExists = items.find(
      (item) =>
        item.product_id === Number(productId)
    );


    if (alreadyExists) {

      alert(
        "Product already added."
      );

      return;
    }

    setItems([
      ...items,

      {
        product_id: Number(productId),
        product_name: selectedProduct.name,
        quantity: Number(quantity),
        price: Number(price)
      }

    ]);
    setProductId("");
    setQuantity("");
    setPrice("");
    setAvailableStock(0);

  };


  const removeItem = (index:number)=>{

    const updatedItems =
      items.filter(
        (_,i)=>i !== index
      );


    setItems(updatedItems);

  };

  const handleSubmit = async(
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if(!customerId){

      alert(
        "Please select customer."
      );

      return;

    }

    if(items.length===0){

      alert(
        "Please add at least one product."
      );

      return;

    }

    for (const item of items) {

  if (item.quantity <= 0) {
    alert("Quantity must be greater than 0");
    return;
  }

  if (item.price <= 0) {
    alert("Price must be greater than 0");
    return;
  }

}
    const body = {


      customer_id:
        Number(customerId),

      status,


      items:
        items.map(item=>({

          product_id:
            item.product_id,


          quantity:
            item.quantity,


          price:
            item.price

        }))

    };




    try{


      const response = await api.post("/sales", body);

      toast.success(response.data.message);



      setCustomerId("");
      setItems([]);
      setProductId("");
      setQuantity("");
      setPrice("");

      window.location.reload();



    }
    catch(error){

      console.error(error);

      toast.error("Failed to create challan");

    }


  };
    return (

    <form onSubmit={handleSubmit}>


      <div>

        <label>
          Customer
        </label>

        <br/>


        <select

          value={customerId}

          onChange={
            (e)=>
              setCustomerId(
                e.target.value
              )
          }

          required

        >

          <option value="">
            Select Customer
          </option>


          {
            customers.map(
              (customer)=>(

                <option

                  key={customer.id}

                  value={customer.id}

                >

                  {customer.name}

                </option>

              )
            )
          }


        </select>


      </div>



      <br/>



      <div>


        <label>
          Product
        </label>


        <br/>



        <select


          value={productId}



          onChange={(e)=>{


            const id =
              Number(
                e.target.value
              );


            setProductId(
              e.target.value
            );



            const selected =
              products.find(
                p=>p.id===id
              );



            if(selected){

              setPrice(
                String(
                  selected.price
                )
              );


              setAvailableStock(
                selected.stock
              );

            }


          }}



        >


          <option value="">
            Select Product
          </option>



          {
            products.map(
              (product)=>(

                <option

                  key={product.id}

                  value={product.id}

                >

                  {product.name}

                </option>


              )
            )
          }


        </select>


        <p>

          Available Stock:
          {" "}
          <b>
            {availableStock}
          </b>

        </p>


      </div>




      <br/>




      <div>


        <label>
          Quantity
        </label>


        <br/>


        <input


          type="number"


          value={quantity}


          onChange={
            (e)=>
              setQuantity(
                e.target.value
              )
          }


        />


      </div>




      <br/>




      <div>


        <label>
          Price
        </label>


        <br/>


        <input


          type="number"


          value={price}


          onChange={
            (e)=>
              setPrice(
                e.target.value
              )
          }


        />


      </div>




      <br/>




      <button

        type="button"

        onClick={addItem}

      >

        Add Item


      </button>





      {
        items.length>0 &&

        <>


        <h3>
          Added Items
        </h3>



        <table>


          <thead>

            <tr>

              <th>
                Product
              </th>


              <th>
                Qty
              </th>


              <th>
                Price
              </th>


              <th>
                Total
              </th>


              <th>
                Action
              </th>


            </tr>

          </thead>



          <tbody>


            {
              items.map(
                (item,index)=>(


                <tr key={index}>


                  <td>
                    {item.product_name}
                  </td>


                  <td>
                    {item.quantity}
                  </td>


                  <td>
                    ₹{item.price}
                  </td>


                  <td>
                    ₹
                    {
                      item.quantity *
                      item.price
                    }
                  </td>



                  <td>


                    <button

                      type="button"

                      onClick={
                        ()=>removeItem(index)
                      }

                    >

                      Remove


                    </button>


                  </td>


                </tr>


                )
              )
            }



          </tbody>


        </table>



        <h3>

          Grand Total:
          ₹
          {
            items.reduce(
              (sum,item)=>
                sum +
                (
                  item.quantity *
                  item.price
                ),

              0
            )
          }


        </h3>



        </>


      }




      <br/>



      <label>
        Status
      </label>


      <br/>


      <select

        value={status}

        onChange={
          (e)=>
            setStatus(
              e.target.value
            )
        }

      >

        <option>
          Draft
        </option>


        <option>
          Confirmed
        </option>


        <option>
          Cancelled
        </option>


      </select>



      <br/>
      <br/>



      <button

        type="submit"

        disabled={
          items.length===0
        }

      >

        Save Challan


      </button>



    </form>

  );

}



export default SalesForm;