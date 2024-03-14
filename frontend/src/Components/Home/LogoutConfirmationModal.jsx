import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t("logout")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("logoutConfirmation")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("cancel")}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {t("toLogout")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmationModal;