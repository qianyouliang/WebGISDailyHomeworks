import axios from "axios"

export const getProducts = async function () {
    const res = await axios.get("http://39.103.151.139:8000/cart")
    return res.data
}