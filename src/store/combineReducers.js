export default reducers => {
    return (state = {}, action) => {
        let newReduce = {}
        Object.keys(reducers).forEach(key =>{
            const childState = state[key];
            if(typeof reducers[key][action.type] === 'function'){
                newReduce[key] = reducers[key][action.type](childState,action)
            }
        })
        return newReduce
    }
} 