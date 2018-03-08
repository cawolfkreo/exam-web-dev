import React, { Component } from "react";
import Formulario from "./Formulario.js";
import Salida from "./Salida.js";
import "./App.css";

class App extends Component {
  constructor () {
    super();
    this.state = {
      cuenta1: null,
      cuenta2: null,
      ganador: null,
      lista: []
    };
    this.entradaFormulario = this.entradaFormulario.bind(this);
    this.obtenerRecursos = this.obtenerRecursos.bind(this);
    this.insertarRecurso = this.insertarRecurso.bind(this);
    this.darFotosUsuario = this.darFotosUsuario.bind(this);
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

  entradaFormulario (c1, c2) {
    this.setState({ cuenta1: c1, cuenta2: c2 });
  }

  insertarRecurso (recurso) {
    fetch("api/recurso",
      { method: "POST", body: JSON.stringify(recurso),
        headers: { "Content-Type": "application/json" } })
      .then((res) => {
        return res.json();
      })
      .then((recurso) => {
        this.obtenerRecursos();
      })
      .catch((err) => console.log(err));
  }

  obtenerFotosInsta () {
    this.instaInfoUsuario(this.state.cuenta1);
    this.instaInfoUsuario(this.state.cuenta2);
  }

  instaInfoUsuario (usuario) {
    fetch("https://www.instagram.com/" + usuario + "/?__a=1")
      .then((res) => {
        return res.json;
      })
      .then((info) => {
        this.darFotosUsuario(usuario, info);
      })
      .catch((e) => console.log("se encontro el error:\n" + e.message));
  }

  darFotosUsuario (usuario, info) {
    const calculo = { cuenta: usuario, mas: null, total: 0 };
    let conteo = 0;
    info.media.nodes.map((d) => {
      let cuenta = d.likes.count;
      calculo.total += cuenta;
      if (cuenta > conteo) {
        calculo.mas = d.thumbnail_resources[1].src;
      }
    });
    if (this.state.ganador === null) {
      this.setState({ ganador: calculo });
    } else if (this.state.ganador.mas < calculo.mas) {
      this.setState({ ganador: calculo });
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome My Site</h1>
        </header>
        <div className="container">
          <Formulario input={this.insertarRecurso}
            entradaCuentas={this.entradaFormulario}/>
          <div>
            <hr />
            <Salida cuentas={[this.state.cuenta1, this.state.cuenta2]} lista={this.state.lista}
              ganador={this.state.ganador} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
