import { useState } from 'react';

import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  const contextData = {
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState,
  }

  return (
    <AuthContext.Provider value={contextData}>
      <div className='site'>
        <Header />
        <Main />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
