import React, { Component } from "react"
import { Link } from "react-router-dom"
import dog from "./DogIcon.png"
import "./AnimalList.css"

export default class AnimalCard extends Component {
    render() {
        return (
            <div key={this.props.animal.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={dog} className="icon--dog" />
                        {this.props.animal.name}
                        <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>Details</Link>
                        <button type="button"
                                className="btn btn-success"
                                onClick={() => {
                                this.props.history.push(`/animals/${this.props.animal.id}/edit`);
                                }}
                                >Edit</button>
                        <a href="#"
                            onClick={() => this.props.deleteAnimal(this.props.animal.id)}
                            className="card-link">Discharge</a>
                    </h5>
                </div>
            </div>
        )
    }
}