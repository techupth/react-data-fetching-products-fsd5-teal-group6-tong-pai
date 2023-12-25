import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProductDetail();
  }, []);

  async function getProductDetail() {
    const response = await axios.get("http://localhost:4001/products");

    setProductData(response.data.data);
  }

  //Delete Product
  async function deleteProduct(id) {
    const productToDelete = "http://localhost:4001/products/" + id;

    await axios.delete(productToDelete);
    const response = await axios.get("http://localhost:4001/products");
    setProductData(response.data.data);
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productData.map((item, index) => {
          return (
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price}</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProduct(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
