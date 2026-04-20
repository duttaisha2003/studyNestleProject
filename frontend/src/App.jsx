import{ Navigate} from 'react-router';
import { useState , useEffect} from "react";
import {Route,Routes} from 'react-router';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';


import AdminLogin from './pages/AdminLogin';

import AdminDashboard from './pages/AdminDashboard';
import AdminPending from './pages/AdminPending';
import AdminApprove from './pages/AdminApprove';

import Protected from './pages/Protected';


import UploadMaterial from './pages/UploadMaterial';
import DispStudyMaterial from './pages/DispStudyMaterial';
import About from './pages/About';
import Contact from './pages/Contact';
import GetProfile from './pages/Getprofile';
import UpdateProfile from './pages/UpdateProfile';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
function App() {
  
   const [isAuthenticated, setIsAuthenticated] = useState(false);
<<<<<<< HEAD
=======
   // FIX: added isLoading to prevent Protected from redirecting before checkAuth finishes
   const [isLoading, setIsLoading] = useState(true);
>>>>>>> 2c060a1 (Final  commit)
   
 useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await fetch(`${backendUrl}checkAuth`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(data.loggedIn); 
      } else if (res.status === 401) {
        setIsAuthenticated(false); 
      } else {
        console.warn("Unexpected status:", res.status);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Network error while checking login:", error);
      setIsAuthenticated(false);
<<<<<<< HEAD
=======
    } finally {
      // FIX: always stop loading whether success or error
      setIsLoading(false);
>>>>>>> 2c060a1 (Final  commit)
    }
  };
  
  checkLogin(); 
}, []);
  return (
    <>
      
      <Routes>
          <Route path="/"element={<Homepage isAuthenticated={isAuthenticated}  />}/>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
           

<<<<<<< HEAD
             <Route element={<Protected isAuthenticated={isAuthenticated} />}>
=======
             {/* FIX: pass isLoading so Protected waits before redirecting */}
             <Route element={<Protected isAuthenticated={isAuthenticated} isLoading={isLoading} />}>
>>>>>>> 2c060a1 (Final  commit)
              <Route path="/upload" element={<UploadMaterial isAuthenticated={isAuthenticated} />}></Route>
              {/* Add more protected routes here */}
            </Route>
           
<<<<<<< HEAD
            {/* <Route path="/upload" element={<UploadMaterial isAuthenticated={isAuthenticated} />}></Route> */}
=======
>>>>>>> 2c060a1 (Final  commit)
            <Route path="/disp" element={<DispStudyMaterial isAuthenticated={isAuthenticated} />}></Route>
            <Route path='/about' element={<About isAuthenticated={isAuthenticated} />}></Route>
            <Route path='/contact' element={<Contact isAuthenticated={isAuthenticated}  />}></Route>

            <Route path="/adminlogin" element={<AdminLogin/>}></Route>
            <Route path="/adminDashboard" element={<AdminDashboard />}>
                
                <Route path="pending" element={<AdminPending />} />
                <Route path="approve" element={<AdminApprove />} />
            </Route>

            <Route path='/getProfile' element={<GetProfile/>}></Route>
            <Route path='/updateProfile' element={<UpdateProfile/>}></Route>
        </Routes>
        
    </>
  )
}

export default App
