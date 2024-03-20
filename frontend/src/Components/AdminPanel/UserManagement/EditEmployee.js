import { Dialog, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import styled from '@emotion/styled';
import EditEmployeeModal from './EditEmployeeModal';

export default function EditEmployee({ editEmployeeModal }) {
  const { t } = useTranslation();
  const [allEmployee, setAllEmployee] = React.useState([]);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName ] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [visibility, setVisibility] = React.useState();
  const [isAdmin, setIsAdmin] = React.useState();


  const toggleEditEmployeeModal = () => {
    console.log("====");
      getAllEmployee();
    setIsEditEmployeeOpen(!isEditEmployeeOpen);
    
  }
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
      editEmployeeModal();
  }

  const BootstrapWorkstationDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      minWidth: '500px !important',
      height: 'auto'
    },
  }));
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ alignItems: "center", justifyContent: "center", alignContent: "space-between" }} {...other}>
        {children}
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}></IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  function editEmployeeById(id){
      
    let data = allEmployee.filter(e => {
        if(e.id===id){
            return e;
        }
    });
    let val = data.at(0);
    setId(val.id);
    setEmail(val.email);
    setPassword(val.password);
    setName(val.name);
    setSurname(val.surname);
    setIsAdmin(val.admin);
    setVisibility(val.visibility);
    setIsEditEmployeeOpen(true);
  }

  return (
    <React.Fragment>
      <DialogContent>
        <Grid container >
          <TableContainer  component={Paper}>
            <Table sx={{ minWidth: 450, marginTop: 1, maxHeight:'400px' }} >
              <TableHead sx={{backgroundColor: 'green', color:'white'}}>
                <TableRow>
                  <TableCell sx={{textAlign: 'center', fontSize:15, color:'white'}}> ID</TableCell>
                  <TableCell sx={{textAlign: 'center', fontSize:15, color:'white'}}>{t("email")}</TableCell>
                  <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("name")}</TableCell>
                  <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("surname")}</TableCell>
                  <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("admin")}</TableCell>
                  <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("visibility")}</TableCell>
                  <TableCell sx={{textAlign: 'center',fontSize:15,color:'white' }} colSpan={2}>{t("action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allEmployee.map((row) => (
                  <TableRow  key={row.id}>
                    <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                      {row.email}
                    </TableCell>
                    <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                      {row.name}
                    </TableCell>
                    <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                      {row.surname}
                    </TableCell>
                    <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                      {row.admin?t("true"):t("false")}
                    </TableCell>
                    <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                      {row.visibility?t("true"):t("false")}
                    </TableCell>

                    <TableCell sx={{textAlign: 'center', fontSize:14, width:'30%'   }} component="th" scope="row">
                    <Button onClick={() => editEmployeeById(row.id)} >{t("edit").toUpperCase()}</Button>
                  </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>&nbsp;{t("close").toUpperCase()}</Button>
      </DialogActions>

      <BootstrapWorkstationDialog onClose={toggleEditEmployeeModal} aria-labelledby="customized-dialog-title" open={isEditEmployeeOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>
          {t("editEmployee").toUpperCase()}
        </BootstrapDialogTitle>
        <EditEmployeeModal editEmployeeModal={toggleEditEmployeeModal} 
          id={id} emailFromDb={email} 
          nameFromDb={name} surnameFromDb={surname} adminFromDb={isAdmin}
          visibilityFromDb={visibility}
        />
      </BootstrapWorkstationDialog>
    </React.Fragment>
  );
}