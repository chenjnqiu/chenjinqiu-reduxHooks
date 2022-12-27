import React, { useContext } from 'react'
import { Button } from 'antd'
import { ReduxContext } from '../../store'

const About = (props) => {
    const { state, dispatch } = useContext(ReduxContext)
    return (<>
        {state.home.visible ? 'About Component!' : ''}
    </>)
}

export default About