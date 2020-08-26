import React, { useEffect, useState, ChangeEvent } from "react";
import { useHistory } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { useForm } from "react-hook-form";

import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import axios from "axios";
import api from "../../services/api";

import { toast, ToastContainer } from "react-toastify";

import logo from "../../assets/images/svg/logo.svg";

import Dropzone from "../../components/DropZone";

import * as S from "./styled";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface UF {
  sigla: string;
}

interface City {
  nome: string;
}

type Pointer = {
  name: string;
  email: string;
  whatsapp: string;
  uf: string;
  city: string;
};

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUFs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedUF, setSelectedUF] = useState<string>("0");
  const [selectedCity, setSelectedCity] = useState<string>("0");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const history = useHistory();

  const toastOptions = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    api.get("items").then((response) => setItems(response.data));
  }, []);

  useEffect(() => {
    axios
      .get<UF[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUFs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUF === "0") return;

    axios
      .get<City[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        setCities(cityNames);
      });
  }, [selectedUF]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUF(uf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleSelectedPosition(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleSelectedItem(id: number) {
    const alreadyItemSelected = selectedItems.findIndex((item) => item === id);

    if (alreadyItemSelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  const { register, handleSubmit, errors } = useForm<Pointer>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { name, email, whatsapp, uf, city } = data;
      const [latitude, longitude] = selectedPosition;
      const items = selectedItems;

      const pointer = {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        uf,
        city,
        items,
      };

      await api.post("/points", pointer);

      toast.success("Criado com sucesso!", toastOptions);

      setTimeout(() => {
        history.push("/");
      }, 5000);
    } catch {
      toast.error("Ocorreu um erro inesperado, tente novamente!", toastOptions);
    }
  });

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
          <S.CreatePoint onSubmit={onSubmit}>
            <h1>
              Cadastro do <br />
              ponto de coleta
            </h1>

            <Dropzone onFileUploaded={setSelectedFile} />

            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>
              <S.InputBlock>
                <label htmlFor="name">Nome da entidade</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={register({
                    required: "Nome precisa ser informado",
                  })}
                ></input>
                {errors.name && (
                  <div className="error">{errors.name.message}</div>
                )}
              </S.InputBlock>

              <S.InputGroup>
                <S.InputBlock>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ref={register({
                      required: "Email precisa ser informado",
                    })}
                  />
                  {errors.email && (
                    <div className="error">{errors.email.message}</div>
                  )}
                </S.InputBlock>
                <S.InputBlock>
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input
                    type="text"
                    id="whatsapp"
                    name="whatsapp"
                    ref={register({
                      required: "Whatsapp precisa ser informado",
                    })}
                  ></input>
                  {errors.whatsapp && (
                    <div className="error">{errors.whatsapp.message}</div>
                  )}
                </S.InputBlock>
              </S.InputGroup>
            </fieldset>
            <fieldset>
              <legend>
                <h2>Endereço</h2>
                <span>Selecione o endereço no mapa</span>
              </legend>

              <Map
                center={initialPosition}
                zoom={15}
                onClick={handleSelectedPosition}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedPosition} />
              </Map>

              <S.InputGroup>
                <S.InputBlock>
                  <label htmlFor="uf">Estado (UF)</label>
                  <select
                    name="uf"
                    id="uf"
                    value={selectedUF}
                    onChange={handleSelectedUF}
                    ref={register({
                      required: "",
                    })}
                  >
                    <option value="0">Selecione uma UF</option>
                    {ufs.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                  {errors.uf && (
                    <div className="error">{errors.uf.message}</div>
                  )}
                </S.InputBlock>
                <S.InputBlock>
                  <label htmlFor="city">Cidade</label>
                  <select
                    name="city"
                    id="city"
                    value={selectedCity}
                    onChange={handleSelectedCity}
                    ref={register({
                      required: "",
                    })}
                  >
                    <option value="0">Selecione uma cidade</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <div className="error">{errors.city.message}</div>
                  )}
                </S.InputBlock>
              </S.InputGroup>
            </fieldset>
            <fieldset>
              <legend>
                <h2>Ítens de coleta</h2>
                <span>Selecione um ou mais ítens abaixo</span>
              </legend>
              <S.GridItens>
                {items.map((item) => (
                  <S.Item
                    key={item.id}
                    className={
                      selectedItems.includes(item.id) ? "selected" : ""
                    }
                    onClick={() => handleSelectedItem(item.id)}
                  >
                    <img src={item.image_url} alt={item.title} />
                    <span>{item.title}</span>
                  </S.Item>
                ))}
              </S.GridItens>
            </fieldset>

            <S.ButtonSubmit type="submit">
              Cadastrar ponto de coleta
            </S.ButtonSubmit>
            <ToastContainer />
          </S.CreatePoint>
        </S.Main>
      </S.Container>
    </S.CreatePointPage>
  );
};

export default CreatePoint;
