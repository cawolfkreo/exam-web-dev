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
    this.props.entradaCuentas(this.state.cuenta1, this.state.cuenta2);
    const m = "@" + this.state.cuenta1 + " vs " + "@" + this.state.cuenta2;
    console.log("se envia: " + m);
    this.props.input({ mensaje: m });
  }

  render () {
    return (
      <div className="down left">
        <h2>Buscar ...</h2>
        <br />
        <p>Primera Cuenta: <strong>@</strong></p><input id="inputBox" type="text"
          placeholder="Ingrese la primera cuenta"
          onChange={this.cambio}/>
        <p>Segunda Cuenta: <strong>@</strong></p><input id="inputBox" type="text"
          placeholder="Ingrese la segunda cuenta"
          onChange={this.cambio2}
          onKeyUp ={this.envioEnter} />
        <button id="boton" onClick={this.envioClick}>Send</button>
      </div>
    );
  }
}

export default Formulario;
