import { FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

export default function EditWorkstation({ editWorkstationModal }) {
  const { t } = useTranslation();
    const [allRooms, setAllRooms] = React.useState([]);
    const [allDesks, setAllDesks] = React.useState([]);
    const [selectedRoom, setSelectedRoom]= React.useState('');
    const [selectedDesk, setSelectedDesk]= React.useState('');
    const [equipment, setEquipment]= React.useState('');
    React.useEffect(() => {
        getAllRooms();
    }, []);

    const handleCloseBtn = () => {
      editWorkstationModal();
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

      async function getDeskByRoomId(e){
        if(e){
            let idSplit = e.split("(");
            let idVal = idSplit[1].split(")");
            let roomId = idVal[0];
    
            const response = await fetch("/desks/room/"+roomId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(resp => {
            resp.json().then(data => {
              console.log(data);
              setAllDesks(data);
            });
          }).catch(error => {
            console.log("login user err " + error);
          });
        }
        
      }

      async function updateWorkstation(){

        const response = await fetch("/desks/"+selectedDesk+"/"+equipment, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify({})
      }).then(resp => {
        resp.json().then(data => {
          console.log(data);
          toast.success(t("deskUpdate"));
          editWorkstationModal();
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

                        <Autocomplete
                            id="tags-filled"
                            fullWidth
                            options={allRooms.map((option) => (option.floor +"-"+ option.type +"("+option.id+")"))}
                            value={selectedRoom}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                setEquipment("");
                                setSelectedDesk("");
                                getDeskByRoomId(newValue);
                                setSelectedRoom(
                                    newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size='small' 
                                    label={t("selectRoom")}
                                    placeholder={t("selectRoom")}
                                />
                            )}
                        />
<br></br>
{
    allDesks && allDesks.length > 0 ?
    (
<Autocomplete
                            id="tags-filled"
                            fullWidth
                            options={allDesks.map((option) => (option.id))}
                            value={selectedDesk}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                var deskData = allDesks.find(e => e.id===newValue);
                                if(deskData && deskData.equipment){
                                    setEquipment(deskData.equipment);
                                }
                                
                                setSelectedDesk(
                                    newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size='small' 
                                    label={t("selectDesk")}
                                    placeholder={t("selectDesk")}
                                />
                            )}
                        />
    ):<p style={{color: 'red', textAlign:'left'}}>{t("deskNotFound")}</p>
}

 

<br></br>
{
    selectedDesk ? 
    (
<FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">{t("equipment")}</InputLabel>
                <Select
                size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={equipment}
                    label="Equipments"
                    onChange={(e) => setEquipment(e.target.value)}
                >
                    <MenuItem value={"with equipment"}>{t("withEquipment").toUpperCase()}</MenuItem>
                    <MenuItem value={"without equipment"}>{t("withoutEquipment").toUpperCase()}</MenuItem>
                </Select>
                </FormControl>
    ):""
}


                    </Box>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={()=>updateWorkstation()}>&nbsp;{t("update").toUpperCase()}</Button>
                <Button onClick={handleCloseBtn}>&nbsp;{t("close").toUpperCase()}</Button>
            </DialogActions>

           
        </React.Fragment>
    );
}