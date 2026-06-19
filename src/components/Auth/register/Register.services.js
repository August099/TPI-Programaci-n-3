export const registerUser = (name, email, password, repeatPassword, onSuccess, onError) => {
    fetch("http://localhost:3000/register", {
        headers: {
            "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, email, password, repeatPassword }),
    })
    .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
            throw data.errors;
        }
        return data;
    })
    .then(onSuccess)
    .catch(onError);
}