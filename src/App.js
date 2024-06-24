import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import AllUsers from './Pages/AllUsers';
import Details from './Pages/Details';
import AddUser from './Pages/AddUser';
import EditUser from './Pages/EditUser';

// Create a client
const queryClient = new QueryClient()




function App() {

  return (
    <QueryClientProvider client={queryClient}>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allusers' element={<AllUsers />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/edituser/:id' element={<EditUser />} />
          <Route path='/adduser' element={<AddUser />} />
        </Routes>
      </Router>

      

    </QueryClientProvider>

  );
}

export default App;
