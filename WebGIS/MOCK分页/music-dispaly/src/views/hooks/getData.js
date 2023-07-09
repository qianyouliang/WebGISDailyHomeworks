import axios from "axios";
import { ref, onMounted } from "vue";

const getData = () => {

    const pageSize = ref(35);
    const musicList = ref();
    const currentPage = ref(1);
    const totalNum = ref();
    const slicedMusicList = ref();
    onMounted(async () => {
        const res = await axios.get("http://localhost:8000/music");
        musicList.value = res.data;
        totalNum.value = res.data.length;
        slicedMusicList.value = musicList.value.slice(0, pageSize.value);
    });
    const handleCurrentChange = (val) => {
        currentPage.value = val;
        slicedMusicList.value = musicList.value.slice(
            (currentPage.value - 1) * pageSize.value,
            currentPage.value * pageSize.value
        );
    };
    return {
        pageSize,
        musicList,
        currentPage,
        totalNum,
        slicedMusicList,
        handleCurrentChange,
    }
};
export default getData;