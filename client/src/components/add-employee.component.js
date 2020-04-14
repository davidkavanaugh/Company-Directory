import React from 'react';
import { Button, Tooltip, TextField, 
    // FormControl, Select, InputLabel, MenuItem
    Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import { AsYouType } from 'libphonenumber-js';
import axios from 'axios';

const AddEmployee = (props) => {
    // State Hooks
    const [open, setOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [location, setLocation] = React.useState(''); 
    const [department, setDepartment] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [extension, setExtension] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setFirstName('')
        setLastName('')
        setLocation('')
        setDepartment('')
        setPhoneNumber('')
        setExtension('')
        setOpen(false);
    };

    const handleFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastName = (event) => {
        setLastName(event.target.value)
    }

    // const locations = [
    //     {
    //       value: 'Edmonds'
    //     },
    //     {
    //       value: 'Kirkland'
    //     },
    //     {
    //       value: 'Seattle: Fremont'
    //     },
    //     {
    //       value: 'Seattle: Northgate'
    //     },
    //     {
    //       value: 'Lynnwood'
    //     }
    //   ]; 

    const handleLocation = (event) => {
        setLocation(event.target.value);
    };

    const handleDepartment = (event) => {
        setDepartment(event.target.value)   
    }

    const handlePhoneNumber = (event) => {
        if (phoneNumber.charAt(0) !== '1') {
            if (phoneNumber.length < 14) {
                if (phoneNumber.length <= 5) {
                    setPhoneNumber(event.target.value)
                } else {
                    let phone = new AsYouType('US').input(event.target.value);
                    setPhoneNumber(phone)
                }
            } else {
                let longNumber = event.target.value.substring(0,14)
                let phone = new AsYouType('US').input(longNumber);
                setPhoneNumber(phone)
            }
        } else {
            setPhoneNumber(event.target.value.charAt(1))
        }
    }

    const handleExtension = (event) => {
        setExtension(event.target.value)
    }

    const isDisabled = () => {
        if (!firstName || !lastName || !location || !phoneNumber) {
            return true
        } else {
            return false
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        let employee = {
          firstName,
          lastName,
          location,
          department,
          phoneNumber,
          extension
        }
      
        console.log(employee);
      
        axios.post('/employees/add', employee) 

        handleClose();

        window.location='/';
    };

    return(
        <React.Fragment>
            <Tooltip title="Add Employee" placement="bottom-end">
                <Button 
                    color="inherit" 
                    size="small" 
                    variant="outlined" 
                    onClick={handleClickOpen}
                    style={{margin: '10px 0px 10px 10px'}}
                >
                    <PersonAddRoundedIcon fontSize="large"/>
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>    
                    <TextField
                        required
                        autoFocus
                        variant="outlined"
                        id="firstName"
                        value={firstName}
                        label="First Name"
                        name="firstName"
                        type="text"
                        fullWidth
                        style={{marginBottom: '10px'}}
                        onChange={handleFirstName}
                    />
                    <TextField
                        required
                        variant="outlined"
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        type="text"
                        fullWidth
                        style={{marginBottom: '20px'}}
                        onChange={handleLastName}
                    />

                    <TextField
                        required
                        variant="outlined"
                        id="location"
                        label="Location"
                        name="location"
                        value={location}
                        type="text"
                        fullWidth
                        style={{marginBottom: '10px'}}
                        onChange={handleLocation}
                    />
{/* 
                    <FormControl variant="outlined" fullWidth required>
                        <InputLabel id="location">Location / Branch</InputLabel>
                        <Select
                            labelId="location"
                            id="location"
                            value={location}
                            name="location"
                            onChange={handleLocation}
                            label="Location / Branch"
                            style={{marginBottom: '10px'}}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {locations.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                     */}
                    <TextField
                        variant="outlined"
                        id="department"
                        label="Department"
                        name="department"
                        value={department}
                        type="text"
                        fullWidth
                        style={{marginBottom: '20px'}}
                        onChange={handleDepartment}
                    />  
                    <TextField 
                        id="phoneNumber"
                        label="Phone Number"
                        type="text"
                        name="phoneNumber"
                        variant="outlined"
                        value={phoneNumber}
                        margin="dense"
                        onChange={handlePhoneNumber}
                        required
                    />
                    <span> </span>
                    <TextField 
                        id="extension"
                        label="Extension"
                        value={extension}
                        name="extension"
                        type="text"
                        variant="outlined"
                        margin="dense"
                        onChange={handleExtension}
                    />
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" disabled={isDisabled()}>
                        Submit
                    </Button>
                </DialogActions>
                </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default AddEmployee;