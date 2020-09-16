const getLeaderboard = async (token) => {
  const query = {
    query:`
    query {
      getLeaderboard{
        name
        coins
      }
    }
  `
  }
  return fetch("http://localhost:8000/api", {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json"
    },
  }).then((res) => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Req failed");
    }
    return res.json();
  }).catch(e => {
    throw e;
  });
}

export default getLeaderboard;