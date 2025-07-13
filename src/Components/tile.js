import React from "react";

export default function Tile({
  Title,
  image,
  price,
  subtitle,
  inCart,
  onToggle,
}) {
  return (
    <div className="main container">
      <div className="heroImage container">
        <img id="heroImage" src={image} alt={`Photo of ${Title}`} />
      </div>
      <div className="herobody container">
        <div className="heroTitle container">
          <p>{Title}</p>
        </div>
        <div className="vertical heroSubTitle container">
          <p>{subtitle}</p>
          <button
            type="button"
            className={`cart-toggle-button ${inCart ? "remove" : "add"}`}
            onClick={onToggle}
            aria-label={inCart ? `Remove ${Title}` : `Add ${Title}`}
          >
            {inCart ? "Remove from Cart" : "Add To Cart"}
          </button>
        </div>
        <div className="vertical container">
          <div className="heroprice">
            <p>{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
