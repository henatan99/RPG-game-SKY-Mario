import 'regenerator-runtime';

let apiKey = 'Sjdkei2345sdhksa';
async function send(name, score) {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        score: score,
      }),
    });
    const data = await response.json();
    return data;
}

export default send



