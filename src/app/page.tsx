import React from 'react'
import MakeMenssages from './components/Menssages/MakeMenssages'
import AddUsers from './components/AddUsers/AddUsers';
import EditUser from './components/EditUser/EditUser';

const Home = () => {
  return (
    <>
      <MakeMenssages />
      <AddUsers />
      <EditUser />
    </>
  )
}

export default Home;