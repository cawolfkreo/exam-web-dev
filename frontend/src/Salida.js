/* eslint react/prop-types: 0 */
import React, { Component } from "react";

class Salida extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cambio: null,
      ganador: null
    };
  }

  componentWillReceiveProps () {
    this.props.buscaGanador((d) => (this.setState({ ganador: d })));
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
            Pelea {i}: {d.mensaje}
          </div>
        );
      });
    } else {
      lista = "nada";
    }
    if (this.props.cuentas[1] !== null && this.props.cuentas[0] !== null) {
      cuentas = "@" + this.props.cuentas[0] + " vs @" + this.props.cuentas[1];
    }

    if (this.state.ganador !== null) {
      ganador = (
        <div>
          <h3>El ganador es:</h3>
          <h1>{this.state.ganador.cuenta}</h1>
        </div>
      );
    }
    return (
      <div className="down">
        <h1>Cuentas a pelear:</h1>
        <br />
        <div className="row">
          <div className="centro">
            <p>{cuentas}</p>
            <br/>
            <div>{ganador}</div>
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
