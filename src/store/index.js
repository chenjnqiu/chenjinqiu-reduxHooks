import { useReducer } from 'react';
import combineReducers from './combineReducers';
//导出context
export { default as ReduxContext } from './context'

//获取所有的state处理文件
const reduceModule = require.context('../../src',true,/\.modal.js$/);

// 控制服务器和获取的当前时间差距
/* export const syncServerTime = (time) => {
    if (!time) return

    const current = Date.now()

    // eslint-disable-next-line no-global-assign
    Date = new Proxy(Date, {
        construct: (Target, args) => {
            if (args.length === 0) {
                return new Target((new Target()).getTime() + (time - current))
            }

            return new Target(...args)
        },
    })

    Date.now = new Proxy(Date.now, {
        apply: () => {
            return (new Date()).getTime()
        },
    })
} */

//导出获取store的函数
const getStore = (initState) => {
    let stateMultiple = initState || {} // state集合
    let newReducers = {} // reducer整合后集合
    let reduce = (stateMultiple, action) => stateMultiple
    
    if(reduceModule.keys().length > 0){
        const reduceModuleObj = mergeModuls(reduceModule, stateMultiple)
        stateMultiple = reduceModuleObj.states
        if(reduceModuleObj['reducers']){
            newReducers = mergeReducersName(reduceModuleObj['reducers'])
            reduce = combineReducers(newReducers['reducerList'])
        }
    }

    const [state, oldDispatch] = useReducer(reduce,stateMultiple);
    // 对dispatch二次处理
    const dispatch = middleMareFunc(state, oldDispatch, newReducers)
    return {
        state,
        dispatch,
    }
}

//中间值改变dispatch
function middleMareFunc(state, oldDispatch, newReducers){
    const getReducerArray = newReducers.reducerArray
    const newDispatch = (action) => {
        const operateTypeVal = getReducerArray[action.type]
        if(operateTypeVal[0] === 'effect'){  // 如果是effect操作
            operateTypeVal[1](action.payload, { state, dispatch: newDispatch })
        }else {
            return oldDispatch(action)
        }    
    }
    
    return newDispatch
}

// 获取state和reducer对象
function mergeModuls (modules,initState) {
    let multiple= {
        'states': initState
    };
    modules.keys().forEach((key) => {
        let module = modules(key).default;
        multiple['states'][module.namespace] = module['state'] // 改变states值
        // 改变reducers值
        if((module.reducer && Object.prototype.toString.call(module.reducer) === '[object Object]' && Object.keys(module.reducer).length > 0) ||
            module.effect && Object.prototype.toString.call(module.effect) === '[object Object]' && Object.keys(module.effect).length > 0
        ){
            multiple['reducers'] =  multiple['reducers'] || {}
           // multiple['reducers'][module.namespace] = module.reducer
            multiple['reducers'][module.namespace] = {
                'reduceList': module.reducer,
                'effectList': module.effect,
            }
        }  
    });
    return multiple
};

// 合并reducer名称和值函数
function mergeReducersName (currentReduce) {
    const reduceArray = Object.entries(currentReduce)
    let currentReducers = reduceArray.reduce((reduceObj, item) => {
        // reducer值的整合获取
        const reducerListVal = changelistName(item[0], 'reducer', item[1]['reduceList'])
        // effect值的整合获取
        const effectListVal = changelistName(item[0], 'effect', item[1]['effectList'])

        return { reducerArray: { ...reduceObj.reducerArray, ...reducerListVal.currentArray, ...effectListVal.currentArray },
        reducerList: { ...reduceObj.reducerList, [item[0]]: {...reducerListVal.currentVal, ...effectListVal.currentVal }}}

    },{ reducerArray: {}, reducerList: {} })

    return currentReducers
}

// 分别更改名称reducer和effect的名称
function changelistName(namespace, oparateName, data){
    let currentVal = {}
    let currentArray = {}
    Object.keys(data).forEach(key => {
        currentVal[`${ namespace }/${ key }`] = data[key]
        currentArray[`${ namespace }/${ key }`] = [oparateName, data[key]]
    })
    return { currentVal, currentArray }
}

export default getStore
