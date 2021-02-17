import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

export default class CreateStudents extends Component {

    state = {
        groups: [],
        periods: [],
        groupSelected: '',
        periodSelected: '',
        genderSelected: '',
        Name: '',
        Phone: '',
        Email: '',
        Age: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        //consulto los grupos y periodos para poder seleccionarlos y los guardo en el estado en el array
        const res = await axios.get('http://localhost:4000/api/groups/')
        const res1 = await axios.get('http://localhost:4000/api/periods/')

        this.setState({
            groups: res.data.map(group => group),
            groupSelected: '',
            genderSelected: '',
            periods: res1.data.map(period => period),
            periodSelected: ''
        })

        //si se presenta un id en el params voy a actualizar y retorno los valores de ese id student
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/students/' + this.props.match.params.id)
            console.log(res)
            this.setState({
                groupSelected: res.data.group,
                periodSelected: res.data.period,
                genderSelected: res.data.gender,
                Name: res.data.name,
                Phone: res.data.phone,
                Email: res.data.email,
                Age: res.data.age,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    //Envia el objeto form dependiendo si quiere actualizar o registar un estudiante
    onSubmit = async (e) => {
        e.preventDefault();
        const newStudent = {
            group: this.state.groupSelected,
            period: this.state.periodSelected,
            name: this.state.Name,
            email: this.state.Email,
            gender: this.state.genderSelected,
            age: this.state.Age,
            phone: this.state.Phone
        };


        //si editing esra en true hace el metodo put
        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/students/' + this.state._id, newStudent).then(res => {
                // do stuff
                console.log(res);
                swal({
                    text: 'Updated student',
                    icon: 'success'
                }).then(() => {
                    window.location.href = '/listStudent';
                })
            })
                .catch(err => {
                    // what now?
                    console.log(err);
                    swal({
                        text: 'The student exists or there is an empty field',
                        icon: 'error'
                    })
                })
        } else {

            //si editing esra en false hace el metodo pots
            await axios.post('http://localhost:4000/api/students/', newStudent).then(res => {
                // do stuff
                console.log(res);
                swal({
                    text: 'Registered student',
                    icon: 'success'
                }).then(() => {
                    window.location.href = '/createStudent';
                })
            })
                .catch(err => {
                    // what now?
                    console.log(err);
                    swal({
                        text: 'The student exists or there is an empty field',
                        icon: 'error'
                    })
                })
        }
    }

    //Seteo en el estado el nombre(que lo relaciono desde el input del form) y el valor deseado
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.name, e.target.value)
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create Students</h4>

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
                        <select
                            className="form-control"
                            name="periodSelected"
                            onChange={this.onInputChange}
                            value={this.state.periodSelected}
                        >
                            <option value="">Select a Period</option>
                            {
                                this.state.periods.map(period =>
                                    <option key={period._id} value={period._id}>
                                        {period.name}
                                    </option>)
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="Name"
                            onChange={this.onInputChange}
                            required
                            value={this.state.Name}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Age"
                            name="Age"
                            onChange={this.onInputChange}
                            required
                            value={this.state.Age}
                        />
                    </div>

                    <div className="form-group">
                        <select
                            className="form-control"
                            name="genderSelected"
                            onChange={this.onInputChange}
                            value={this.state.genderSelected}
                        >
                            <option value="">Select a Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="Email"
                            onChange={this.onInputChange}
                            required
                            value={this.state.Email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                            name="Phone"
                            onChange={this.onInputChange}
                            required
                            value={this.state.Phone}
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
