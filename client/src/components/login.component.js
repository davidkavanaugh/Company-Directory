import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import { Tooltip, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, ClickAwayListener } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import './login.component.css';

class Login extends Component {
    constructor() {
      super();
      this.state = {
        username: "",
        password: "",
        open: false,
        alert: false,
        errors: {}
      };
    }

    componentDidMount = () => {
        // If logged in and user navigates to Register page, should redirect them to profile
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/editor");
        }
    };

    componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/editor");
    }

    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors,
            alert: true
        });
    }
    }

    handleClickAway = () => {
        this.setState({
            alert: false
        })
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({
            username: '',
            password: '',
            open: false,
            alert: false,
            errors: {}
        })
    };

    onChange = e => {
    this.setState({ [e.target.id]: e.target.value, alert: false });
    };

    isDisabled = () => {
        if (!this.state.username || !this.state.password) {
            return true
        } else {
            return false
        }
    }
    
    onSubmit = e => {
    e.preventDefault();

    const userData = {
        username: this.state.username,
        password: this.state.password
    };

        this.props.loginUser(userData);    

    };
    
render() {
    const { errors } = this.state;

return(
    <React.Fragment>
        <Tooltip title="Editor" placement="bottom-start">
            <Button color='inherit' style={{margin: '10px 10px'}} onClick={this.handleClickOpen} >
                <EditIcon style={{fontSize: "2.1em"}}/>
            </Button>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
            <form onSubmit={this.onSubmit}>    
                <TextField
                    required
                    autoFocus
                    id="username"
                    label="Username"
                    name="username"
                    type="text"
                    fullWidth
                    style={{marginBottom: '10px'}}
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    className={classnames("form-input", {
                      invalid: errors.username || errors.userNotFound
                    })}
                />
                <TextField
                    required
                    variant="outlined"
                    id="password"
                    label="Password"
                    name="password"
                    value={this.state.password}
                    error={errors.password}
                    type="password"
                    fullWidth
                    style={{marginBottom: '5px'}}
                    onChange={this.onChange}
                    className={classnames("form-input", {
                        invalid: errors.password || errors.passwordincorrect
                    })}
                />
            <DialogActions style={{display: 'flex', flexDirection: 'column'}}>
                <ClickAwayListener onClickAway={this.handleClickAway}>
                    <React.Fragment>
                    {this.state.alert ? (
                        <div className="alert-box">
                            {errors.username}
                            {errors.userNotFound}
                            {errors.password}
                            {errors.passwordincorrect}
                        </div>
                    ) : <span className="alert-box-hidden"> </span>}    
                    <div style={{alignSelf: 'flex-end'}}>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>    
                        <Button type="submit" color="primary" disabled={this.isDisabled()}>
                            Submit
                        </Button>
                    </div>
                    </React.Fragment>
                </ClickAwayListener>
            </DialogActions>
            </form>
            </DialogContent>
        </Dialog>
    </React.Fragment>
    )
};
};

    Login.propTypes = {
        loginUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
      };
      const mapStateToProps = state => ({
        auth: state.auth,
        errors: state.errors
      });
      export default connect(
        mapStateToProps,
        { loginUser }
      )(Login);