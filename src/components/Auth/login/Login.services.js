export const loginUser = (email, password, onSuccess, onError) => {
  fetch("http://localhost:3000/login", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw data.errors;
      }
      return data;
    })
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};