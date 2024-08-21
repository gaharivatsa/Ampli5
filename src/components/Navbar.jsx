import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Navbar Container */}
            <div className="flex flex-row min-h-[3vh] p-3 bg-black w-full items-center justify-between">
                {/* Logo */}
                <div className="text-2xl text-white">
                    Ampli<span className="text-orange-500 text-4xl">5</span>
                </div>
                {/* Desktop Menu */}
                <div className="hidden md:flex flex-row items-center mr-4 gap-4">
                    <Link to="/">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300">
                            Resume Builder
                        </button>
                    </Link>
                    <Link to="/similarity">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300">
                        JD and Resume
                        </button>
                    </Link>
                </div>
                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-xl bg-orange-500 text-white p-2 rounded">
                        Menu
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-start bg-black w-full p-4 gap-2">
                    <Link to="/">
                        <button className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300">
                            Resume Enhance
                        </button>
                    </Link>
                    <Link to="/similarity">
                        <button className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300">
                            JD and Resume
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default Navbar;
