import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './Routes';
import { Provider } from "react-redux";
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 bg-white min-h-screen">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;