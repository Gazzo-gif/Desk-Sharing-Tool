import { FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { toast } from 'react-toastify';

export default function AddWorkstation({ addWorkstationModal }) {
    const [allRooms, setAllRooms] = React.useState([]);
    const [selectedRoom, setSelectedRoom]= React.useState('');
    const [equipment, setEquipment]= React.useState('');
    React.useEffect(() => {
        getAllRooms();
    }, []);

    async function addWorkstation(){

      if(selectedRoom){
        let idSplit = selectedRoom.split("(");
        let idVal = idSplit[1].split(")");
        let roomId = idVal[0];

        
        const response = await fetch("/desks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify({
            "roomId": roomId,
            "equipment": equipment
        })
      }).then(resp => {
          toast("Desk created successfully");
          addWorkstationModal();
      }).catch(error => {
        console.log("login user err " + error);
      });
      }

        
      }

      async function getAllRooms(){
        const response = await fetch("/rooms/status", {
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

    
    return (
        <React.Fragment>
            <DialogContent>
                <Grid container >
                    <Box sx={{ flexGrow: 1, padding: '10px' }}>
                        {/* <br></br><br></br>
                        <FormControl required={true} size="small" fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <TextField
                                id="standard-adornment-tname"
                                label="Description"
                                size="small"
                                rows={3}
                                multiline
                                type={'text'}
                                value={description}
                                onChange={handleProjectDescChange}
                            />
                        </FormControl>
                        <br></br><br></br> */}

                        <Autocomplete
                            id="tags-filled"
                            fullWidth
                            options={allRooms.map((option) => (option.floor +"-"+ option.type +"("+option.id+")"))}
                            value={selectedRoom}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                setSelectedRoom(
                                    newValue);
                            }}
                            // renderTags={(value, getTagProps) =>
                            //     value.map((option, index) => (
                            //         <Chip avatar={<Avatar size="lg" color='danger' {...stringAvatar(option)} />} variant="outlined" label={option} {...getTagProps({ index })} />
                            //     ))
                            // }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size='small' 
                                    label="Select Room"
                                    placeholder="Select Room"
                                />
                            )}
                        />
<br></br>
<FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">Equipments</InputLabel>
                <Select
                size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={equipment}
                    label="Equipments"
                    onChange={(e) => setEquipment(e.target.value)}
                >
                    <MenuItem value={"with equipment"}>WITH EQUIPMENT</MenuItem>
                    <MenuItem value={"without equipment"}>WITHOUT EQUIPMENT</MenuItem>
                </Select>
                </FormControl>

                    </Box>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={()=>addWorkstation()}>&nbsp;SUBMIT</Button>
            </DialogActions>

           
        </React.Fragment>
    );
}