import React from 'react';
import AppHeader from './Header/AppHeader';
import Menu from './Header/Menu';
import Footer from './Header/Footer';
import '../../assets/css/Dashboard.css'

function Dashboard() {
  return (
    <div>
      <AppHeader />
      <Menu />
      <div className="box-container">
        <input className="Std_btn" type="button" value="A" />
        <input className="Std_btn" type="button" value="B" />
        <input className="Std_btn" type="button" value="C" />
        <input className="Std_btn" type="button" value="D" />
       
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
