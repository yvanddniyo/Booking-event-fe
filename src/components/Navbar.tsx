import { Link, useNavigate } from "react-router-dom"
import { navLinks } from "../constant"
import Button from "./ReusableComponent/Button"
import { useState } from "react"
import { LogOut, Menu, X } from "lucide-react"
import { getUserFromToken } from "../utls/jwt"

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
 const userInfo = getUserFromToken();
 console.log("userInfo", userInfo);
 const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
 }
  return (
    <>
      <div className="w-full flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          Y-Events
        </div>
        
        <div className="hidden md:flex items-center gap-8 border-2 border-gray-500 px-12 py-4 rounded-full">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="font-medium text-xl hover:text-gray-300 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
        
       {userInfo ?(<div className="hidden md:flex items-center gap-8">
        <div className="font-medium text-xl hover:text-gray-300 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center">
              {userInfo.email.split("@")[0].charAt(0)}
            </div>
            <div className="text-sm"><LogOut className="text-white hover:text-gray-300 transition-all duration-300 cursor-pointer" size={20} onClick={handleLogout} /> </div>
          </div>
        </div>
       </div>): (<div className="hidden md:flex items-center gap-8">
          <Button className="bg-transparent text-white hover:bg-purple-500 hover:text-white" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button className="bg-transparent border-2 border-gray-500 text-white hover:bg-purple-500 hover:text-white" onClick={() => navigate("/register")} >
            Signup
          </Button>
        </div>)}
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
         <Menu className="text-white" size={32} />
        </button>
      </div>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-opacity-90 backdrop-blur-xs bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className={`
        fixed top-0 right-0 h-full w-80 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button 
              onClick={toggleSidebar}
              className="text-white p-2 hover:text-gray-300"
              aria-label="Close menu"
            >
              <X className="text-white" size={32} />
            </button>
          </div>

          <div className="flex flex-col gap-6 mb-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href} 
                className="font-medium text-xl hover:text-gray-300 transition-all duration-300 py-2 border-b border-gray-700"
                onClick={toggleSidebar}
              >
                {link.label}
              </Link>
            ))}
          </div>

        {userInfo ? <div className="flex flex-col gap-4 mt-auto">
          <Button className="w-full border-2 border-gray-500 text-white hover:bg-purple-500 hover:text-white" onClick={handleLogout}>
            Logout
          </Button>
        </div> : <div className="flex flex-col gap-4 mt-auto">
            <Button className="w-full border-2 border-gray-500 text-white hover:bg-purple-500 hover:text-white" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button className="w-full bg-transparent border-2 border-gray-500 text-white hover:bg-purple-500 hover:text-white" onClick={() => navigate("/register")}>
              Signup
            </Button>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Navbar