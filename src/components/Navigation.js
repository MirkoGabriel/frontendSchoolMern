import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

export default class Navigation extends Component {
    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Mirko's School</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto" >
                             <div className="btn">
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        Students
                                </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem><Link className="dropdown-item" to="/listStudent">List Students</Link></DropdownItem>
                                        <DropdownItem><Link className="dropdown-item" to="/createStudent">Register Students</Link></DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                            <div className="btn">
                                <UncontrolledDropdown>
                                    <DropdownToggle caret >
                                        Subjects
                                </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem><Link className="dropdown-item" to="/listSubject">List Subjects</Link></DropdownItem>
                                        <DropdownItem><Link className="dropdown-item" to="/createSubject">Register Subject</Link></DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                            <div className="btn">
                                <UncontrolledDropdown>
                                    <DropdownToggle caret >
                                        Ratings
                                </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem><Link className="dropdown-item" to="/listGrades">Student reports</Link></DropdownItem>
                                        <DropdownItem><Link className="dropdown-item" to="createGrade">Record Grades</Link></DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                            <div className="btn">
                                <Link className="btn btn-secondary" to="/createGroup">Group</Link>
                            </div>

                            <div className="btn">
                                <Link className="btn btn-secondary" to="/createPeriod">Period</Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
