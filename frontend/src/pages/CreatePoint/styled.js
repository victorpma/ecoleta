import styled from "styled-components";
import { Link } from "react-router-dom";

export const CreatePointPage = styled.div`
  height: 100vh;
`;

export const Container = styled.div`
  padding: 0 100px;
`;

export const Header = styled.header`
  width: 100%;
  margin: 50px 0 30px 0;
  padding: 0 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonBack = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  svg {
    height: 15px;
    width: 15px;
    margin-right: 5px;
    color: var(--color-primary);
  }

  strong {
    font-size: 1.4rem;
    line-height: 2.4rem;
  }

  :hover {
    text-decoration: underline;
  }
`;

export const Main = styled.main`
  height: 100%;
  width: 100%;
  max-width: 900px;
  padding: 40px;
  margin: 0 auto;
`;

export const CreatePoint = styled.form`
  background-color: white;
  border-radius: 10px;
  padding: 40px;

  h1 {
    font-size: 3.6rem;
    line-height: 4rem;
    font-weight: 700;
    color: var(--title-color);
  }

  fieldset {
    border: none;
    min-inline-size: auto;
    margin-top: 64px;

    legend {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      h2 {
        font-size: 2.4rem;
        line-height: 3.4rem;
        font-weight: 700;
        color: var(--title-color);
      }

      span {
        font-size: 1.4rem;
        line-height: 2.4rem;
        font-weight: normal;
      }
    }
  }

  .leaflet-container {
    width: 100%;
    height: 360px;
    border-radius: 8px;
    margin: 20px 0 24px 0;
  }
`;

export const InputBlock = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;

  label {
    font-size: 1.4rem;
    line-height: 2.4rem;
    margin-bottom: 8px;
  }

  input,
  select {
    flex: 1;
    border: none;
    border-radius: 8px;
    background-color: #f0f0f5;
    padding: 16px 24px;
    font-size: 1.6rem;
    color: #6c6c80;

    &::placeholder {
      color: #a0a0b2;
    }

    &:active {
      transform: traslateY(-1px);
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  div:not(:last-child) {
    margin-right: 10px;
  }
`;

export const GridItens = styled.ul`
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

export const Item = styled.li`
  background-color: var(--color-gray-light);
  padding: 20px;
  border-radius: 5px;
  border: 2px solid transparent;

  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-top: 20px;
    text-align: center;
  }

  :hover {
    background-color: #e1faec;
    border: 2px solid #34cb79;
  }

  &.selected {
    background-color: #e1faec;
    border: 2px solid #34cb79;
  }
`;

export const ButtonSubmit = styled.button`
  height: 56px;
  width: 260px;
  border: 0;
  border-radius: 8px;
  padding: 15px 30px;
  margin-top: 40px;

  background-color: var(--color-primary);
  color: #fff;
  text-decoration: none;
  align-self: flex-end;

  font-size: 1.6rem;
  font-weight: bold;

  cursor: pointer;
  transition: background-color 0.2s;

  :hover {
    background-color: #2fb86e;
  }
`;
