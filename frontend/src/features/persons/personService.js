import axios from "axios";

const API_URL = "/api/persons/";
const API_URL_COMMAND = "/api/commands/"
const API_URL_IMPORTS = "/api/imports/"

const getProfile = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?q=${query}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


const createPerson = async (personData) => {

  try {
    const response = await axios.post(API_URL, personData);
    return response.data;

  } catch (error) {
    console.error(error);
  }

};

const deletePerson = async (id) => {

  const response = await axios.delete(API_URL + id)
  return response.data

}

const updatePerson = async (personData) => {

  try {
    const response = await axios.patch(API_URL, personData)
    console.log(response)
  } catch (error) {
    console.error(error);
  }
}

const reset = async (id) => {
  const response = await axios.patch(API_URL + id)
  return response.data
}


const stats = async () => {
  const response = await axios.get(API_URL + 'student-stats')
  return response.data;
}

const train = async () => {

  const response = await axios.get(API_URL_COMMAND + 'execute-train')
  return response

}

const runFace = async () => {

  const response = await axios.get(API_URL_COMMAND + 'execute-facerec')
  return response

}

const importFile = async (data) => {

  const response = await axios.post(API_URL_IMPORTS + 'files', data)
  return response

}


const personService = {
  createPerson,
  getProfile,
  deletePerson,
  updatePerson,
  reset,
  stats,
  train,
  runFace,
  importFile
};

export default personService;
