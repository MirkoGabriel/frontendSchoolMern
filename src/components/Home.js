import React, { Component } from 'react';
import logo from '../logo.png'
import texto from '../texto.png'

export default class Home extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                <img src={logo}/>
                </div>
                <div className="col-md-3">
                <img src={texto}/>
                    
                </div>
            </div>
        )
    }
}