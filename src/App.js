import React, { useEffect, useState } from "react";

import "./App.css";
import Tile from "./Components/tile";
import ProductData from "./Components/product";
import Navbar from "./Components/navbar";
import AddCustomShoeForm from "./Components/AddCustomShoe";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentBrand, setCurrentBrand] = useState("Reebok");
  const [products, setProducts] = useState(ProductData);
  const [addingCustomShoe, setAddingCustomShoe] = useState(false);
  const handleBrandSelect = (brand) => {
    setCurrentBrand(brand);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("sneakify_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sneakify_cart", JSON.stringify(cart));
  }, [cart]);

  const handleAdd = (product) => setCart((prev) => [...prev, product]);
  const handleRemove = (product) =>
    setCart((prev) => prev.filter((p) => p !== product));
  const toggleCart = () => setShowCart((prev) => !prev);

  const handleAddCustomShoe = (newShoe) => {
    setProducts((prev) => [...prev, newShoe]);
    setAddingCustomShoe(false);
    setCurrentBrand("Custom");
  };

  const list = showCart
    ? cart
    : products.filter((product) => product.Brand === currentBrand);

  return (
    <div className="App">
      <Navbar
        onBrandSelect={handleBrandSelect}
        currentBrand={currentBrand}
        cartCount={cart.length}
        onCartClick={toggleCart}
        showCart={showCart}
        onAddCustomShoe={() => setAddingCustomShoe(true)}
      />

      <div className="container">
        {addingCustomShoe ? (
          <AddCustomShoeForm
            onSubmit={handleAddCustomShoe}
            onCancel={() => setAddingCustomShoe(false)}
          />
        ) : (
          <div className="lineup">
            {list.map((item, idx) => (
              <Tile
                key={item.id || idx}
                Title={item.title}
                image={item.image}
                price={item.price}
                subtitle={item.subtitle}
                inCart={cart.includes(item)}
                onToggle={() =>
                  cart.includes(item) ? handleRemove(item) : handleAdd(item)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
