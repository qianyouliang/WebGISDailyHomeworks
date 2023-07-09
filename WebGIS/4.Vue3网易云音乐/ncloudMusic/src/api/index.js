import axios from "axios"

export const queryMusicList = async function () {
    const res = await axios.get("http://39.103.151.139:8000/music/playlist")
    return res.data
}

export const queryMusic = async function (keyword) {
    const res = await axios.get(`http://39.103.151.139:3000/search?keywords=${keyword}`)
    return res.data
}