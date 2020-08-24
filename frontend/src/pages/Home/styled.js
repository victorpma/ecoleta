import styled from "styled-components";
import logo from "../../assets/images/svg/home-background.svg";
import { Link } from "react-router-dom";

export const HomePage = styled.div`
  height: 100vh;
  background: url(${logo}) no-repeat 800px bottom;
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  aligm-items: flex-start;

  @media (max-width: 900px) {
    aligm-items: center;
    text-align: center;
  }
`;

export const Header = styled.header`
  margin: 50px 0 0;
`;

export const Main = styled.main`
  flex: 1;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 5.4rem;
    line-height: 6.4rem;
    font-weight: 700;
    color: var(--title-color);
  }

  p {
    font-size: 2.4rem;
    line-height: 3.4rem;
    margin: 15px 0;
  }

  @media (max-width: 900px) {
    max-width: 100%;
    text-align: center;
    align-items: center;

    h1 {
      font-size: 4rem;
      line-height: 5rem;
    }

    p {
      font-size: 1.6rem;
      line-height: 2.6rem;
    }
  }

  @media (max-width: 300px) {
    h1 {
      font-size: 3rem;
      line-height: 4rem;
    }

    p {
      font-size: 1.2rem;
      line-height: 2.2rem;
    }
  }
`;

export const ButtonLogon = styled(Link)`
  display: block;
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
  height: 50px;
  width: 100%;
  max-width: 360px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  overflow: hidden;

  transition: background-color 0.2s;

  span {
    background-color: rgba(0, 0, 0, 0.08);
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  strong {
    flex: 1;
    text-align: center;
    font-size: 1.4rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  :hover {
    background-color: #2fb86e;
  }

  @media (max-width: 900px) {
    text-align: center;
  }
`;
