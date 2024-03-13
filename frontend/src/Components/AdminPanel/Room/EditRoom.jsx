import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { toast } from 'react-toastify';
//import { addNewTeam } from '../util/apiCalls';

export default function EditRoom({ editRoomModal }) {
    const [allRooms, setAllRooms] = React.useState([]);
    React.useEffect(() => {
        getAllRooms();
      }, []);

      async function getAllRooms(){
        const response = await fetch("/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(resp => {
        resp.json().then(data => {
          console.log(data);
          setAllRooms(data);
        });
      }).catch(error => {
        console.log("login user err " + error);
      });
      }

    const handleClose = () => {
        editRoomModal();
    }

    async function handleRoomTypeChange(e, id){

      const response = await fetch("/rooms/"+id+"/type/"+e.target.value, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      toast("Room type changed successfully");
      getAllRooms();
  }

    async function handleStatusChange(e, id){

        const response = await fetch("/rooms/"+id+"/"+e.target.value, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        toast("Room status changed successfully");
        getAllRooms();
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
             
            <TableCell sx={{textAlign: 'center', fontSize:15, color:'white'}}> Floor</TableCell>
            <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}> Type</TableCell>
             <TableCell sx={{textAlign: 'center',fontSize:15,color:'white' }} colSpan={2}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRooms.map((row) => (
            <TableRow  key={row.categoryId}>
              <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                {row.floor}
              </TableCell>
              {/* <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} component="th" scope="row">
                {row.type}
              </TableCell> */}
              
              <TableCell sx={{fontSize:14, width:'30%'   }} component="th" scope="row">
              <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">TYPE</InputLabel>
                <Select
                size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={row.type}
                    label="Status"
                    onChange={(e) => handleRoomTypeChange(e, row.id)}
                >
                    <MenuItem value={"Silence"}>Silence</MenuItem>
                    <MenuItem value={"Normal"}>Normal</MenuItem>
                </Select>
                </FormControl>
             </TableCell>
              
              <TableCell sx={{fontSize:14, width:'30%'   }} component="th" scope="row">
              <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={row.status?row.status:"enable"}
                    label="Status"
                    onChange={(e) => handleStatusChange(e, row.id)}
                >
                    <MenuItem value={"enable"}>ENABLE</MenuItem>
                    <MenuItem value={"disable"}>DISABLE</MenuItem>
                </Select>
                </FormControl>
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