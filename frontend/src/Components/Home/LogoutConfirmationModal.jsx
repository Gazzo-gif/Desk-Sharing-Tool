import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t("Logout")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("Are you sure you want to logout?")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("Cancel")}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {t("Logout")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmationModal;
