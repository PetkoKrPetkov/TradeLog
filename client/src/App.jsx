
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { AuthContextProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

function App() {

  return (
    <AuthContextProvider>
      <ToastProvider>
        <div className='site'>
          <Header />
          <ScrollToTop />
          <main id='main-content' className='content'>
            <Main />
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </AuthContextProvider>
  );
}

export default App;
