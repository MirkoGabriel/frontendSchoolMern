import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

export default class CreateStudents extends Component {

    state = {
        groups: [],
        groupName: ''
    }

    async componentDidMount() {
        this.getGroups();
    }

    getGroups = async () => {
        const res = await axios.get('http://localhost:4000/api/groups/');
        this.setState({ groups: res.data });
    }

    deleteGroup = async (id) => {
        await swal({
            title: 'Delete',
            text: 'Are you sure you want to delete the group?',
            icon: "warning",
            buttons: ['No', 'Yes']
        }).then(respuesta => {
            if (respuesta) {
                axios.delete('http://localhost:4000/api/groups/' + id);
                axios.delete('http://localhost:4000/api/grades?group=' + id)

                swal({
                    text: 'Group Deleted',
                    icon: 'success'
                }).then(() => {

                    this.getGroups();
                })
            }
        })


    }

    onChangeGroupName = (e) => {
        this.setState({
            groupName: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/groups/', {
            name: this.state.groupName
        })
        this.setState({ groupName: '' });
        this.getGroups();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New Group</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={this.state.groupName}
                                    onChange={this.onChangeGroupName} />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.groups.map(group => (
                                <li className="list-group-item list-group-item-action"
                                    key={group._id}
                                    onDoubleClick={() => this.deleteGroup(group._id)}
                                >
                                    {group.name}
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
