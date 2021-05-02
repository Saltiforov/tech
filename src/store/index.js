import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        properties: [{
            name: "affiliate",
            title: "Affiliate",
            orderTypeDefault: "ASC",
            priority: 0
        }, {
            name: "balance",
            title: "Balance",
            orderTypeDefault: "DESC",
            priority: 0
        }, {
            name: "bonus_balance",
            title: "Bonus balance",
            orderTypeDefault: "DESC",
            priority: 0
        }, {
            name: "campaign",
            title: "Campaign",
            orderTypeDefault: "ASC",
            priority: 0
        }, {
            name: "cash_balance",
            title: "Cash balance",
            orderTypeDefault: "DESC",
            priority: 0
        }, {
            name: "country",
            title: "Country",
            orderTypeDefault: "ASC",
            priority: 0
        }, {
            name: "trader_points",
            title: "Trader points",
            orderTypeDefault: "DESC",
            priority: 0
        }],
        optionList: [],
        optionListComp: []

    },
    getters: {
        allProperty: (state) => {
            return state.properties
        },
        optionList: (state) => {
            return state.optionList
        }
    },
    mutations: {
        addProperties(state, payload) {
            state.optionList.push(payload)
        },
        updateOptionList(state,payload){
                state.optionList[payload.index].name = payload.name;
                state.optionList[payload.index].title = payload.name[0].toUpperCase() + payload.name.substring(1);
        },
        deleteProperty(state,payload){
            state.optionList.splice(payload,1)

            state.optionList.map((item,ind) => {
                    state.optionList[ind].name = item.name,
                    state.optionList[ind].title = item.title,
                    state.optionList[ind].orderTypeDefault = item.orderTypeDefault,
                    item.priority = ind
            })

        }
    },
    actions: {},
    modules: {},
});
