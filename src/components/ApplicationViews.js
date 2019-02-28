import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import SearchResult from './SearchResults'
import AnimalManager from "../modules/AnimalManager"


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

        AnimalManager.getAll("animals").then((allAnimals) => {
            this.setState({animals: allAnimals})
        })
        AnimalManager.getAll("employees").then((allEmployees) => {
            this.setState({employees: allEmployees})
        })
        AnimalManager.getAll("locations").then((allLocations) => {
            this.setState({locations: allLocations})
        })
        AnimalManager.getAll("owners").then((allOwners) => {
            this.setState({owners: allOwners})
        })
        AnimalManager.getAll("animalOwners").then((allAnimalOwners) => {
            this.setState({animalOwners: allAnimalOwners})
        })
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
                <Route path="/search" render={() => {
                    return <SearchResult searchResult={this.state.searchResult} />
                }} />
            </React.Fragment>
        )
    }
}