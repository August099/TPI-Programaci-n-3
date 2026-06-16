export const registerUser = (name, email, password, repeatPassword, onSuccess, onError) => {
    fetch("http://localhost:3000/register", {
        headers: {
            "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, email, password, repeatPassword }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
            return res.json();
        })
        .then(onSuccess)
        .catch(onError);
}