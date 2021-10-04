import { BASE_URL } from "../constant";

const createInit = (body) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    mode: "cors",
    cache: "default",
  };
};
const fetchInit = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  };
};

const updateInit = (body) => {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    mode: "cors",
    cache: "default",
  };
};

export const createApi = async (body, endpoint) => {
  const url = BASE_URL + endpoint;
  const init = createInit(body);
  const response = await fetch(url, init);
  const json = await response.json();
  return json;
};

export const fetchApi = async (id, endpoint) => {
  const url = BASE_URL + endpoint + '/' + id;
  const init = fetchInit();
  const response = await fetch(url, init);
  const json = await response.json();
  return json;
};

export const updateApi = async (body, endpoint) => {
  const url = BASE_URL + endpoint;
  const init = updateInit(body);
  const response = await fetch(url, init);
  const json = await response.json();
  return json;
};
