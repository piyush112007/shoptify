import React, { useEffect, useState } from "react";
import "./App.css";
import Tile from "./Components/tile";
// import ProductData from "./Components/product";
import Navbar from "./Components/navbar";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentBrand, setCurrentBrand] = useState("Reebok");
  const handleBrandSelect = (brand) => {
    setCurrentBrand(brand);
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((product) => ({
          ...product,
          image: process.env.PUBLIC_URL + product.image,
        }));
        setProducts(updatedData);
      })
      .catch((error) => console.error("Error loading products:", error));
  }, []);
  const Products = products.filter((product) => product.Brand === currentBrand);
  const handleAdd = (product) => setCart((prev) => [...prev, product]);
  const handleRemove = (product) =>
    setCart((prev) => prev.filter((p) => p !== product));
  const toggleCart = () => setShowCart((prev) => !prev);

  const list = showCart ? cart : Products;

  return (
    <div className="App">
      <Navbar
        onBrandSelect={handleBrandSelect}
        currentBrand={currentBrand}
        cartCount={cart.length}
        onCartClick={toggleCart}
        showCart={showCart}
      />

      <div className="lineup container">
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
    </div>
  );
}

export default App;
