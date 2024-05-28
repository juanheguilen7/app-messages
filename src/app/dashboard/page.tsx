import React from 'react'
import AddUsers from './components/AddUsers/AddUsers';
import EditUser from './components/EditUser/EditUser';
import MakeMenssages from './components/Menssages/MakeMenssages';

const Dashboard = () => {
  return (
    <>
      <MakeMenssages />
      <AddUsers />
      <EditUser />
    </>
  )
}

export default Dashboard;