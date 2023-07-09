import { getMovieList } from "../../api/index.js"
import { onMounted, ref } from 'vue'

/* 导出电影列表获取方法 */
export const useMovieHttp = () => {
    const movieList = ref([]);
    onMounted(async () => {
        const res = await getMovieList();
        const data = res.data.result;
        movieList.value = data.map(item => ({
            id: item.id,
            pic: item.pic,
            title: item.title,
            raiting: item.raiting,
            score: parseFloat(item.raiting) / 2.0,//增加一个打分机制(0-5)
            slogo: item.slogo,
            labels: item.labels
        }))
    })
    return { movieList }
}