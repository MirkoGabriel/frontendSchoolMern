import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

export default class StudentsList extends Component {
    state = {
        students: [],
        studentsAux: [],
        groups: [],
        groupSelected: ''
    }
    //cargo en los selec los filtros (grupos y periodos)
    async componentDidMount() {
        this.getStudents();
        const res = await axios.get('http://localhost:4000/api/groups/')
        this.setState({
            groups: res.data.map(group => group),
            groupSelected: ''
        })
    }

    //filtra el grupo y periodo los alumnos FIJARSE DE MODIFICAR!!!
    filter = async (group) => {
        if (group === '') {
            this.getStudents();
        } else {
            const res1 = this.state.studentsAux.find(pos => pos.group === null)
            if (res1) {
                alert('Error')
                const res = this.state.studentsAux.filter(pos => pos.group === null)
                
                this.setState({ students: res })
            } else {

                const res = this.state.studentsAux.filter(pos => pos.group._id === group)

                if (res.length === 0) {
                    swal({
                        title: 'Error',
                        text: 'There are no students in this group',
                        icon: "warning"
                    }).then(()=>{
                        window.location.href = 'listStudent'
                    })
                } else {
                    this.setState({ students: res })
                }
            }
        }
    }

    //consulta a la bbdd los estudiantes y los muestra (en el back end esta seteado para que muestre los 10 primeros)
    async getStudents() {
        const res = await axios.get('http://localhost:4000/api/students/');
        this.setState({
            students: res.data.slice(0, 10),
            studentsAux: res.data
        })
    }

    //recibe el id de la accion oneclick y elimina el id estudiante deseado
    delete = async (id) => {
        await swal({
            title: 'Delete',
            text: 'Are you sure you want to delete the student?',
            icon: "warning",
            buttons: ['No', 'Yes']
        }).then(respuesta => {
            if (respuesta) {
                axios.delete('http://localhost:4000/api/students/' + id);
                axios.delete('http://localhost:4000/api/grades?student=' + id)
                
                swal({
                    text: 'Student Deleted',
                    icon: 'success'
                }).then(()=>{
                    this.getStudents();
                })
            }
        })


    }

    //Seteo en el estado el nombre(que lo relaciono desde el input del form) y el valor deseado
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
                    <select
                        className="form-control"
                        name="groupSelected"
                        onChange={this.onInputChange}
                        onClick={() => this.filter(this.state.groupSelected)}
                    >
                        <option value="">Select a Group</option>
                        {
                            this.state.groups.map(group =>
                                <option key={group._id} value={group._id}>
                                    {group.name}
                                </option>)
                        }
                    </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Group</th>
                            <th scope="col">Period</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Age</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.students.map(student => (

                                <tr key={student._id}>


                                    <th>{student.name}</th>
                                    {(() => {
                                        if (student.group) {
                                            return (
                                                <th>{student.group.name}</th>
                                            )
                                        } else {
                                            return (
                                                <th>{null}</th>
                                            )
                                        }
                                    })()}
                                    {(() => {
                                        if (student.period) {
                                            return (
                                                <th>{student.period.name}</th>
                                            )
                                        } else {
                                            return (
                                                <th>{null}</th>
                                            )
                                        }
                                    })()}
                                    <th>{student.gender}</th>
                                    <th>{student.age}</th>
                                    <th>{student.email}</th>
                                    <th>{student.phone}</th>
                                    <th>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => this.delete(student._id)}
                                            >
                                                Delete
                                            </button>
                                            <Link className="btn btn-dark" to={'/editStudent/' + student._id}>
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
