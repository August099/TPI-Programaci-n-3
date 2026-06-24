export const apllyDiscount = (item) => {
    return item.price * (1 - item.discount)
}