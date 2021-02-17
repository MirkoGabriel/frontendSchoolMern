import React, { Component } from 'react'
import axios from 'axios'

export default class EditGrade extends Component {
    state = {
        groups: [],
        periods: [],
        students:[],
        subjects:[],
        subjectName: '',
        periodSelected: '',
        studentSelected: '',
        groupSelected:'',
        subjectSelected: '',
        noteSelected: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        console.log(this.props.match.params.id)

        if (this.props.match.params.id) {
            const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/grades/' + this.props.match.params.id)
            console.log(res)
            this.setState({
                periodSelected: res.data.period._id,
                groupSelected:res.data.group._id,
                subjectName:res.data.subject.name,
                noteSelected: res.data.note,
                studentSelected:res.data.student._id,
                subjectSelected:res.data.subject._id,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const newGrade = {
            period: this.state.periodSelected,
            group: this.state.groupSelected,
            student: this.state.studentSelected,
            subject: this.state.subjectSelected,
            note: this.state.noteSelected
        };

        console.log(newGrade)
        
        if (this.state.editing) {
            await axios.put('https://backend-school-mirko.herokuapp.com/api/grades/' + this.state._id, newGrade).then(res => {
                // do stuff
                console.log(res);
                swal({
                    text: 'Grade Updated',
                    icon: 'success'
                }).then(() => {
                    window.location.href = '/listGrades'
                })
            })
                .catch(err => {
                    // what now?
                    console.log(err);
                    alert()
                    swal({
                        text: 'The Grade exists or there is an empty field',
                        icon: 'warning'
                    })
                })
        } else {
            alert('error')
        }
    }
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Edit Grade {this.state.subjectName}</h4>

                    <div className="form-group">
                        <select
                            className="form-control"
                            name="noteSelected"
                            onChange={this.onInputChange}
                            value={this.state.noteSelected}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
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
