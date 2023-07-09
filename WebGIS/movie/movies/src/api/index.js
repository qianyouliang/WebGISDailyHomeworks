import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const Http = (url) => {
    return axios({
        url: BASE_URL + url
        
    })
}

export const getMovieList = async () => {
    return Http("/films/top250")
}

export const getMovieDetail = async (id) => {
    return Http(`/films/detail?id=${id}`)
}