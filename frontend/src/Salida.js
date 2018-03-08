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
    let cuentas;
    let ganador;
    let i = -1;
    if (typeof this.props.lista !== "undefined" && this.props.lista !== null && this.props.lista.length !== 0) {
      lista = this.props.lista.map((d) => {
        i++;
        return (
          <div key={i} className="col-sm-4">
            {i}. {d.mensaje}
          </div>
        );
      });
    } else {
      lista = "nada";
    }
    if (this.props.cuentas[1] !== null && this.props.cuentas[0] !== null) {
      cuentas = "@" + this.props.cuentas[0] + " vs @" + this.props.cuentas[1];
    }

    if (this.props.ganador !== null) {
      ganador = "el ganador es: " + this.props.ganador;
    }
    return (
      <div className="down">
        <h1>Cuentas a pelear:</h1>
        <br />
        <div className="row">
          <div className="centro">
            <p>{cuentas}</p>
            <br/>
            <p>{ganador}</p>
          </div>
        </div>
        <hr />
        <br />
        <br />
        <h1>Cuentas que se han peleado antes:</h1>
        <div className="row">
          {lista}
        </div>
      </div>
    );
  }
}

export default Salida;
