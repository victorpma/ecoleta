import React from "react";
import { FiLogIn } from "react-icons/fi";

import logo from "../../assets/images/svg/logo.svg";

import * as S from "./styled";

const Home = () => {
  return (
    <S.HomePage>
      <S.Container>
        <S.Header>
          <img src={logo} alt="Logo Ecoleta" />
        </S.Header>
        <S.Main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>
          <S.ButtonLogon href="/Cadastro">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </S.ButtonLogon>
        </S.Main>
      </S.Container>
    </S.HomePage>
  );
};

export default Home;
