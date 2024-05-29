import React from 'react';
import AddUsers from './components/AddUsers/AddUsers';
import EditUser from './components/EditUser/EditUser';
import MakeMenssages from './components/Menssages/MakeMenssages';
import './dashboard.scss';

const Dashboard = () => {
  return (
    <main className='dashboardBox'>
      <div className='boxMenssage'>
        <MakeMenssages />
      </div>
      <div className='form1'>
        <AddUsers />
      </div>
      <div className='form2'>
        <EditUser />
      </div>
    </main>
  );
};

export default Dashboard;
