import React from "react";
import 'antd/dist/antd.css';
import './index.css';
import { Card } from 'antd';
import { selectFirstRow } from './redux/userSlice';
import { useSelector } from "react-redux";


export default function FirstRow() {
    const firstRow = useSelector( selectFirstRow)
    return (
        <>
            <Card title="First Row" style={{ width: 300 }} data-testid="first-row-card">
                <p data-testid="first-row-name">{firstRow?.name}</p>
                <p data-testid="first-row-email">{firstRow?.email}</p>
                <p data-testid="first-row-city">{firstRow?.city}</p>
            </Card>
        </>
    )
}
