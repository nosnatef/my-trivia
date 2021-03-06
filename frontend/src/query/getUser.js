const getUser = async (token) => {
  const query = {
    query:`
    query {
      getUser{
        name
        coins
        email
        unlockedAchievements{
          name
        }
      }
    }
  `
  }
  return fetch("http://localhost:8000/api", {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
  }).then((res) => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Login failed");
    }
    return res.json();
  }).catch(e => {
    throw e;
  });
}

export default getUser;