import React from 'react';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ListNotice from './pages/Notice/ListNotice';
import CreateNoticeScreen from './pages/Notice/CreateNotice';
import Register from './pages/RegisterTime/RegisterTime';
import Employees from './pages/Employees/Employees';
import PaySlip from './pages/Payslip/Payslip';
import CreateEmployees from './pages/Employees/CreateEmployees';
import { Provider } from 'react-redux';
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={(
              <Sidebar>
                <Outlet />
              </Sidebar>
            )}
          >
            <Route path="/home" element={<Home />} />
            <Route path="/avisos" element={<ListNotice />} />
            <Route path="/avisos/criar" element={<CreateNoticeScreen />} />
            <Route path="/ponto" element={<Register />} />
            <Route path="/funcionarios" element={<Employees />} />
            <Route path="/funcionarios/criar" element={<CreateEmployees />} />
            <Route path="/holerite" element={<PaySlip />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;