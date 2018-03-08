/* eslint react/prop-types: 0 */
import React, { Component } from "react";

class Salida extends Component {
  render () {
    return (
      <div className="down">
        <h1>Respuesta:</h1>
        <br/>
        <div className="row">
          <div className="col-sm-4">
            <p>{this.props.obj}</p>
          </div>
        </div>
        <hr/>
        <br/>
        <br/>
        <h1>Logs:</h1>
        <div>
          <p>1. {this.props.obj}</p>
        </div>
      </div>
    );
  }
}

export default Salida;
