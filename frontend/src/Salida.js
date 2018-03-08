/* eslint react/prop-types: 0 */
import React, { Component } from "react";

class Salida extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cambio: null
    };
  }
  render () {
    let lista;
    let i = -1;
    if (typeof this.props.lista !== "undefined" && this.props.lista !== null && this.props.lista.length !== 0) {
      lista = this.props.lista.map((d) => {
        i++;
        return (
          <div key={i} className="col-sm-3">
            {i}. {d.mensaje}
          </div>
        );
      });
    } else {
      lista = "nada";
    }
    return (
      <div className="down">
        <h1>Respuesta:</h1>
        <br />
        <div className="row">
          <div className="col-sm-4">
            <p>{this.props.obj}</p>
          </div>
        </div>
        <hr />
        <br />
        <br />
        <h1>Logs:</h1>
        <div className="row">
          {lista}
        </div>
      </div>
    );
  }
}

export default Salida;
