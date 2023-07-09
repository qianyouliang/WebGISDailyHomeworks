import { defineStore } from "pinia";
import { queryMusicList, queryMusic } from "../api/index.js";

const useStore = defineStore("main", {
    state: () => {
        return {
            musicList: [],
            searchMusicList: [],
            keyword: "",
            
        }
    },
    getters: {},
    actions: {
        async getMusicList() {
            const res = await queryMusicList();
            this.musicList = res.playlists;

        },
        async getSearchMusicList() {

            if (this.keyword) {
                const res = await queryMusic(this.keyword)
                this.searchMusicList = res.result.songs;
            }



        },
        deleteMusic(id) {
            this.musicList = this.musicList.filter(item => {
                return item.id !== id
            })
        },
        deleteSearchMusic(id) {
            this.searchMusicList = this.searchMusicList.filter(item => {
                return item.id !== id
            })
        }
    },

})

export { useStore }