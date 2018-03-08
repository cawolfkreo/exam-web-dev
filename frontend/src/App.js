import React, { Component } from "react";
import Formulario from "./Formulario.js";
import Salida from "./Salida.js";
import "./App.css";

class App extends Component {
  constructor () {
    super();
    this.state = {
      objeto: null
    };
    this.entradaFormulario = this.entradaFormulario.bind(this);
  }

  entradaFormulario (e) {
    this.setState({ objeto: e });
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome My Site</h1>
        </header>
        <div className="container">
          <Formulario input={this.entradaFormulario} />
          <div>
            <hr />
            <Salida obj={this.state.objeto} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
