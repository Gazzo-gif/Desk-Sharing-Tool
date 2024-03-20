import { FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

export default function DeleteWorkstation({ deleteWorkstationModal }) {
  const { t } = useTranslation();
    const [allRooms, setAllRooms] = React.useState([]);
    const [allDesks, setAllDesks] = React.useState([]);
    const [selectedRoom, setSelectedRoom]= React.useState('');
    const [selectedDesk, setSelectedDesk]= React.useState('');
    React.useEffect(() => {
        getAllRooms();
    }, []);

    const handleCloseBtn = () => {
      deleteWorkstationModal();
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

      async function deleteWorkstation(){
        if(selectedDesk){
            const response = await fetch("/desks/"+selectedDesk, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },body: JSON.stringify({})
              }).then(resp => {
               
                  toast.success(t("deskDelete"));
                  deleteWorkstationModal();
              }).catch(error => {
                console.log("login user err " + error);
              });
        }
        
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
                                
                              setSelectedDesk(newValue);
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



                    </Box>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={()=>deleteWorkstation()}>&nbsp;{t("delete").toUpperCase()}</Button>
                <Button onClick={handleCloseBtn}>&nbsp;{t("close").toUpperCase()}</Button>
            </DialogActions>

           
        </React.Fragment>
    );
}