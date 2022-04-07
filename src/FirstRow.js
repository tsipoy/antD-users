import React from "react";
import 'antd/dist/antd.css';
import './index.css';
import { Card } from 'antd';
import { selectFirstRow } from './redux/userSlice';
import { useSelector } from "react-redux";


export default function FirstRow() {
    const firstRow = useSelector( selectFirstRow)
    console.log('firstRow::::::',firstRow);
    return (
        <>
            <Card title="First Row" style={{ width: 300 }}>
                <p>{firstRow?.name}</p>
                <p>{firstRow?.email}</p>
                <p>{firstRow?.city}</p>
            </Card>
        </>
    )
}
