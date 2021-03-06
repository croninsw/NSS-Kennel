import React, { Component } from "react"
import "./AnimalList.css"
import AnimalCard from "./AnimalCard"

export default class AnimalList extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="animalButton">
                    <button type="button"
                            onClick={()=> this.props.history.push("/animals/new")}
                            className="btn btn-success">
                        Admit Animal
                    </button>
                </div>
                <section className="animals">
                {
                    this.props.animals.map(animal =>
                        <AnimalCard key={animal.id} animal={animal} {...this.props} history={this.props.history} />
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}