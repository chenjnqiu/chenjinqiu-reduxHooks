import React, { useContext, useState } from 'react'
import { Icon } from '@component'
import { Button } from 'antd'
import { ReduxContext } from '../../store'
import { Map, APILoader } from '@uiw/react-amap';
import { amapkey } from '@constants/amapKey'
import styles from "./style.less";



const Home = (props) => {
    const { state, dispatch } = useContext(ReduxContext)
    const [dataState, useDataState] = useState([{
        firstName: 'Nola',
        lastName: 'Towne',
        companyName: 'Nikolaus LLC',
        sentence: 'delectus ducimus aperiam aliquid blanditiis qui dolorem voluptatem ipsam'
    }])

    return (
        <>
            <Icon name='company' />
            <Button type="primary" onClick={() => {dispatch({type: 'home/changeList', payload: {params: {page: 20, current: 1}}})}}>操作</Button>
        </>
    )
}

export default Home