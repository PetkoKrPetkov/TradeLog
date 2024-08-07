
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { AuthContextProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {

  return (
    <AuthContextProvider>
      
      <div className='site'>
        <Header />
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
