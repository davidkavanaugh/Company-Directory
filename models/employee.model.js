const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        location: String,
        department: String,
        phoneNumber: String,
        extension: String,
    },
    {
        timestamps: true
    }
);

const Employee = mongoose.model('employees', employeeSchema);

module.exports = Employee;