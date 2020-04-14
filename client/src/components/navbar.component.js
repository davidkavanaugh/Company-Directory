import React from 'react';
import './navbar.component.css';
import { Typography, Button, AppBar, Tooltip } from '@material-ui/core/';
import AddEmployee from './add-employee.component';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import Login from './login.component';


class Navbar extends React.Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        if(this.props.auth.isAuthenticated) {
            return(
                <div id="navbar">
                    <AppBar position="static">
                        <div className="nav">
                            <AddEmployee />
                            <Typography variant="h5" component="h5">
                                (Company Logo)
                            </Typography>
                            <Tooltip title="Logout" placement="bottom-start">
                                <Button onClick={this.onLogoutClick} color='inherit' style={{margin: '5px 5px'}}>
                                    <ExitToAppIcon style={{fontSize: "3em"}}/>
                                </Button>
                            </Tooltip>
                        </div>
                    </AppBar>
                </div>
            )
        } else {
            return (
                <div id="navbar">
                    <AppBar position="static">
                        <div className="nav">
                            <span style={{width: '85px'}}> </span>
                            <Typography variant="h5" component="h5">
                                (Company Logo)
                            </Typography>
                            <Login />
                        </div>
                    </AppBar>
                </div>
            )
        }
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
  });

  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar);