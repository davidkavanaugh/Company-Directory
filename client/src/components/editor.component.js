
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';


export default class EmployeesList extends Component {
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
    axios.get('/employees')
     .then(response => {
       this.setState({ employees: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  };

  deleteEmployee = (id) => {
    axios.delete('/employees/'+id)
      .then(res => console.log(res.data));
    this.setState({
      employees: this.state.employees.filter(el => el._id !== id)
    })
  };


  render() {
    return (
        <MaterialTable
            title="Company Directory"
            columns={this.state.columns}
            data={this.state.employees}
            editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.employees;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        this.setState({ data }, () => resolve());
                        axios.post('/employees/edit/'+newData._id, newData)
                        .then(res => console.log(res.data));
                      }
                      resolve()
                      window.location = '/';
                    }, 1000)
                  })
                  ,
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        let data = this.state.employees;
                        const index = data.indexOf(oldData);
                        let newData = data[index]
                        console.log(newData)
                        this.deleteEmployee(newData._id)
                      }
                      resolve()
                    }, 1000)
                  }),
              }}
      />
    )
  }
}