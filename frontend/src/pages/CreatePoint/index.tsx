import React, {useEffect, useState} from "react";
import {} from 'react'
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";

import api from '../../services/api';

import logo from "../../assets/images/svg/logo.svg";

import * as S from "./styled";

const CreatePoint = () => {

  
  return (
    <S.CreatePointPage>
      <S.Container>
        <S.Header>
          <img src={logo} alt="Logo" />
          <S.ButtonBack to="/">
            <FiArrowLeft></FiArrowLeft>
            <strong>Voltar para home</strong>
          </S.ButtonBack>
        </S.Header>
        <S.Main>
          <S.CreatePoint>
            <h1>
              Cadastro do <br />
              ponto de coleta
            </h1>
            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>
              <S.InputBlock>
                <label htmlFor="name">Nome da entidade</label>
                <input type="text" name="name"></input>
              </S.InputBlock>

              <S.InputGroup>
                <S.InputBlock>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" />
                </S.InputBlock>
                <S.InputBlock>
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input type="text" name="whatsapp"></input>
                </S.InputBlock>
              </S.InputGroup>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Endereço</h2>
                <span>Selecione o endereço no mapa</span>
              </legend>

              <Map center={[-10.9423288, -37.0936859]} zoom={15}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-10.9423288, -37.0936859]} />
              </Map>

              <S.InputGroup>
                <S.InputBlock>
                  <label htmlFor="uf">UF</label>
                  <select name="uf">
                    <option value="0">Selecione uma UF</option>
                  </select>
                </S.InputBlock>
                <S.InputBlock>
                  <label htmlFor="cidade">Cidade</label>
                  <select name="cidade">
                    <option value="0">Selecione uma cidade</option>
                  </select>
                </S.InputBlock>
              </S.InputGroup>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Ítens de coleta</h2>
                <span>Selecione um ou mais ítens abaixo</span>
              </legend>
              <S.GridItens>
                <S.Item>
                  <img
                    src="http://localhost:3333/uploads/lampadas.svg"
                    alt="Óleo"
                  />
                  <span>Óleo de Cozinha</span>
                </S.Item>
                <S.Item>
                  <img
                    src="http://localhost:3333/uploads/baterias.svg"
                    alt="Óleo"
                  />
                  <span>Óleo de Cozinha</span>
                </S.Item>
                <S.Item>
                  <img
                    src="http://localhost:3333/uploads/oleo.svg"
                    alt="Óleo"
                  />
                  <span>Óleo de Cozinha</span>
                </S.Item>
                <S.Item>
                  <img
                    src="http://localhost:3333/uploads/oleo.svg"
                    alt="Óleo"
                  />
                  <span>Óleo de Cozinha</span>
                </S.Item>
                <S.Item>
                  <img
                    src="http://localhost:3333/uploads/oleo.svg"
                    alt="Óleo"
                  />
                  <span>Óleo de Cozinha</span>
                </S.Item>
                <S.Item>
                  <img
                    src="http://localhost:3333/uploads/oleo.svg"
                    alt="Óleo"
                  />
                  <span>Óleo de Cozinha</span>
                </S.Item>
              </S.GridItens>
            </fieldset>

            <S.ButtonSubmit>Cadastrar ponto de coleta</S.ButtonSubmit>
          </S.CreatePoint>
        </S.Main>
      </S.Container>
    </S.CreatePointPage>
  );
};

export default CreatePoint;
