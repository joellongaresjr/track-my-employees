const db = require('./config/connection.js')
const inquirer = require('inquirer')


const viewAllDepartments = () => {


}

const viewAllRoles = () => {

}

const viewAllEmployees = () => {
    //query database *async
    //display results
    //return to main menu
}


const addNewDepartment = () => {

}


const addNewRole = () => {
    //ask name of the role 
    //ask the salary
    //query the department *async for every qury
        //ask deaprtment with list of choices
        //write new data to db
            // extract department ID**
    //return confirmation message
    //return to main menu
}


const addNewEmployee = () => {
    // ask for first and last name of employee you are adding
    // ask for employees role use [Choices]
        // in order to execut this, must querly foles first and show in m/c list.
    // Ask if employee has manager
        // query employees and display multiple choice
}




const updateEmployee
    // first
    // last
    // query list of employees
        // select employee you want to update 
    // do you want to update this employee
    // query titles 
        // have option to change role/department/ delete
    // who is the manager?
        // list of managers

