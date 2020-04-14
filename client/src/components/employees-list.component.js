import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Helmet } from 'react-helmet';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      columns: [
        { title: 'First Name', field: 'firstName',  },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Location / Branch', field: 'location' },
        { title: 'Department', field: 'department' },
        { title: 'Phone Number', field: 'phoneNumber' },
        { title: 'Extension', field: 'extension' },
      ]
    };
  }
  componentDidMount = () => {
    // If logged in and user navigates to Register page, should redirect them to profile
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/editor");
    } else {
      axios.get('/employees/')
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch((error) => {
          console.log(error);
      })
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/editor"); // push user to dashboard when they login
    }
  }

  deleteEmployee = (id) => {
    axios.delete('/employees/'+id)
      .then(res => console.log(res.data));
    this.setState({
      employees: this.state.employees.filter(el => el._id !== id)
    })
  };


  render() {
    return (
      <div>
        <Helmet>
          <title>Company Directory</title>
        </Helmet>
        <MaterialTable
            title="Company Directory"
            columns={this.state.columns}
            data={this.state.employees}
        />
      </div>
    )
  }
}

EmployeesList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps
)(EmployeesList);