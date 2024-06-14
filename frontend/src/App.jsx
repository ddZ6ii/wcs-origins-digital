import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import DashLayout from "./layout/DashLayout";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import VideoPlayer from "./pages/VideoPlayer";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Connection from "./pages/Connection";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import User from "./pages/User";

import useAuth from "./hooks/useAuth";

export default function App() {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gradientDarkTheme">
      <Navbar />
      <main>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="videos" element={<Videos />} />
          <Route path="videos/:id" element={<VideoPlayer />} />
          <Route path="plans" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="account" element={<Connection />} />
          <Route path="*" element={<NotFound />} />

          {/* private routes */}
          {isLoggedIn && (
            <Route path="account" element={<DashLayout />}>
              {isAdmin ? (
                <>
                  <Route path="" element={<Admin dashboard />} />
                  <Route path="edit" element={<Admin edit />} />
                  <Route path="userList" element={<Admin userList />} />
                </>
              ) : (
                <Route path="" element={<User dashboard />} />
              )}
            </Route>
          )}
        </Routes>
      </main>
    </div>
  );
}
