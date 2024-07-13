import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";


const Navbar = () => {

  const {user , logout} = useContext(AuthContext);
 

  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

    const navlinks = <>

<li><NavLink to="/">Home</NavLink></li>
<li><NavLink to="/medicine">Medicine</NavLink></li>
<li><NavLink to="/doctors">Doctors</NavLink></li>
<li><NavLink to="/doctors">Ambulence</NavLink></li>

      {user ?
    <>
       <span>{user?.displayName}</span>
      
        <button onClick={handleLogOut} className="btn btn-accent">Logout</button>
       </>: <>
        <li><NavLink to="/login">Login</NavLink></li>
        </>
      }
    
    </>
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
             {navlinks}
         
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">LifeMate</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          
        {navlinks}
          </ul>
        </div>


        <div className="navbar-end">
{

user ?
      <Link to="dashboard">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
          <img className="w-1/2" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      
      </div>
      </Link>
      :
      <div className="hidden">
         <Link to="dashboard">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
          <img className="w-1/2" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      
      </div>
      </Link>

      </div>

}

        </div>



      </div>
    );
};

export default Navbar;