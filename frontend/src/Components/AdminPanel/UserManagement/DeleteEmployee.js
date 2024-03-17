import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

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

    async function handleRoomTypeChange(e, id){

    //   const response = await fetch("/rooms/"+id+"/type/"+e.target.value, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({}),
    //   });
    //   toast.success(t("roomType"));
    //   getAllEmployee();
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
                <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 450, marginTop: 1, maxHeight:'400px' }} >
        <TableHead sx={{backgroundColor: 'green', color:'white'}}>
          <TableRow>
          <TableCell sx={{textAlign: 'center', fontSize:15, color:'white'}}> ID</TableCell>
             
            <TableCell sx={{textAlign: 'center', fontSize:15, color:'white'}}> Email</TableCell>
            {/* <TableCell sx={{textAlign: 'center', fontSize:15, color:'white'}}> Password</TableCell> */}
            <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}> Name</TableCell>
            <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}> Surname</TableCell>
            <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}> Is Admin</TableCell>
            <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}> Visibility</TableCell>
             <TableCell sx={{textAlign: 'center',fontSize:15,color:'white' }} colSpan={2}>Action</TableCell>
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
              {/* <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} component="th" scope="row">
                {row.type}
              </TableCell> */}

{/* <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                {row.password?".......":""}
              </TableCell> */}

              <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                {row.name}
              </TableCell>
              <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                {row.surname}
              </TableCell>
              <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                {row.admin?"true":"false"}
              </TableCell>
              <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                {row.visibility?"true":"false"}
              </TableCell>
              
              
              
              <TableCell sx={{textAlign: 'center', fontSize:14, width:'30%'   }} component="th" scope="row">
              <Button onClick={() => deleteEmployeeById(row.id)} >DELETE</Button>
             </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>&nbsp;CLOSE</Button>
            </DialogActions>
        </React.Fragment>
    );
}