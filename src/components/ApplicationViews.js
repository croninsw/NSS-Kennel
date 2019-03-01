import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from "../modules/EmployeeManager"
import LocationManager from "../modules/LocationManager"
import OwnerManager from "../modules/OwnerManager"


export default class ApplicationViews extends Component {
    state = {
        owners: [],
        animalOwners: [],
        employees: [],
        animals: [],
        locations: []
    }

    deleteAnimal = id => {
        return fetch(`http://localhost:5002/animals/${id}`, {
            method: "DELETE"
        })
            .then(a => a.json())
            .then(() => fetch(`http://localhost:5002/animals`))
            .then(a => a.json())
            .then(animals => this.setState({
                animals: animals
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
            this.setState({animals: allAnimals})
        })
        EmployeeManager.getAll().then((allEmployees) => {
            this.setState({employees: allEmployees})
        })
        LocationManager.getAll().then((allLocations) => {
            this.setState({locations: allLocations})
        })
        OwnerManager.getAll().then((allOwners) => {
            this.setState({owners: allOwners})
        })
        fetch("http://localhost:5002/animalOwners").then(r => r.json()).then(animalOwners => this.setState({animalOwners: animalOwners}))

    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={() => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={() => {
                    return <AnimalList deleteAnimal={this.deleteAnimal} animals={this.state.animals}
                        owners={this.state.owners}
                        animalOwners={this.state.animalOwners}
                    />
                }} />
                <Route path="/employees" render={() => {
                    return <EmployeeList deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
                }} />
            </React.Fragment>
        )
    }
}