import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import swal from 'sweetalert'
import 'react-datepicker/dist/react-datepicker.css'


export default class CreateStudents extends Component {

    state = {
        periods: [],
        periodName: '',
        startDate: '',
        finalDate: ''
    }

    async componentDidMount() {
        this.getPeriods();
    }

    getPeriods = async () => {
        const res = await axios.get('https://backend-school-mirko.herokuapp.com/api/periods/');
        this.setState({ periods: res.data });
    }

    deletePeriod = async (id) => {
        await swal({
            title: 'Delete',
            text: 'Are you sure you want to delete the period?',
            icon: "warning",
            buttons: ['No', 'Yes']
        }).then(respuesta => {
            if (respuesta) {
                axios.delete('https://backend-school-mirko.herokuapp.com/api/periods/' + id);
                axios.delete('https://backend-school-mirko.herokuapp.com/api/grades?period=' + id);

                swal({
                    text: 'Period Deleted',
                    icon: 'success'
                }).then(() => {
                    this.getPeriods();

                })
            }
        })

    }

    onChangePeriodName = (e) => {
        this.setState({
            periodName: e.target.value
        })
        console.log(e.target.value)
    }

    onChangeDate = startDate => {
        this.setState({ startDate })
    }

    onChangeDate1 = finalDate => {
        this.setState({ finalDate })
    }

    onSubmit = async e => {
        e.preventDefault();

        if (this.state.startDate && this.state.finalDate) {
            const date = this.state.startDate
            const dia = date.getDate()
            const mes = date.getMonth() + 1
            const ano = date.getFullYear()
            const startDate = dia + '/' + mes + '/' + ano
            console.log(startDate, date)
            const date1 = this.state.finalDate
            const dia1 = date1.getDate()
            const mes1 = date1.getMonth() + 1
            const ano1 = date1.getFullYear()
            const finalDate = dia1 + '/' + mes1 + '/' + ano1
            console.log(finalDate, date1)
            await axios.post('https://backend-school-mirko.herokuapp.com/api/periods/', {
                name: this.state.periodName + ' (' + startDate + ' - ' + finalDate + ')'
            })
        } else {
            alert('Error!! Empty Fields')
        }

        this.setState({
            periodName: '',
            startDate: '',
            finalDate: ''
        });
        this.getPeriods();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New Period</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    placeholder="Name"
                                    type="text"
                                    className="form-control"
                                    value={this.state.periodName}
                                    onChange={this.onChangePeriodName} />
                            </div>
                            <div className="form-group">
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.onChangeDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Start Date"
                                />
                            </div>
                            <div className="form-group">
                                <DatePicker
                                    selected={this.state.finalDate}
                                    onChange={this.onChangeDate1}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Final Date"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.periods.map(period => (
                                <li className="list-group-item list-group-item-action"
                                    key={period._id}
                                    onDoubleClick={() => this.deletePeriod(period._id)}
                                >
                                    {period.name}
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
