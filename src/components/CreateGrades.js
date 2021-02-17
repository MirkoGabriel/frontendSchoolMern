import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

export default class CreateGrades extends Component {
    state = {
        groups: [],
        //periods: [],
        students: [],
        subjects: [],
        grades: [],
        studentsAux: [],
        subjectsAux: [],
        groupSelected: '',
        periodSelected: '',
        inperiod: '',
        inperiodID: '',
        studentSelected: '',
        subjectSelected: '',
        noteSelected: ''
    }

    async componentDidMount() {
        console.log(this.props.match.params.id)
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/groups/')
        this.getStudents();
        this.getSubjects();
        this.getGrades();
        //const res1 = await axios.get('https://school-mern-mirko.herokuapp.com/api/periods')
        this.setState({
            groups: res.data.map(group => group),
            groupSelected: '',
            noteSelected: '',
            // periods: res1.data.map(period => period.name),
            //periodSelected: res1.data[0].name
        })
    }

    //obtiene de la bbdd todas las students
    async getStudents() {
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/students/');
        this.setState({
            // students: res.data.slice(0, 10),
            studentsAux: res.data
        })
        console.log(this.state.studentsAux)
    }

    //obtiene de la bbdd todas las meterias
    async getSubjects() {
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/subjects/');
        this.setState({
            // subjects: res.data.slice(0,10),
            subjectsAux: res.data
        })
        console.log(this.state.subjectsAux)
    }

    async getGrades() {
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/grades/');
        console.log(res)
        this.setState({
            // subjects: res.data.slice(0,10),
            grades: res.data
        })
        console.log(this.state.grades)
    }

    filter = async (group) => {
        if (group === '') {
            swal({
                title: 'Error',
                text: 'Select group',
                icon: "warning"
            })
            //window.location.href='createGrade'
            this.setState({ groupSelected: '' })
        } else {
            const val1 = this.state.subjectsAux.find(pos => pos.group === null)
            const val2 = this.state.studentsAux.find(pos => pos.group === null)
            if (val1 || val2) {
                swal({
                    title: 'Error',
                    text: 'Error there are no groups assigned to students or subjects',
                    icon: "error"
                })
            } else {

                const res1 = this.state.subjectsAux.filter(pos => pos.group._id === group)

                if (res1.length === 0) {
                    swal({
                        title: 'Error',
                        text: 'There are no subjects in this group',
                        icon: "warning"
                    })
                } else {
                    this.setState({ subjects: res1 })
                }

                const res = this.state.studentsAux.filter(pos => pos.group._id === group)

                if (res.length === 0) {
                    swal({
                        title: 'Error',
                        text: 'There are no students in this group',
                        icon: "warning"
                    })
                    this.setState({ groupSelected: '' })
                } else {
                    this.setState({ students: res })
                }
            }
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newGrade = {
            group: this.state.groupSelected,
            period: this.state.inperiodID,
            student: this.state.studentSelected,
            subject: this.state.subjectSelected,
            note: this.state.noteSelected
        };
        console.log(newGrade)

        const res = this.state.grades.find(pos => pos.period._id === newGrade.period
            && pos.subject._id === newGrade.subject
            && pos.student._id === newGrade.student)
        if (res) {
            swal({
                title: 'Error',
                text: 'There is already a grade for that subject registered for that student',
                icon: "warning"
            })
        } else {
            await axios.post('https://backend-school-mirko.herokuapp.com/api/grades', newGrade).then(res => {
                // do stuff
                console.log(res);

                swal({
                    text: 'Registered grade',
                    icon: "success"
                }).then(() => {
                    window.location.href = '/createGrade';
                })
            })
                .catch(err => {
                    // what now?
                    console.log(err);
                    swal({
                        title: 'Error',
                        text: 'Empty fields',
                        icon: "warning"
                    })
                })

        }
    }

    filterPeriod = async (student) => {
        const res1 = this.state.studentsAux.find(pos => pos._id === student)
        console.log(res1)
        if (res1) {
            if (res1.period === null) {
                this.setState({
                    inperiod: '',
                    inperiodID: ''
                })
            } else {
                this.setState({
                    inperiod: res1.period.name,
                    inperiodID: res1.period._id
                })
            }

        } else {
            swal({
                text: 'Error!!! Select a Student!!!',
                icon: "error"
            }).then(() => {

                this.setState({
                    inperiod: '',
                    inperiodID: ''
                })
            })
        }

    }
    onInputChange = e => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create Grades</h4>

                    {/** SELECT GROUP */}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="groupSelected"
                            onChange={this.onInputChange}
                            value={this.state.groupSelected}

                            onClick={() => this.filter(this.state.groupSelected)}
                        >
                            <option value="">Select a Group</option>
                            {
                                this.state.groups.map(group =>
                                    <option
                                        key={group._id}
                                        value={group._id}
                                    >
                                        {group.name}
                                    </option>)
                            }
                        </select>
                    </div>


                    <div className="form-group">
                        <select
                            className="form-control"
                            name="studentSelected"
                            onChange={this.onInputChange}
                            value={this.state.studentSelected}
                            onClick={() => this.filterPeriod(this.state.studentSelected)}
                        >
                            <option value="">Select a Student</option>
                            {
                                this.state.students.map(student =>
                                    <option key={student._id} value={student._id}>
                                        {student.name}
                                    </option>)
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <select
                            className="form-control"
                            name="subjectSelected"
                            onChange={this.onInputChange}
                            value={this.state.subjectSelected}
                        >
                            <option value="">Select a Subject</option>
                            {
                                this.state.subjects.map(subject =>
                                    <option key={subject._id} value={subject._id}>
                                        {subject.name}
                                    </option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="inperid"
                            onChange={this.onInputChange}
                            required
                            value={this.state.inperiod}
                            readOnly="readonly"
                            placeholder="Period Name"
                        />
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="noteSelected"
                            onChange={this.onInputChange}
                            value={this.state.noteSelected}
                        >

                            <option value="">Select a Note</option>
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
