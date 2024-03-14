import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
=======
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";
>>>>>>> 750d6db (Overlapping Solved-Logout Added)
=======
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
>>>>>>> 9150b06 (Visibility)
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

<<<<<<< HEAD
export default LogoutConfirmationModal;
=======
export default LogoutConfirmationModal;
>>>>>>> 750d6db (Overlapping Solved-Logout Added)
