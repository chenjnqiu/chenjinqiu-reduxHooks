import React, { useContext } from 'react'
import { Button } from 'antd'
import { ReduxContext } from '../../store'

const About = (props) => {
    const { state, dispatch } = useContext(ReduxContext)
    return (<>
       <div>
            <Button type="primary" onClick={() => {dispatch({type: 'about/changeList', payload: {params: {page: 20, current: 1}}})}}>操作</Button>
            {state.home.data.map((item, index) => <p key={index}>{item}</p>)}
        </div>
    </>)
}

export default About