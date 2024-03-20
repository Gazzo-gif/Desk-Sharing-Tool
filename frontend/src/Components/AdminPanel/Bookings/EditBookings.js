import { Autocomplete, Dialog, FormControl, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import styled from '@emotion/styled';
import EditBookingModal from './EditBookingsModal';

export default function EditBookings({ editBookingsModal }) {
  const { t } = useTranslation();
  const [date, setDate] = React.useState('');
  const [isEditBookingOpen, setIsEditBookingOpen] = React.useState(false);
  const [allRooms, setAllRooms] = React.useState([]);
  const [selectedRoom, setSelectedRoom]= React.useState('');
  const [selectedId, setSelectedId]= React.useState('');
  const [selectedStartTime, setSelectedStartTime] = React.useState('');
  const [selectedEndTime, setSelectedEndTime] = React.useState('');
  const [allBookings, setAllBookings] = React.useState([]);

  React.useEffect(() => {
    getAllRooms();
  }, []);

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

  const handleClose = () => {
    editBookingsModal();
  }

  const toggleEditBookingModal = () => {
    setIsEditBookingOpen(!isEditBookingOpen);
    if (isEditBookingOpen === true) {
      searchBooking();
    }
  }

  function editBookingsById(id, start, end){
    setSelectedId(id);
    setSelectedStartTime(start);
    setSelectedEndTime(end);
    toggleEditBookingModal();
  }

  async function searchBooking(){
    if(selectedRoom){
      let idSplit = selectedRoom.split("(");
      let idVal = idSplit[1].split(")");
      let roomId = idVal[0];

      const response = await fetch("/bookings/room/date/"+roomId+"?day="+moment(date).format("YYYY-MM-DD"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(resp => {
        resp.json().then(data => {
          setAllBookings(data);
        });
      }).catch(error => {
        console.log("login user err " + error);
      });
    }
  }

  const BootstrapWorkstationDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      minWidth: '500px !important',
      height: 'auto'
    },
  }));

  return (
    <React.Fragment>
      <DialogContent>
          <Grid container >
                  <>
            <Stack direction={"row"} style={{padding:"30px"}} width={"100%"}>
            <Autocomplete
              id="tags-filled"
              fullWidth
              options={allRooms.map((option) => (option.floor +"-"+ option.type +"("+option.id+")"))}
              value={selectedRoom}
              onChange={(event, newValue) => {
                console.log(newValue);
                setSelectedRoom(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  size='small' 
                  label={t("selectRoom")}
                  placeholder={t("selectRoom")}
                />
              )}
            />&nbsp;&nbsp;&nbsp;
          
            <FormControl required={true} size="small" fullWidth variant="standard">
              <TextField
                id="standard-adornment-reason"
                placeholder={t("date")}
                fullWidth
                size="small"
                type={"date"}
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />
            </FormControl>&nbsp;&nbsp;&nbsp;
            <Button variant='contained' color='success' onClick={searchBooking}>{t("search").toUpperCase()}</Button>
            </Stack>
            {
              allBookings && allBookings.length > 0 ? (
                <TableContainer  component={Paper}>
                  <Table sx={{ minWidth: 450, marginTop: 1, maxHeight:'400px' }} >
                    <TableHead sx={{backgroundColor: 'green', color:'white'}}>
                      <TableRow>
                        <TableCell sx={{textAlign: 'center', fontSize:15, color:'white'}}> ID</TableCell>
                        <TableCell sx={{textAlign: 'center', fontSize:15, color:'white'}}>{t("user").toUpperCase()}</TableCell>
                        <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("roomID").toUpperCase()}</TableCell>
                        <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("deskID").toUpperCase()}</TableCell>
                        <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("date").toUpperCase()}</TableCell>
                        <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("begin").toUpperCase()}</TableCell>
                        <TableCell sx={{textAlign: 'center', fontSize:15,color:'white' }}>{t("end").toUpperCase()}</TableCell>
                        <TableCell sx={{textAlign: 'center',fontSize:15,color:'white' }} colSpan={2}>{t("action").toUpperCase()}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allBookings.map((row) => (
                        <TableRow  key={row.id}>
                          <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                            {row.user.name+" "+row.user.surname}
                          </TableCell>
                          <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                            {row.room.id}
                          </TableCell>
                          <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                            {row.desk.id}
                          </TableCell>
                          <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                            {row.day}
                          </TableCell>
                          <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                            {row.begin}
                          </TableCell>
                          <TableCell sx={{textAlign: 'center', fontSize:14, fontWeight:400 }} >
                            {row.end}
                          </TableCell>    
                          <TableCell sx={{textAlign: 'center', fontSize:14, width:'30%'   }} component="th" scope="row">
                            <Button onClick={() => editBookingsById(row.id, row.begin, row.end)} >{t("edit").toUpperCase()}</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ):<p style={{color: 'red', textAlign:'left'}}>{t("dataNotFound")}</p>
            }   
          </>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>&nbsp;{t("close").toUpperCase()}</Button>
      </DialogActions>

      <BootstrapWorkstationDialog onClose={toggleEditBookingModal} aria-labelledby="customized-dialog-title" open={isEditBookingOpen}>
        <EditBookingModal editBookingModal={toggleEditBookingModal} 
          id={selectedId} startTimeFromDb={selectedStartTime} endTimeFromDb={selectedEndTime}
        />
      </BootstrapWorkstationDialog>
    </React.Fragment>
  );
}