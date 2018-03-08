/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import "./Formulario.css";

class Formulario extends Component {
  constructor (props) {
    super(props);
    this.state = {
      algo: null
    };
    this.cambio = this.cambio.bind(this);
    this.envioEnter = this.envioEnter.bind(this);
    this.envioClick = this.envioClick.bind(this);
  }
  envioEnter (e) {
    if (e.key === "Enter") {
      this.props.input(this.state.algo);
    }
  }
  cambio (e) {
    this.setState({ algo: e.target.value });
  }

  envioClick () {
    this.props.input(this.state.algo);
  }

  render () {
    return (
      <div className="down left">
        <h2>Buscar ...</h2>
        <br />
        <input id="inputBox" type="text"
          placeholder="Ingrese..."
          onChange={this.cambio}
          onKeyUp ={this.envioEnter} />
        <button id="boton" onClick={this.envioClick}>Send</button>
        <div>{this.state.algo}</div>
      </div>
    );
  }
}

export default Formulario;
