import React, { useContext, useState } from 'react'
import { Icon } from '@component'
import { Button } from 'antd'
import { ReduxContext } from '../../store'
// import { Map, APILoader } from '@uiw/react-amap';
// import { amapkey } from '@constants/amapKey'
import styles from "./style.less";



const Home = (props) => {
    const { state, dispatch } = useContext(ReduxContext)

    return (
        <>
            <div>
                {state.home.visible && <Icon name='company' />}
                <Button type="primary" onClick={() => dispatch({type: 'home/changeTestDispatch'})}>显示图标</Button>
            </div>
        </>
    )
}

export default Home