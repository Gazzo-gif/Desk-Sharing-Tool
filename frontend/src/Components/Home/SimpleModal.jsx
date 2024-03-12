// SimpleModal.js
import React from "react";

const SimpleModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Set a high z-index value
      }}
      onClick={onClose} // Close modal when clicking on the backdrop
    >
      <div
        style={{
          padding: "20px",
          background: "#FFF",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minHeight: "200px",
          margin: "1rem",
          position: "relative",
          minWidth: "300px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from bubbling up to the backdrop
        }}
      >
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Previous Password</label>
            <input type="password" name="prevPassword" required style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              transition: "border-color 0.3s",
            }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>New Password</label>
            <input type="password" name="newPassword" required style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              transition: "border-color 0.3s",
            }} />
          </div>
          <button type="submit" style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#008444",
            color: "#FFF",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SimpleModal;
