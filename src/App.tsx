import { Route, Routes, useLocation } from "react-router-dom"
import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import Events from "./pages/Events"
import SinglePageEvent from "./pages/SinglePageEvent"
import Register from "./pages/Register"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer} from 'react-toastify';
import Login from "./pages/Login"

const queryClient = new QueryClient()

const App = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register' || location.pathname === '/login';

  return (
    <div className="text-white min-h-full md:h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" >
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <div className="mx-4 md:mx-20">
          {!isRegisterPage && <Navbar />}
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<SinglePageEvent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes> 
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
