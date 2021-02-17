import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

export default class CreateSubjects extends Component {

    state = {
        groups: [],
        groupSelected: '',
        Name: '',
        editing: false,
        _id: ''
    }
    alert
    //consulto a la bbdd los groupos para guardarlos en el array groups y ponerlo en el select y filtrar
    async componentDidMount() {
        console.log(this.props.match.params)
        const res = await axios.get('http://localhost:4000/api/groups/')
        this.setState({
            groups: res.data.map(group => group),
            groupSelected: ''
        })
        //si recibe por parametro un id de una materia 'x' voy a actualuizar y llamo a la materia de ese id
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/subjects/' + this.props.match.params.id)
            console.log(res)
            this.setState({
                groupSelected: res.data.group,
                Name: res.data.name,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    //al enviar el form puedo hacer un post o put
    onSubmit = async (e) => {
        e.preventDefault();
        const newSubject = {
            group: this.state.groupSelected,
            name: this.state.Name
        };

        //perviamente en el estado defini un atributo 'editing' el cual si esta en true actualizo
        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/subjects/' + this.state._id, newSubject).then(res => {
                // do stuff
                console.log(res);
                swal({
                    text: 'Subject Updated',
                    icon: 'success'
                }).then(() => {
                    window.location.href = '/listSubject'
                })
            })
                .catch(err => {
                    // what now?
                    console.log(err);
                    swal({
                        text: 'The subject exists or there is an empty field',
                        icon: 'warning'
                    })
                })
        } else {
            //si editing esta en false hago un post
            await axios.post('http://localhost:4000/api/subjects/', newSubject).then(res => {
                // do stuff
                console.log(res);
                swal({
                    text: 'Subject Created',
                    icon: 'success'
                }).then(() => {
                    window.location.href = '/createSubject';
                })
            })
                .catch(err => {
                    // what now?
                    console.log(err);
                    swal({
                        text: 'The subject exists or there is an empty field',
                        icon: 'warning'
                    })
                })
        }

    }
    //Seteo en el estado el nombre(que lo relaciono desde el input del form) y el valor deseado
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create Subject</h4>

                    {/** SELECT GROUP */}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="groupSelected"
                            onChange={this.onInputChange}
                            value={this.state.groupSelected}
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

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Subject Name"
                            name="Name"
                            onChange={this.onInputChange}
                            required
                            value={this.state.Name}
                        />
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
