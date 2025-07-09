import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "./store";

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const products = [
    { id: 1, name: "Apple", price: 30 },
    { id: 2, name: "Banana", price: 10 },
    { id: 3, name: "Orange", price: 20 },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🛒 Shopping Cart</h1>

      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ₹{product.price}
          <button
            onClick={() => dispatch(addItem(product))}
            style={{ marginLeft: 10 }}
          >
            Add
          </button>
        </div>
      ))}

      <hr />

      <h2>Cart Items</h2>
      {cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.items.map((item) => (
          <div key={item.id}>
            {item.name} - ₹{item.price}
            <button
              onClick={() => dispatch(removeItem(item.id))}
              style={{ marginLeft: 10 }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h3>Total Price: ₹{cart.total}</h3>
    </div>
  );
}

export default App;
