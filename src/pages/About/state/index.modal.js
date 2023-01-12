const getInitialState = () => {
    return {
        data: [],
    }
}

export default {
    namespace: 'about',
    state: getInitialState(),
    subscriptions: {
        setup({ dispatch, history }) {
          history.listen(({location, action}) => {
            if (location.pathname === '/about') {
                dispatch({
                    type: 'about/UPDATE_LOADING',
                    payload: {
                        data: ['test1','test2']
                    }
                })
            }
          });
          
        },
    },
    reducer: {
        UPDATE_LOADING: (state, action) => {
            return Object.assign({}, state, { data: action.payload.data })
        },
        RESET_STATE: (state, action) => {
            return getInitialState()
        }
    },
    effect: {
        changeList: async (payload, { state, dispatch })=>{
            dispatch({
                type: 'about/UPDATE_LOADING',
                payload: {
                    data: ['1','2']
                }
            })
        },
    }
}