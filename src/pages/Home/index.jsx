import React, { useContext, useState } from 'react'
import { Icon } from '@component'
import { Button } from 'antd'
import { ReduxContext } from '../../store'
// import { Map, APILoader } from '@uiw/react-amap';
// import { amapkey } from '@constants/amapKey'
import styles from "./style.less";



const Home = (props) => {
    const { state, dispatch } = useContext(ReduxContext)
    console.log(state)

    return (
        <>
            <div>
                {state.home.visible && <Icon name='company' />}
                <Button type="primary" onClick={() => dispatch({type: 'home/changeTestDispatch'})}>显示图标</Button>
            </div>
            <div style={{marginTop: '20px'}}>
                <Button type="primary" onClick={() => {dispatch({type: 'home/changeList', payload: {params: {page: 20, current: 1}}})}}>操作</Button>
                {state.home.data.map((item, index) => <p key={index}>{item}</p>)}
            </div>
        </>
    )
}

export default Home