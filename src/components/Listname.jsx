import React, { useState } from "react";
import uniqid from "uniqid";
import fondo from "../img/bkg.jpg";

export default function Listname() {
  const [nombre, setNombre] = useState("");
  const [listanombres, setListanombres] = useState([]);
  const [edicion, setEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const addNombre = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El campo esta vacio!");
      return;
    }
    const newName = {
      id: uniqid(),
      nombre,
    };
    setListanombres([...listanombres, newName]);
    setNombre("");
    setError(null);
  };

  const deleteNombre = (id) => {
    const filter = listanombres.filter((n) => n.id !== id);
    setListanombres(filter);
  };

  const editar = (n) => {
    setEdicion(true);
    setNombre(n.nombre);
    setId(n.id);
  };
  const editarNombre = (e) => {
    e.preventDefault();
    const nArray = listanombres.map((n) => (n.id === id ? { id, nombre } : n));
    setListanombres(nArray);
    setEdicion(false);
    setNombre("");
  };

  return (
    <div>
      <h2 className="row justify-content-center">App Crud React</h2>
      <div className="row">
        <div className="col">
          <h2 className="row justify-content-center"> Listado de nombres</h2>
          <ul className="list-group">
            {listanombres.map((n) => (
              <li key={n.id} className="list-group-item">
                {n.nombre}
                <button
                  onClick={() => deleteNombre(n.id)}
                  className="btn btn-danger float-end"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => editar(n)}
                  className="btn btn-info float-end"
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2 className="row justify-content-center">Añadir un nombre</h2>
          <form
            onSubmit={edicion ? editarNombre : addNombre}
            className="form-group"
          >
            <input
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              className="form-control  mb-3"
              type="text"
              placeholder="Introduce un nombre"
              value={nombre}
            />
            <input
              className="btn btn-primary btn-lg float-end"
              type="submit"
              value={edicion ? "Editar nombre" : "Registrar Nombre"}
            />
          </form>
          {error != null ? (
            <div className="alert-danger">{error}</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
