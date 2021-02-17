import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

export default class SubjectsList extends Component {
    state = {
        subjects: [],
        subjectsAux: [],
        groups: [],
        groupSelected: ''
    }
    //carga en el arrayGroup definido en el estado los grupos y ponerlos en el select para filtrar
    async componentDidMount() {
        this.getSubjects();

        const res = await axios.get('http://localhost:4000/api/groups/')
        this.setState({
            groups: res.data.map(group => group),
            groupSelected: ''
        })
    }

    //filtrar materias por group CAMBIAR!!!!
    filter = async (group) => {
        if (group === '') {
            this.getSubjects();
        } else {
            const res1 = this.state.subjectsAux.find(pos => pos.group === null)
            if (res1) {
                alert('Error')
                const res = this.state.subjectsAux.filter(pos => pos.group === null)

                this.setState({ subjects: res })
            } else {
                const res = this.state.subjectsAux.filter(pos => pos.group._id === group && pos.group !== null)

                if (res.length === 0) {
                    swal({
                        title: 'Error',
                        text: 'There are no subjects in this group',
                        icon: "warning"
                    }).then(() => {
                        window.location.href = 'listSubject'
                    })
                } else {
                    this.setState({ subjects: res })
                }

            }
        }
    }
    alert
    //obtiene de la bbdd todas las meterias
    async getSubjects() {
        const res = await axios.get('http://localhost:4000/api/subjects/');
        console.log(res)
        this.setState({
            subjects: res.data.slice(0, 10),
            subjectsAux: res.data
        })
    }

    // de la accion one click llama a esta funcion mandando el id de la materia seleccionada y la borra
    deleteSubject = async (id) => {
        await swal({
            title: 'Delete',
            text: 'Are you sure you want to delete the subject?',
            icon: "warning",
            buttons: ['No', 'Yes']
        }).then(respuesta => {
            if (respuesta) {
                axios.delete('http://localhost:4000/api/subjects/' + id);
                axios.delete('http://localhost:4000/api/grades?subject=' + id)

                swal({
                    text: 'Subject Deleted',
                    icon: 'success'
                }).then(() => {
                    this.getSubjects()
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
                            <th scope="col">Group</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.subjects.map(subject => (
                                <tr key={subject._id}>
                                    {(() => {
                                        if (subject.group) {
                                            return (
                                                <th>{subject.group.name}</th>
                                            )
                                        } else {
                                            return (
                                                <th>{null}</th>
                                            )
                                        }
                                    })()}
                                    <th>{subject.name}</th>
                                    <th>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => this.deleteSubject(subject._id)}
                                            >
                                                Delete
                                            </button>
                                            <Link className="btn btn-dark" to={'/editSubject/' + subject._id}>
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
