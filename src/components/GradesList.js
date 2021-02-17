import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

export default class GradesList extends Component {
    state = {
        grades: [],
        gradesAux: [],
        students: [],
        studentsAux: [],
        periods: [],
        groups: [],
        studentSelected: '',
        periodSelected: '',
        groupSelected: '',
        message: '',
        message1: ''
    }

    async componentDidMount() {
        this.getGroups();
        this.getStudents();
        this.getPeriods();
        this.getGrades();
    }

    //obtiene de la bbdd todas las students
    async getStudents() {
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/students/');
        this.setState({
            studentsAux: res.data.map(student => student),
            studentSelected: '',
        })
    }
    //obtiene de la bbdd todas las periods
    async getPeriods() {
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/periods/');
        this.setState({
            periods: res.data.map(period => period),
            periodSelected: ''
        })
    }
    //obtiene de la bbdd todas las notas
    async getGrades() {
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/grades/');
        this.setState({
            gradesAux: res.data.map(period => period)
        })
    }
    //obtiene de la bbdd todas los grupos
    async getGroups() {
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/groups/');
        this.setState({
            groups: res.data.map(group => group),
            groupSelected: ''
        })
    }
    //filtra estudiantes por grupo
    filterStudent = async (group) => {
        if (group === '') {
            swal({
                title: 'Error',
                text: 'Select group',
                icon: "warning"
            })
        } else {
            const res1 = this.state.studentsAux.find(pos => pos.group === null)
            if (res1) {
                swal({
                    title: 'Error',
                    text: 'Assign group to all students',
                    icon: "error"
                }).then(() => {
                    window.location.href = 'listGrades'
                })
            } else {

                const res = this.state.studentsAux.filter(pos => pos.group._id === group)

                if (res.length === 0) {
                    swal({
                        title: 'Error',
                        text: 'There are no students in this group',
                        icon: "warning"
                    }).then(() => {
                        window.location.href = 'listGrades'
                    })
                } else {
                    this.setState({ students: res })
                }
            }
        }
    }
    //filtra las notas del alumno por periodo
    filter = async (student, period) => {
        console.log(student, period)
        if (period === '') {
            swal({
                title: 'Error',
                text: 'Select period',
                icon: "warning"
            }).then(() => {
                window.location.href = 'listGrades'
            })
        } else {
            const res = this.state.gradesAux.filter(pos => pos.student._id === student && pos.period._id === period)
            const alumno = this.state.studentsAux.find(pos => pos._id === student)

            if (res.length === 0) {
                swal({
                    title: 'Error',
                    text: 'There are no grades for this student in this period',
                    icon: "warning"
                }).then(() => {
                    window.location.href = 'listGrades'
                })
            } else {
                const grupo = res[0].group.name
                this.setState({
                    grades: res,
                    message: alumno.name + '´s Report Card',
                    message1: 'Corresponds to course ' + grupo
                })
            }
        }
    }
    print() {
        window.print()
    }
    deleteNote = async (id) => {
        await swal({
            title: 'Delete',
            text: 'Are you sure you want to delete the grade?',
            icon: "warning",
            buttons: ['No', 'Yes']
        }).then(respuesta => {
            if (respuesta) {
                axios.delete('https://backend-school-mirko.herokuapp.com/api/grades?id=' + id);

                swal({
                    text: 'Grade Deleted',
                    icon: 'success'
                }).then(() => {
                    window.location.href = 'listGrades'
                })
            }
        })
        
    }

    onInputChange = e => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value

        })
    }
    render() {
        return (
            <div className="row">
                <div className="form-group">
                    <table className="table">
                        <thead>

                            <tr>
                                <th scope="col">
                                    <select
                                        className="form-control"
                                        name="groupSelected"
                                        onChange={this.onInputChange}
                                        onClick={() => this.filterStudent(this.state.groupSelected)}
                                    >
                                        <option value="">Select a Group</option>
                                        {
                                            this.state.groups.map(group =>
                                                <option key={group._id} value={group._id}>
                                                    {group.name}
                                                </option>)
                                        }
                                    </select>
                                </th>
                                <th scope="col">
                                    <select
                                        className="form-control"
                                        name="studentSelected"
                                        onChange={this.onInputChange}
                                    // onClick={() => this.filter(this.state.studentSelected, this.state.periodSelected)}
                                    >
                                        <option value="">Select a Student</option>
                                        {
                                            this.state.students.map(student =>
                                                <option key={student._id} value={student._id}>
                                                    {student.name}
                                                </option>)
                                        }
                                    </select>
                                </th>
                                <th scope="col">
                                    <select
                                        className="form-control"
                                        name="periodSelected"
                                        onChange={this.onInputChange}
                                        onClick={() => this.filter(this.state.studentSelected, this.state.periodSelected, this.state.groupSelected)}
                                    >
                                        <option value="">Select a Period</option>
                                        {
                                            this.state.periods.map(period =>
                                                <option key={period._id} value={period._id}>
                                                    {period.name}
                                                </option>)
                                        }
                                    </select>
                                </th>
                                <th scope="col">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => this.print()}
                                    >
                                        Print
                                    </button>
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <h2>{this.state.message}</h2>
                    <h2>{this.state.message1}</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Subject</th>
                            <th scope="col">Note</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.grades.map(grade => (
                                <tr key={grade._id}>
                                    {(() => {
                                        if (grade.subject) {
                                            return (
                                                <th>{grade.subject.name}</th>
                                            )
                                        } else {
                                            return (
                                                <th>{null}</th>
                                            )
                                        }
                                    })()}
                                    {(() => {
                                        if (grade.note) {
                                            return (
                                                <th>{grade.note}</th>
                                            )
                                        } else {
                                            return (
                                                <th>{null}</th>
                                            )
                                        }
                                    })()}
                                    <th>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => this.deleteNote(grade._id)}
                                            >
                                                Delete
                                            </button>
                                            <Link className="btn btn-dark" to={'/editGrade/' + grade._id}>
                                                Edit
                                            </Link>
                                        </div>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
