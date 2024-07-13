import { AiFillMedicineBox } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBookReader, FaHome } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

import { GrOverview } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">

             <div className="w-64 min-h-screen text-white font-semibold bg-blue-400">
                <ul className="menu p-4">
                  
                

                        <li>
                        <NavLink to="/dashboard/overview" className="flex items-center space-x-2">
                        <GrOverview/>
                            <span>Overview</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/appointmentList" className="flex items-center space-x-2">
                        <FaBookReader />
                            <span>Appointment List</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" className="flex items-center space-x-2">
                        <CgProfile />
                            <span>Profile</span>
                        </NavLink>
                    </li>

                    {/* divider */}

                    <div className="divider bg-slate-50"></div>
                    <li>
                        <NavLink to="/" className="flex items-center space-x-2">
                       <FaHome></FaHome>
                            <span>Home</span>
                        </NavLink>
                    </li>


                    <li>
                        <NavLink to="/medicine" className="flex items-center space-x-2">
                        <AiFillMedicineBox />
                            <span>Medicine</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/doctors" className="flex items-center space-x-2">
                        <FaUserDoctor />
                            <span>Doctors</span>
                        </NavLink>
                    </li>
                    
                    </ul>
                            </div>

            {/* nested route  */}
            <div className="flex-1">
                <Outlet />
            </div>
            {/* end nested rooute  */}

        </div>
    );
};

export default Dashboard;