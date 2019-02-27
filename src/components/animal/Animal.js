import React, { Component } from 'react'

export default class Animal extends Component {
    render() {

        return (
            <section className="animal">
                <div>
                    { this.props.animal.name }
                </div>
                <div>
                    { this.props.owners.join(", ") }
                </div>
            </section>
        )
    }
}