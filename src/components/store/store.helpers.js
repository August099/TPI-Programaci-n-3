export const apllyDiscount = (item) => {
    return item.price * (1 - item.discount)
}

export const isAdmin = (role) => {
    if (role === "Admin" || role === "Super") {
        return true
    }
    return false
}