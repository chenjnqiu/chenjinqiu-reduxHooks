import { requestTest } from '../service'

const getInitialState = () => {
    return {
        data: [],
        visible: false,
    }
}

export default {
    namespace: 'home',
    state: getInitialState(),
    reducer: {
        UPDATE_LOADING: (state, action) => {
            return Object.assign({}, state, { data: action.payload.data })
        },
        UPDATE_TEST: (state, action) => {
            return Object.assign({}, state, { visible: action.payload.visible })
        },
        RESET_STATE: (state, action) => {
            return getInitialState()
        }
    },
    effect: {
        changeList: async (payload, { state, dispatch })=>{
            const data = await requestTest(payload.params)
            dispatch({
                type: 'home/UPDATE_LOADING',
                payload: {
                    data: ['test1','test2']
                }
            })
            dispatch({
                type: 'home/changeTestDispatch',
                payload: {
                    visible: !state.home.visible
                }
            })
        },
        changeTestDispatch: (payload, { state, dispatch })=>{
            dispatch({
                type: 'home/UPDATE_TEST',
                payload,
            })
        },
    }
}