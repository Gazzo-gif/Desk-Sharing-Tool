import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import EmployeeTable from './EmployeeTable';

export default function DeleteEmployee({ deleteEmployeeModal }) {
  const { t } = useTranslation();
  const [allEmployee, setAllEmployee] = React.useState([]);

  React.useEffect(() => {
      getAllEmployee();
    }, []);

  async function getAllEmployee(){
    const response = await fetch("/users/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(resp => {
    resp.json().then(data => {
      console.log(data);
      setAllEmployee(data);
    });
  }).catch(error => {
    console.log("login user err " + error);
  });
  }

  const handleClose = () => {
      deleteEmployeeModal();
  }

  async function deleteEmployeeById(id){
      const response = await fetch("/users/"+id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      toast.success(t("userDeleted"));
      getAllEmployee();
  }

    return (
        <React.Fragment>
            <DialogContent>
                <Grid container >
                <EmployeeTable employees={allEmployee} onAction={deleteEmployeeById} action={t("delete").toUpperCase()} t={t}/>
                    </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>&nbsp;{t("close").toUpperCase()}</Button>
            </DialogActions>
        </React.Fragment>
    );
}