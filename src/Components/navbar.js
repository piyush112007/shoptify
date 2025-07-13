import React, { useState } from "react";
import logo from "./Images/logo.svg";
import waffle from "./Images/dots-nine.png";

export default function Navbar({
  cartCount,
  onCartClick,
  showCart,
  onBrandSelect,
  currentBrand,
  onAddCustomShoe, // 👈 trigger form
}) {
  const [showBrands, setShowBrands] = useState(false);
  const companies = ["Nike", "Adidas", "Puma", "Reebok"];

  const handleBrandClick = (brand) => {
    onBrandSelect(brand);
    setShowBrands(false);
  };

  return (
    <nav className="navbar">
      <div className="left">
        <a className="navbar-brand" href="#">
          <img id="logo" src={logo} alt="Logo" />
        </a>
        <p className="brandIndicator">👟{currentBrand}</p>
      </div>
      <div className="right">
        <button onClick={() => setShowBrands((prev) => !prev)}>
          <img id="waffle" src={waffle} alt="Waffle" />
        </button>

        {showBrands && (
          <div className="brand-list">
            {/* Standard brands */}
            {companies.map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandClick(brand)}
                className={
                  brand === currentBrand ? "brand-active" : "brand-button"
                }
              >
                {brand}
              </button>
            ))}

            {/* Divider */}
            <hr className="dropdown-divider" />

            {/* View all custom shoes */}
            <button
              onClick={() => handleBrandClick("Custom")}
              className={
                currentBrand === "Custom" ? "brand-active" : "brand-button"
              }
            >
              👟 View Custom Shoes
            </button>

            {/* Add new custom shoe */}
            <button
              onClick={() => {
                setShowBrands(false);
                onAddCustomShoe();
              }}
              className="custom-add-button"
            >
              ➕ Add New Custom Shoe
            </button>
          </div>
        )}

        {/* Cart Icon */}
        <button
          id="cart-icon-button"
          type="button"
          className="cart-button"
          onClick={onCartClick}
          aria-label={showCart ? "Back to products" : "View cart"}
        >
          {showCart ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"
              />
            </svg>
          ) : (
            <span className="cart-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-bag-heart"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"
                />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
