import React, { Component } from "react"
import dog from "./DogIcon.png"


export default class AnimalDetail extends Component {
    render() {
        const animals = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId)) || {}
        return (
            <section className="animal">
                <div key={animals.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={dog} className="icon--dog" />
                            {animals.name}
                        </h4>
                        <h6 className="card-title">{animals.breed}</h6>
                        <a href="#"
                            onClick={() => this.props.deleteAnimal(animals.id)
                                            .then(() => this.props.history.push("/animals"))}
                            className="card-link">Delete</a>
                    </div>
                </div>
            </section>
        )
    }
}