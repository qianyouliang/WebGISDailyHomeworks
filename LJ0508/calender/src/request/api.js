
import request from '../request/request.js'
import {JUHE_KEY} from '../config/index.js'

/* 封装接口请求 */
export function queryDay(date){
     return request.get(`/day?date=${date}&key=${JUHE_KEY}`)
}
/* 斜杠用于承接baseURL */