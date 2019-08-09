// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem({ commit }, id) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('item,timer1000');
                    }, 1000)
                }).then((data) => {
                    commit('setItem', { id, item: data })
                });
            }
        },
        mutations: {
            setItem(state, { id, item }) {
                Vue.set(state.items, id, item)
            }
        }
    })
}
