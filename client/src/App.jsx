
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {

  return (
    <AuthContextProvider>
      
      <div className='site'>
        <Header />       
          <Main />      
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
