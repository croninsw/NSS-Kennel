import React, { Component } from 'react'
import Animal from './Animal'
import "./AnimalList.css"

export default class AnimalList extends Component {

    render() {
        return (
            <article className="animals">
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/animals/new")
                    }
                    }>
                    Admit Animal
                    </button>
                {
                    this.props.animals.map(animal =>
                        <Animal key={`${animal.id}`}
                        animal={animal}
                        deleteAnimal={this.props.deleteAnimal}
                        owners={
                            this.props.animalOwners

                            .filter(ao => ao.animalId === animal.id)
                            .map(ao =>
                                this.props.owners.find(
                                    o => o.id === ao.ownerId
                                        ).name

                                    )
                            } />
                    )
                }
            </article>

        )
    }
}