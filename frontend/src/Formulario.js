/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import "./Formulario.css";

class Formulario extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cuenta1: null,
      cuenta2: null
    };
    this.cambio = this.cambio.bind(this);
    this.envioEnter = this.envioEnter.bind(this);
    this.envioClick = this.envioClick.bind(this);
    this.cambio2 = this.cambio2.bind(this);
  }

  envioEnter (e) {
    if (e.key === "Enter") {
      this.envioClick();
    }
  }

  cambio (e) {
    this.setState({ cuenta1: e.target.value });
  }

  cambio2 (e) {
    this.setState({ cuenta2: e.target.value });
  }

  envioClick () {
    if (this.state.cuenta1 !== "" &&
    this.state.cuenta1 !== null &&
    this.state.cuenta2 !== "" &&
    this.state.cuenta2 !== null) {
      this.props.entradaCuentas(this.state.cuenta1, this.state.cuenta2);
    }
  }

  render () {
    return (
      <div className="down left col-sm-8">
        <h2>Ingresa las dos cuentas:</h2>
        <br />
        <p>Primera Cuenta: <strong>@ </strong><input id="inputBox" type="text"
          placeholder="Ingrese la primera cuenta"
          onChange={this.cambio}
          onKeyUp ={this.envioEnter}/>
        </p>
        <p>Segunda Cuenta: <strong>@ </strong><input id="inputBox" type="text"
          placeholder="Ingrese la segunda cuenta"
          onChange={this.cambio2}
          onKeyUp ={this.envioEnter} />
        </p>
        <button className="btn btn-primary" id="boton" onClick={this.envioClick}>Enviar</button>
      </div>
    );
  }
}

export default Formulario;
