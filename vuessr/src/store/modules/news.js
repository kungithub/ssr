import http from '$http';

export default {
    namespaced: true,
    state: {
        list: {}
    },
    actions: {
        fetchList({ commit }, pageIndex) {
            return http.post(`/api/news/list/${pageIndex}`).then((data) => {
                commit('setList', data.data)
            });
        }
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        }
    }
}

