import React, { useContext, useState } from 'react'
// import { Icon } from '@component'
// import { Button } from 'antd'
import { ReduxContext } from '../../store'
import { Map, APILoader } from '@uiw/react-amap';
import { amapkey } from '@constants/amapKey'
import styles from "./style.less";
import { Button, Checkbox, Icon, Link, Radio, Badge, Switch, Tag, LinkTag, SelectTag } from 'chenjinqiu-component'
import { Table, Column, ColumnGroup, DataCell } from 'fixed-data-table-2';
// import TextCell from './TextCell'
// import 'fixed-data-table-2/dist/fixed-data-table.css';


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
            {/* <Icon name='company' />
            <Button type="primary" onClick={() => {dispatch({type: 'home/changeList', payload: {params: {page: 20, current: 1}}})}}>操作</Button> */}
           {/*  <div style={{ width: '100%', height: '300px' }}>
                <APILoader akay={amapkey}>
                    <Map />
                </APILoader> 
            </div>       */}  
            {/* <Table
                rowHeight={30}
                groupHeaderHeight={30}
                headerHeight={30}
                rowsCount={dataState.length}
                width={1000}
                height={500}
            >
                <ColumnGroup fixed={true} header={<DataCell>Name</DataCell>}>
                <Column
                    columnKey="firstName"
                    fixed={true}
                    header={<DataCell>First Name</DataCell>}
                    cell={<TextCell data={dataState} />}
                    width={150}
                />
                <Column
                    columnKey="lastName"
                    fixed={true}
                    header={<DataCell>Last Name</DataCell>}
                    cell={<TextCell data={dataState} />}
                    width={150}
                />
                </ColumnGroup>
                <ColumnGroup>
                    <Column
                        columnKey="companyName"
                        header={<DataCell>Company</DataCell>}
                        cell={<TextCell data={dataState} />}
                        flexGrow={1}
                        width={150}
                    />
                </ColumnGroup>
            </Table> */}
             <Tag closable onClose={e => console.log(e)} outline>
                自定义色彩
            </Tag>
        </>
    )
}

export default Home