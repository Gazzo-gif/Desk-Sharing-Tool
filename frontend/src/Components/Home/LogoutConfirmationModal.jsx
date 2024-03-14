import React from "react";
<<<<<<< HEAD
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
=======
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";
>>>>>>> 750d6db (Overlapping Solved-Logout Added)
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

<<<<<<< HEAD
export default LogoutConfirmationModal;
=======
export default LogoutConfirmationModal;
>>>>>>> 750d6db (Overlapping Solved-Logout Added)
