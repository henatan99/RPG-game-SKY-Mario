import axios from 'axios';
import 'regenerator-runtime';

const getGameResult = async () => {
  const apiKey = 'Gshfdski35839fhsflks';
  const data = await axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores/`)
    .then((response) => response.data.result).catch((error) => error);
  return data;
};

const getData = async () => {
  const data = await getGameResult();
  return data
    .sort((a, b) => (a.score > b.score ? -1 : 1))
    .filter((item) => typeof item.user.name === 'string' && item.score % 10 === 0)
    .slice(0, 3);
};

export default getData;