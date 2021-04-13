import axios from 'axios';
import 'regenerator-runtime';

const setUserScore = async (userData) => {
  const apiKey = 'Gshfdski35839fhsflks';
  const data = await axios.post(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores/`, userData)
    .then((response) => response.data).catch((error) => error);
  return data.result;
};

const setData = async (playerName, playerScore) => {
  const userData = { user: { name: playerName }, score: playerScore };
  const message = await setUserScore(userData);
  return message;
};

export default setData;