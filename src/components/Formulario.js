import React from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";

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

const Formulario = () => {
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

  return (
    <form>
      <SelectMonedas />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
