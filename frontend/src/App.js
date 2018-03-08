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
      lista: [],
      error: false,
      cambio: false
    };
    this.entradaFormulario = this.entradaFormulario.bind(this);
    this.obtenerRecursos = this.obtenerRecursos.bind(this);
    this.insertarRecurso = this.insertarRecurso.bind(this);
    this.darFotosUsuario = this.darFotosUsuario.bind(this);
    this.encontrarGanador = this.encontrarGanador.bind(this);
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
        this.setState({ lista: recursos });
      })
      .catch((err) => console.log(err));
  }

  entradaFormulario (c1, c2) {
    if (!(c1.includes("@") || c2.includes("@"))) {
      this.setState({ cuenta1: c1, cuenta2: c2, error: false, cambio: true });
    } else {
      this.setState({ error: true, cuenta1: null, cuenta2: null });
    }
  }

  insertarRecurso (recurso, callback) {
    fetch("api/recurso",
      { method: "POST", body: JSON.stringify(recurso),
        headers: { "Content-Type": "application/json" } })
      .then((res) => {
        return res.json();
      })
      .then((recurso) => {
        this.obtenerRecursos(recurso, callback);
      })
      .catch((err) => console.log(err));
  }

  instaInfoUsuario (usuario, callback) {
    fetch("https://www.instagram.com/" + usuario + "/?__a=1")
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        this.darFotosUsuario(usuario, info, callback);
      })
      .catch((e) => {
        this.setState({ error: true, cuenta1: null, cuenta2: null, cambio: false });
        console.log("se encontro el error:\n" + e.message);
      });
  }

  darFotosUsuario (usuario, info, callback) {
    if (info.user.is_private) {
      this.setState({ error: true, cuenta1: null, cuenta2: null });
    } else {
      const calculo = { cuenta: usuario, mas: null, total: 0 };
      let conteo = 0;
      info.user.media.nodes.forEach((d) => {
        let cuenta = d.likes.count;
        calculo.total += cuenta;
        if (cuenta > conteo) {
          calculo.mas = d.thumbnail_resources[1].src;
        }
      });
      callback(calculo);
    }
  }

  encontrarGanador (callback) {
    if (this.state.cuenta1 !== null && this.state.cuenta2 !== null &&
      this.state.cambio) {
      this.instaInfoUsuario(this.state.cuenta1, (res1) => {
        this.instaInfoUsuario(this.state.cuenta2, (res2) => {
          const recurso = "@" + this.state.cuenta1 + " vs @" + this.state.cuenta2;
          if (res1.total >= res2.total) {
            callback(res1);
          } else {
            callback(res2);
          }
          this.insertarRecurso({ mensaje: recurso });
          this.setState({ cambio: false });
        });
      });
    }
  }

  render () {
    let error = null;

    if (this.state.error) {
      error = (
        <div className="col-sm-12">
          <p className="rojo"><em>Por favor, recuerda no ingresar usuarios de cuentas privadas, el carácter "@"
             y asegurate de que la cuenta que agregaste es la correcta y que existe</em></p>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">¡¡Insta Fight!!</h1>
        </header>
        <div className="container">
          <div className="row">
            <Formulario className="col-sm-3"
              entradaCuentas={this.entradaFormulario}/>
            {error}
          </div>
          <div>
            <hr />
            <Salida
              cuentas={[this.state.cuenta1, this.state.cuenta2]}
              lista={this.state.lista}
              buscaGanador={this.encontrarGanador} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
