import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from "../modules/EmployeeManager"
import LocationManager from "../modules/LocationManager"
import OwnerManager from "../modules/OwnerManager"
import AnimalDetail from "./animal/AnimalDetail"
import AnimalForm from "./animal/AnimalForm"
import EmployeeForm from "./employee/EmployeeForm"
import Login from "./Login"


export default class ApplicationViews extends Component {
    state = {
        owners: [],
        animalOwners: [],
        employees: [],
        animals: [],
        locations: []
    }

    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    addAnimal = (animal) => {
        return AnimalManager.post(animal)
            .then(() => AnimalManager.getAll())
            .then(animals =>
                this.setState({
                    animals: animals
                })
            )
    }
    deleteAnimal = (id) => {
        return AnimalManager.removeAndList(id)
            .then(animals => this.setState({
                animals: animals
            })
            )
    }
    addEmployee = (employee) => {
        return EmployeeManager.post(employee)
            .then(() => EmployeeManager.getAll())
            .then(employees =>
                this.setState({
                    employees: employees
                })
            )
    }
    deleteEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/employees`))
            .then(e => e.json())
            .then(employees => this.setState({
                employees: employees
            })
            )
    }

    componentDidMount() {

        AnimalManager.getAll().then((allAnimals) => {
            this.setState({ animals: allAnimals })
        })
        EmployeeManager.getAll().then((allEmployees) => {
            this.setState({ employees: allEmployees })
        })
        LocationManager.getAll().then((allLocations) => {
            this.setState({ locations: allLocations })
        })
        OwnerManager.getAll().then((allOwners) => {
            this.setState({ owners: allOwners })
        })
        fetch("http://localhost:5002/animalOwners").then(r => r.json()).then(animalOwners => this.setState({ animalOwners: animalOwners }))

    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" render={() => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props}
                        deleteAnimal={this.deleteAnimal}
                        animals={this.state.animals}
                        owners={this.state.owners}
                        animalOwners={this.state.animalOwners} />
                }} />
                <Route exact path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal}
                        animals={this.state.animals} />
                }} />
                <Route exact path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees} />
                }} />
                <Route exact path="/employees" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props} deleteEmployee={this.deleteEmployee}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee}
                        employees={this.state.employees} />
                }} />
            </React.Fragment>
        )
    }
}