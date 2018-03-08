import React, { Component } from "react";
import Formulario from "./Formulario.js";
import Salida from "./Salida.js";
import "./App.css";

class App extends Component {
  constructor () {
    super();
    this.state = {
      objeto: null,
      lista: []
    };
    this.entradaFormulario = this.entradaFormulario.bind(this);
    this.obtenerRecursos = this.obtenerRecursos.bind(this);
    this.insertarRecurso = this.insertarRecurso.bind(this);
  }

  componentWillMount () {
    this.obtenerRecursos();
  }

  obtenerRecursos () {
    fetch("api/recursos", { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((recursos) => {
        console.log("recursos:" + JSON.stringify(recursos));
        this.setState({ lista: recursos });
      })
      .catch((err) => console.log(err));
  }

  entradaFormulario (e) {
    this.setState({ objeto: e.mensaje });
  }

  insertarRecurso (recurso) {
    fetch("api/recurso",
      { method: "POST", body: JSON.stringify(recurso),
        headers: { "Content-Type": "application/json" } })
      .then((res) => {
        return res.json();
      })
      .then((recurso) => {
        this.entradaFormulario(recurso);
        this.obtenerRecursos();
      })
      .catch((err) => console.log(err));
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome My Site</h1>
        </header>
        <div className="container">
          <Formulario input={this.insertarRecurso} />
          <div>
            <hr />
            <Salida obj={this.state.objeto} lista={this.state.lista}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
