import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPending from "./pages/AdminPending";
import AdminApprove from "./pages/AdminApprove";
import Protected from "./pages/Protected";
import UploadMaterial from "./pages/UploadMaterial";
import DispStudyMaterial from "./pages/DispStudyMaterial";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GetProfile from "./pages/Getprofile";
import UpdateProfile from "./pages/UpdateProfile";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Network error while checking login:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Homepage isAuthenticated={isAuthenticated} />}
        />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route
          element={
            <Protected
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            />
          }
        >
          <Route
            path="/upload"
            element={<UploadMaterial isAuthenticated={isAuthenticated} />}
          />

          <Route
            path="/disp"
            element={<DispStudyMaterial isAuthenticated={isAuthenticated} />}
          />

          <Route
            path="/about"
            element={<About isAuthenticated={isAuthenticated} />}
          />

          <Route
            path="/contact"
            element={<Contact isAuthenticated={isAuthenticated} />}
          />

          <Route path="/getProfile" element={<GetProfile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />

          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="pending" element={<AdminPending />} />
            <Route path="approve" element={<AdminApprove />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;