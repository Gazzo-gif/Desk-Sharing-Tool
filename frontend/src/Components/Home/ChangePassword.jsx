import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

const ChangePassword = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    prevPassword: "",
    newPassword: "",
    newPasswordAgain: ""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if new passwords match
    if (formData.newPassword !== formData.newPasswordAgain) {
      setError("New passwords do not match");
      return;
    }
    try {
      const response = await fetch(`/users/password/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            oldPassword: formData.prevPassword,
            newPassword: formData.newPassword
        })
      });
      const data = await response.json();
      if (response.ok && data) {
        toast.success("Password changed successfully");
        onClose();
      } else {
        setError("Failed to change password");
      }
    } catch (error) {
        console.error("Error changing password:", error);
        setError("Error changing password");
    }
  };

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
        zIndex: 9999 // Set a high z-index value
      }}
      onClick={onClose}
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
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from bubbling up to the backdrop
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>{t("previousPassword")}</label>
            <input type="password" name="prevPassword" value={formData.prevPassword} onChange={handleChange} required style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              transition: "border-color 0.3s"
            }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>{t("newPassword")}</label>
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              transition: "border-color 0.3s"
            }} />
          </div>
          <div>
<<<<<<< HEAD
            <label style={{ display: "block", marginBottom: "5px" }}>{t("newPasswordAgain")}</label>
            <input type="password" name="newPasswordAgain" value={formData.newPasswordAgain} onChange={handleChange} required style={{
=======
            <label style={{ display: "block", marginBottom: "5px" }}>New Password Again</label>
            <input type="password" name="newPasswordAgain" required style={{
>>>>>>> 1a932ff (new password again added)
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
<<<<<<< HEAD
              transition: "border-color 0.3s"
            }} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
=======
              transition: "border-color 0.3s",
            }} />
          </div>
>>>>>>> 1a932ff (new password again added)
          <button type="submit" style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#008444",
            color: "#FFF",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s"
          }}>{t("submit")}</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
