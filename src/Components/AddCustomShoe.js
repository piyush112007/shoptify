import React, { useState } from "react";
import DEFAULT_IMAGE from "./Images/logo.png"; // Placeholder image

export default function AddCustomShoeForm({ onSubmit, onCancel }) {
  const [customShoe, setCustomShoe] = useState({
    title: "",
    subtitle: "",
    price: "",
    image: "",
    Brand: "Custom",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Automatically prefix ₹ for price
    if (name === "price") {
      const formattedPrice = value.startsWith("₹")
        ? value
        : `₹${value.replace(/^₹/, "")}`;
      setCustomShoe((prev) => ({ ...prev, [name]: formattedPrice }));
    } else {
      setCustomShoe((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      customShoe.title.trim() &&
      customShoe.subtitle.trim() &&
      customShoe.price.trim()
    ) {
      const newShoe = {
        ...customShoe,
        image: customShoe.image.trim() || DEFAULT_IMAGE, // Use placeholder if blank
      };
      onSubmit(newShoe); // Pass new shoe back
      // Reset form
      setCustomShoe({
        title: "",
        subtitle: "",
        price: "",
        image: "",
        Brand: "Custom",
      });
    } else {
      alert("Please fill in all required fields!");
    }
  };

  return (
    <div className="add-custom-shoe-form">
      <h2>Add Your Custom Sneaker</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="title"
          placeholder="Shoe Name *"
          value={customShoe.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle *"
          value={customShoe.subtitle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price (₹) *"
          value={customShoe.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={customShoe.image}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Add Shoe
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
