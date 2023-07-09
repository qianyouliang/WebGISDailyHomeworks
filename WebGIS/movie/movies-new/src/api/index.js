import axios from 'axios'

//获取环境变量VITE_BASE_URL值
const BASE_URL = import.meta.env.VITE_BASE_URL
const Http = (url) => {
    return axios({
        url: BASE_URL + url
    })
}

export const getMovieList =  () => {
    return Http("/films/top250")
}

export const getMovieDetail = (id) => {
    return Http(`/films/detail?id=${id}`)
}