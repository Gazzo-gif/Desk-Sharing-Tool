import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

export default function AddEmployee({ addEmployeeModal }) {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName ] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [visibility, setVisibility] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  React.useEffect(() => {
      
  }, []);

  const handleCloseBtn = () => {
    addEmployeeModal();
  }

  async function addEmployee(){
    console.log(email, password, name, surname, isAdmin, visibility);
    if(!email || !password || !name || !surname){
        toast.error("Fields cannot be blank!");
        return false;
    }
      
      const response = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({
        "email": email,
          "password": password,
          "name": name,
          "surname": surname,
          "admin": isAdmin,
          "visibility": visibility,
      })
    }).then(resp => {
        if(resp.status===409){
            toast.error("Email already taken");
        } else {
            toast.success(t("userCreated"));
            addEmployeeModal();
        }
       
    }).catch(error => {
      console.log("login user err " + error);
    });
  }

  return (
    <React.Fragment>
      <DialogContent>
        <Grid container >
          <Box sx={{ flexGrow: 1, padding: '10px' }}>
            
            <br></br>
            <FormControl required={true} size="small" fullWidth variant="standard">
                            <TextField
                                id="standard-adornment-reason"
                                label={t("email")}
                                size="small"
                                type={"text"}
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </FormControl>
                        <br></br> <br></br>
                        <FormControl required={true} size="small" fullWidth variant="standard">
                            <TextField
                                id="standard-adornment-reason"
                                label={t("password")}
                                size="small"
                                type={"password"}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </FormControl>
                        <br></br> <br></br>
                        <FormControl required={true} size="small" fullWidth variant="standard">
                            <TextField
                                id="standard-adornment-reason"
                                label={t("name")}
                                size="small"
                                type={"text"}
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </FormControl>
                        <br></br> <br></br>
                        <FormControl required={true} size="small" fullWidth variant="standard">
                            <TextField
                                id="standard-adornment-reason"
                                label={t("surname")}
                                size="small"
                                type={"text"}
                                value={surname}
                                onChange={(e)=>setSurname(e.target.value)}
                            />
                        </FormControl>
                        <br></br> <br></br>
                        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Is Admin?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={isAdmin}
        onChange={(e)=> setIsAdmin(e.target.value)}
      >
        <FormControlLabel value="true" control={<Radio />} label={t("true")} />
        <FormControlLabel value="false" control={<Radio />} label={t("false")} />
       
      </RadioGroup>
    </FormControl>
    <br></br>
                        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{t("visibility")}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={visibility}
        onChange={(e)=> setVisibility(e.target.value)}
      >
        <FormControlLabel value="true" control={<Radio />} label={t("yes")} />
        <FormControlLabel value="false" control={<Radio />} label={t("no")} />
        
      </RadioGroup>
    </FormControl>
          </Box>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={()=>addEmployee()}>&nbsp;{t("submit").toUpperCase()}</Button>
        <Button onClick={handleCloseBtn}>&nbsp;{t("close").toUpperCase()}</Button>
      </DialogActions>
    </React.Fragment>
  );
}