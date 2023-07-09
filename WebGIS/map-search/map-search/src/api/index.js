import axios from "axios";
export const getCurrentCity = async ()=>{
    return axios.get("https://restapi.amap.com/v3/ip?key=f84a737ff36c1dfc31d601765df5cced")
}
