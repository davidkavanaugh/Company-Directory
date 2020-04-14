const router = require('express').Router();
let Employee = require('../models/employee.model');

router.route('/').get((req, res) => {
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const location = req.body.location;
    const department = req.body.department;
    const phoneNumber = req.body.phoneNumber;
    const extension = req.body.extension;

    const newEmployee = new Employee({
        firstName,
        lastName,
        location,
        department,
        phoneNumber,
        extension
    });

    newEmployee.save()
        .then(() => res.json('Employee added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Employee.findByIdAndDelete(req.params.id)
      .then(() => res.json('Employee deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
    Employee.findById(req.params.id)
      .then(employee => {
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.location = req.body.location;
        employee.department = req.body.department;
        employee.phoneNumber = req.body.phoneNumber;
        employee.extension = req.body.extension;
  
        employee.save()
          .then(() => res.json('Employee updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;