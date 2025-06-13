import React from "react";
import "./style.css";
import Navbar from "../NavBar/Navbar";

export const Registro = () => {
  return (
    <div>
        <Navbar/>
    <div className="container">
      <div className="form-container">
        <h2 className="title">Registro</h2>
        <form>
          <div className="input-group">
            <label>Nombre</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Apellido</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" />
          </div>
          <div className="input-group">
            <label>Teléfono</label>
            <input type="tel" />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" />
          </div>
          <div className="input-group">
            <label>Confirmar Contraseña</label>
            <input type="password" />
          </div>
          <button type="submit" className="submit-button">Registrarse</button>
        </form>
      </div>
    </div>
  </div>
  );
};
