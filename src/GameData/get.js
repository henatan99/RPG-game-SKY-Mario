async function getData(game) {
  let apiKey = 'Sjdkei2345sdhksa';
  const key = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores/`;
  const response = await fetch(key, { mode: 'cors' });

  if (response.status === 400 || response.status === 404) {
    throwError();
  } else {
    const data = await response.json();
    gameData.name = data.name;
    gameData.score = data.main.temp;
  }
}

const gameData = {
  name: '',
  score: 0
};