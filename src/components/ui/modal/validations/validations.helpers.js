const validateString = (text, min, max) => {
    console.log(text)
    if (text === null) return false
    if (min === null || text.length < min) return false
    if (max === null || text.length > max) return false
    return true
}

const validateUrl = (url) => {
    try {
        new URL(url)
        return true
    } catch (e) {
        return false
    }
}

const validateCategories = () => {

}

export const validateItem = (item, categories) => {
    const errors = {}
    
    if (!validateString(item.name, 1, 30)) errors.name = "El campo no puede estar vacio y el nombre no puede superar los 30 caracteres."
    if (!validateString(item.description, 0, 250)) errors.description = "No puede superar los 250 caracteres."
    if (!validateUrl(item.image)) errors.image = "URL de imagen invalida."
    if (item.price <= 0) errors.price = "El precio debe ser positivo mayor que 0."
    if (item.discount < 0 || item.discount > 1) errors.discount = "El descuento debe estar entre 0% y 100%."
    if (item.stock < 0) errors.stock = "El stock debe ser mayor o igual a 0."

    return errors
}