import { AutheticationContext } from "../services/auth/auth.context"
import { useContext } from "react"

export const apllyDiscount = (item) => {
    return item.price * (1 - item.discount)
}

export const isAdmin = () => {
    const {user} = useContext(AutheticationContext)

    return user.role === "Admin" || user.role === "Super" ? true : false
}