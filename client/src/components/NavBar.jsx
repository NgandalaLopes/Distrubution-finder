import React from 'react'
import logodark from '../assets/logodark.png' 
import { Link, NavLink } from 'react-router-dom'
function NavBar() {
  return (
    <div>
        <header className="pb-6 bg-white lg:pb-0">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* <!-- lg+ --> */}
        <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
            <Link to="/" className='navbar-brand'>
                    <img className="w-auto h-8 lg:h-10" src={logodark} alt="" />
            </Link>
            </div>

            <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                </svg>

                {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                
                <NavLink activeStyle= {({isActive}) =>({color: isActive && "red"})} to="/quickdonate" className="text-base font-medium text-orange-950 transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"> Quick Donate </NavLink>

                <NavLink activeStyle= {({isActive}) =>({color: isActive && "red"})} to="/whygiv2" className="text-base font-medium text-orange-950 transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"> Why giv2? </NavLink>

                <NavLink activeStyle= {({isActive}) =>({color: isActive && "red"})}  to="/ourpeople" className="text-base font-medium text-orange-950 transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"> Our People </NavLink>

               
            </div>

            <Link to="/CharitySearch" title="CharitySearch" className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-cyan-600 border border-transparent rounded-md lg:inline-flex hover:bg-cyan-500 focus:bg-cyan-500" role="button">Search for charity </Link>
        </nav>

        {/* <!-- xs to lg --> */}
        <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
            <div className="flow-root">
                <div className="flex flex-col px-6 -my-2 space-y-1">
                <NavLink style= {({isActive}) =>({color: isActive && "red"})} to="/quickdonate"  className="inline-flex py-2 text-base  font-medium text-orange-950 transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"> Quick Donate</NavLink>

                <NavLink style= {({isActive}) =>({color: isActive && "red"})} to="/whygiv2" className="inline-flex py-2 text-base font-medium text-orange-950 transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"> Why giv2? </NavLink>

                <NavLink style= {({isActive}) =>({color: isActive && "red"})} to="/resources" className="inline-flex py-2 text-base font-medium text-orange-950 transition-all duration-200 hover:text-cyan-600 focus:text-cyan-600"> Resources </NavLink>

                
                </div>
            </div>

            <div className="px-6 mt-6">
                <Link to="/CharitySearch" className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200  bg-cyan-600 border border-transparent rounded-md lg:inline-flex hover:bg-cyan-500 focus:bg-cyan-500" role="button"> Search for charity </Link>
            </div>
        </nav>
    </div>
</header>

    </div>
  )
}

export default NavBar