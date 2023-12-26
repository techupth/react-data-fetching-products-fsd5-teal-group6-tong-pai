import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function App() {
  const [showData, setShowData] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setStatus("Loading...");
      const result = await axios.get("http://localhost:4001/products");
      setShowData(result.data.data);
      setStatus("Delete");
    } catch (error) {
      setStatus("Fetching Error...");
      console.log("Error retrieving data:", error);
    }
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const result = await axios.get("http://localhost:4001/products");
    setShowData(result.data.data);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {showData.length > 0 ? (
        showData.map((item, index) => (
          <div key={index} className="product-list">
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
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                x
              </button>
            </div>
          </div>
        ))
      ) : status === "Fetching Error..." ? (
        <p>{status}</p>
      )  : status === "Loading..." ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) :  showData.length === 0 ? (
        "Not A data."):""}
    </div>
  );
}

export default App;
