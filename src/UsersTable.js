import React from "react";
import 'antd/dist/antd.css';
import './index.css';
import { Table } from 'antd';
import { selectUserTableData, setFirstValue } from './redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function UsersTable() {
    const dispatch = useDispatch();
    const usersTableData = useSelector(selectUserTableData);

    const getColumns = (cityFilter) => [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            sorter: (a, b) => a.name.localeCompare(b.name),
            
        },
        {
            title: "Email",
            dataIndex: 'email',
            
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'City',
            dataIndex: 'city',
            filters: cityFilter,
            filterMode: 'tree',
            onFilter: (value, record) => record.city.includes(value),
        },
    ];

const cityFilter = usersTableData.map((user) => {
    return ({
        text: user.city,
        value: user.city,
    })
})

const columsFilter = getColumns(cityFilter)


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
        dispatch(setFirstValue(extra.currentDataSource[0]))
    }

    return (
        <Table columns={columsFilter} dataSource={usersTableData} onChange={onChange} />
    )
}