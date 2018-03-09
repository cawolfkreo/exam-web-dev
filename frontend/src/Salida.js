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
            <strong>Pelea {i}:</strong>  {d.mensaje}
          </div>
        );
      });
    } else {
      lista = "Aun no llegan registros.";
    }
    if (this.props.cuentas[1] !== null && this.props.cuentas[0] !== null) {
      cuentas = "@" + this.props.cuentas[0] + " vs @" + this.props.cuentas[1];
    }

    if (this.state.ganador !== null) {
      const url = "https://www.instagram.com/" + this.state.ganador.cuenta;
      ganador = (
        <div>
          <h3>El ganador con {this.state.ganador.total} likes es:</h3>
          <h1>@{this.state.ganador.cuenta} <a href={url} target="_blank">
            <button className="btn btn-info">Ver perfil</button>
          </a>
          </h1>
          <br/>
          <h3>La imagen encontrada del ganador con más likes:</h3>
          <img src={this.state.ganador.mas} className="rounded" alt="the winner" />
        </div>
      );
    }
    return (
      <div className="down">
        <h1>Cuentas a pelear:</h1>
        <br />
        <div className="row">
          <div className="centro">
            <h4>{cuentas}</h4>
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
