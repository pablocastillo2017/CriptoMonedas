import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  // state del listado de criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    {
      codigo: "USD",
      nombre: "Dolar de EEUU",
    },
    {
      codigo: "MXM",
      nombre: "Peso Mexicano",
    },
    {
      codigo: "EUR",
      nombre: "Euro",
    },
    {
      codigo: "GBP",
      nombre: "Libra Exterlina",
    },
    {
      codigo: "CLP",
      nombre: "Peso Chileno",
    },
  ];

  //CUSTOM HOOK UTILIZAR useMoneda
  // estos 3 valores retornan A useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige Tu Moneda", "", MONEDAS);

  // utilizar useCriptomoneda
  // estos 3 valores retornan A useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  // Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);

      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  // cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    // Validar que Ambos Campos esten llenos 'moneda' y 'criptomoneda'
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }

    // De lo contrario si los campos vienen llenos
    // pasar los datos al componente principal
    guardarError(false);
    guardarCriptomoneda(moneda);
    guardarMoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
