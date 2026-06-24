const baseUrl = import.meta.env.VITE_BASE_URL_SERVER_URL;

export const getRole = (onSuccess, onError) => {
    fetch(`${baseUrl}/user/role`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al obtener el rol");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
}

export const getItems = (onSuccess, onError) => {
    fetch(`${baseUrl}/items`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al obtener los productos");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const getItem = (id, onSuccess, onError) => {
    fetch(`${baseUrl}/items/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al obtener el producto");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const addItem = (newItem, onSuccess, onError) => {
    fetch(`${baseUrl}/items`, {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
        method: "POST",
        body: JSON.stringify(newItem),
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al crear el producto");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const updateItem = (item, onSuccess, onError) => {
    fetch(`${baseUrl}/items/${item.id}`, {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
        method: "PUT",
        body: JSON.stringify(item)
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al actualizar el producto");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const deleteItem = (itemId, onSuccess, onError) => {
    fetch(`${baseUrl}/items/${itemId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al eliminar el producto");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const getCategories = (onSuccess, onError) => {
    fetch(`${baseUrl}/categories`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al obtener las categorias");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
}

export const getItemsByCategories = (categoriesIds, onSuccess, onError) => {
    fetch(`${baseUrl}/items/by-categories?categoryIds=${categoriesIds.join()}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al obtener los items");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
}

export const getQuestions = (itemId, onSuccess, onError) => {
    fetch(`${baseUrl}/items/${itemId}/questions`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al obtener las preguntas");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const addQuestion = (newQuestion, onSuccess, onError) => {
    fetch(`${baseUrl}/questions`, {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
        method: "POST",
        body: JSON.stringify(newQuestion),
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al crear la pregunta");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const addAnswer = (id, answer, onSuccess, onError) => {
    fetch(`${baseUrl}/questions/${id}/answer`, {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
        method: "PUT",
        body: JSON.stringify(answer),
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al crear la respuesta");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const deleteQuestion = (itemId, onSuccess, onError) => {
    fetch(`${baseUrl}/questions/${itemId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ferreteria-token")}`,
        },
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.message || "Error al eliminar la pregunta");
            });
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

