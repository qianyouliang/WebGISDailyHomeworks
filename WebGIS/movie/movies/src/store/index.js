import { ref, onMounted} from 'vue'
import { defineStore } from 'pinia'
import { getMovieList } from '../api/index.js';
import { useRouter } from 'vue-router';
export const useMovieStore = defineStore('movie', () => {
    const movieList = ref([]);
    const movie = ref({});
    const router = useRouter();

    onMounted(async () => {
        const res = await getMovieList();
        const data = res.data.result;
        movieList.value = data.map(item => ({
            id: item.id,
            pic: item.pic,
            title: item.title,
            raiting: parseFloat(item.raiting) / 2.0,
            slogo: item.slogo,
            labels: item.labels
        }))
        
        if (Object.keys(movie.value).length === 0) {
            movie.value = JSON.parse(localStorage.getItem("movie"));
        }
        
    })

    const jumpToDetail = (item) => {
        movie.value = item;
        localStorage.setItem("movie", JSON.stringify(movie.value))
        router.push(`/detail/${item.id}`)
    }
    const backHome = () => {
        router.back();
    }
    const scrollTo = ()=>{
        window.scrollTo(0,360);
    }

    return { movieList, movie, jumpToDetail, backHome ,scrollTo}
})