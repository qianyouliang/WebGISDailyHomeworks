import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BACK_URL = import.meta.env.VITE_BACK_URL;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const Http = (url) => {
    return axios({
        url: BASE_URL + url
    })
}

//获取轮播图
export const getBanner = () => {
    return Http('/banner')
}

//获取热映电影
export const getFilmInThreat = () => {
    return Http('/films/in_theaters')
}

//获取即将上映电影
export const getFilmComingSoon = () => {
    return Http('/films/coming_soon')
}

//获取电影详情
export const getFileDetail = (id) => {
    return Http(`/films/detail?id=${id}`)
}

//获取城市列表
export const getCity = () => {
    return Http('/city')
}

//获取城市定位
export const getCityLocation = () => {
    return Http('/city_location')
}

//登录后端api
export const loginAuth = async (params) => {
    return await axios({
        url: BACK_URL + '/login',
        method: 'POST',
        data: params
    })
}

//注册后端api
export const registerAuth = async (params) => {
    return await axios({
        url: BACK_URL + '/register',
        method: 'POST',
        data: params
    })
}

//验证Token
export const checkToken = async (token) => {
    return await axios.post(BACK_URL + "/auth", null, {
        headers: { Authorization: token },
    });
} 

//获得城市名
export const getCityByName = async (cityName) => {
    return await axios.get(`https://restapi.amap.com/v3/geocode/geo?address=${cityName}&key=${TOKEN_KEY}`);
}
