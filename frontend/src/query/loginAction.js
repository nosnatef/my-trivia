import UserContext from "../utils/UserContext";

const LoginAction = async (email, password) => {

  const loginQuery = {
    query: `
    query {
      login(email:"${email}", password:"${password}") {
        userId,
        token,
        tokenExpiration,
        name,
        user {
          name
          coins
          profilePic
        }
      }
    }
  `,
  };

  return fetch("http://localhost:8000/api", {
    method: "POST",
    body: JSON.stringify(loginQuery),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Login failed");
      }
      return res.json();
    })
    .then((data) => {
      return data
      
    })
    .catch((err) => {
      console.log(err);
    });
};

export default LoginAction;