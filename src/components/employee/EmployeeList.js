import React, { Component } from 'react'
import "./EmployeeList.css"
import vet from "./VetIcon.png"


export default class EmployeeList extends Component {

    render() {
        return (
            <section className="employees">
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/employees/new")
                    }
                    }>
                    Hire New Employee
                    </button>
                {
                    this.props.employees.map(employee =>
                        <div key={employee.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <img src={vet} className="icon--vet" />
                                    {employee.name}
                                </h5>
                                <button
                                    onClick={() => this.props.deleteEmployee(employee.id)
                                        .then(() => this.props.history.push("/employees"))
                                    }
                                    className="card-link">Delete</button>
                            </div>
                        </div>
                    )
                }
            </section>
        )
    }
}

