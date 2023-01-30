import { useReducer } from 'react'
import { createHashHistory } from 'history'
import combineReducers from './combineReducers';
//导出context
export { default as ReduxContext } from './context'

//获取所有的state处理文件
const reduceModule = require.context('/src', true, /\.modal.js$/);

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

// 获取函数实列
class CreateStore {
    constructor(opts = {}) {
        this.optsInit = opts;
        this.flag = false // 防止订阅loop
        this.history = opts.history || createHashHistory(); // 路由
        this.stateMultiple = opts.initState || {}; // state集合
        this.subscriptions = opts.subscriptions || {} // 订阅
        this.reducer = (stateMultiple, action) => stateMultiple // reduce
        this.newReducers = {}; // 新的reduce集合
        // 初始化
        this.init(); 
    }
    // 获取state相关
    getStore(useReducer) {
        // state和dispatch赋值
        const [state, oldDispatch] = useReducer(this.reducer, this.stateMultiple);
        this.state = state
        this.dispatch = this.middleMareFunc(state, oldDispatch)
        // 订阅
        if(!this.flag) {
            this.subscription()
            this.flag = true
        }
        return {
            state: this.state,
            dispatch: this.dispatch,
            combineReducers,
        }
    }
    // 判断是否是对象
    isObject(data) { return Object.prototype.toString.call(data) === '[object Object]'; }
    // 初始化
    init() {
        // 根据命名空间合并方法
        this.mergeReducersName();
        // reducer
        this.reducer = combineReducers(this.newReducers['dispatchsNameObj']) 
    }
    // 重新处理subscriptions
    subscription() {
        Object.keys(this.subscriptions).forEach(key => {
            const everyFunObj = this.subscriptions[key]
            Object.keys(everyFunObj).forEach(fun => everyFunObj[fun]({ dispatch: this.dispatch, history: this.history }))
        })
    }
    // 重新处理disptach
    middleMareFunc(state, oldDispatch) {
        const dispatchsObj = this.newReducers.dispatchsObj
        const newDispatch = (action) => {
            const operateTypeVal = dispatchsObj[action.type]
            if (operateTypeVal[0] === 'effect') {  // 如果是effect操作
                operateTypeVal[1](action.payload, { state, dispatch: newDispatch })
            } else {
                return oldDispatch(action)
            }   
        }
        return newDispatch
    }
    // 返回新的reducer
    mergeReducersName() {
        // 获取文件数据
        const multipleObj = this.getFileModal();
        this.subscriptions = multipleObj.subscriptions // 订阅
        this.stateMultiple = multipleObj.states // state值
        const dispatchsArray = Object.entries(multipleObj.dispatchs)
        // 组合新的dispatch数据
        this.newReducers = dispatchsArray.reduce((mergeObj, item) => {
            const namespace = item[0]
            const reducersObj = item[1]['reducers']
            const effectsObj = item[1]['effects']
            // reducer值的整合获取
            const newReducersObj = this.changeDispatchName(namespace, reducersObj, 'reducer')
            // effect值的整合获取
            const newEffectsObj = this.changeDispatchName(namespace, effectsObj, 'effect')
    
            return {
                // 非名称分类
                dispatchsObj: { ...mergeObj.dispatchsObj, ...newReducersObj.currentArray, ...newEffectsObj.currentArray }, 
                // 带名称分类
                dispatchsNameObj: { 
                    ...mergeObj.dispatchsNameObj, 
                    [namespace]: { ...newReducersObj.currentVal, ...newEffectsObj.currentVal } 
                }
            }
    
        }, { dispatchsObj: {}, dispatchsNameObj: {} })
    }
    // reducer组合命名空间
    changeDispatchName(namespace, data, oparateName) {
        let currentVal = {}
        let currentArray = {}
        Object.keys(data).forEach(key => {
            currentVal[`${namespace}/${key}`] = data[key]
            currentArray[`${namespace}/${key}`] = [oparateName, data[key]]
        })
        return { currentVal, currentArray }
    }

    // 获取现有文件modal命名的文件
    getFileModal() {
        // const fileUrl = this.optsInit.fileUrl || '/src';
        const modules = require.context('/src', true, /\.modal.js$/);
        // 初始化文件数据
        let multiple = {
            states: this.stateMultiple,
            subscriptions: {},
            dispatchs: {}, // reducers和effects
        };
        // 遍历不同文件
        if (modules.keys().length > 0) {
            modules.keys().forEach((key) => {
                let module = modules(key).default;
                let namespace = module.namespace;
                multiple['states'][namespace] = module['state']; // 改变states值

                // 改变dispatchs值
                if (this.isObject(module.reducer) && Object.keys(module.reducer).length > 0 ||
                    this.isObject(module.effect) && Object.keys(module.effect).length > 0) {
                    multiple['dispatchs'][namespace] = {
                        reducers: module.reducer,
                        effects: module.effect,
                    };
                }

                // 储存subscriptions值
                this.isObject(module.subscriptions) && (multiple['subscriptions'][namespace] = module.subscriptions);
            });
        }
        return multiple;
    }
}

const createStore = () => {
    const createStore = new CreateStore()
    createStore.getStore = createStore.getStore.bind(createStore, useReducer)
    return createStore
}

export default createStore()
