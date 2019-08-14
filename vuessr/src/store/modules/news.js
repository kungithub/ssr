import http from '$http';

export default {
    namespaced: true,
    state: {
        list: {},
        count: 0
    },
    actions: {
        fetchList({ commit }, { pageIndex, request }) {
            return http.post(`/api/news/list/${pageIndex}`, request).then((data) => {
                commit('setList', data.data);
            });
        }
    },
    mutations: {
        setList(state, { list, count }) {
            state.list = list;
            state.count = count;
        }
    }
}

