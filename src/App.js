import { useSelector, useDispatch } from 'react-redux';
import "./app.css";
import "antd/dist/antd.css";
import { useEffect } from 'react';
import { getUsersAsync, selectError, selectLoading } from './redux/userSlice';
import UsersTable from './UsersTable';
import FirstRow from './FirstRow';
import { Result } from 'antd';

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError)
  const loading = useSelector(selectLoading)
  useEffect(() => {
    dispatch(getUsersAsync())
  }, [])

  if (error) {
    return (
      <Result
        status="error"
        title="Failed!"
      >
      </Result>
    )
  }
  
  if (loading) {
    return (
      <Result
        status="info"
        title="Loading..."
      >
      </Result>
    )
  }

  return (
    <>
      <FirstRow />
      <UsersTable />
    </>
  )
};

export default App;
