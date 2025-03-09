import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UtensilsCrossed, PlusCircle, User, LogOut, Menu, X } from "lucide-react";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("foodToken"); // Retrieve token from cookies
    if (token) {
      setUser(token);
    }
  }, []);

  const handleSignOut = () => {
    Cookies.remove("foodToken");
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">RecipeShare</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/add-recipe" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <PlusCircle className="h-5 w-5" />
                  <span>Add Recipe</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button onClick={handleSignOut} className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/auth" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}></div>
        )}
        <div
          className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button className="absolute top-4 right-4 text-gray-600" onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>

          <div className="mt-10">
            {user ? (
              <>
                <Link
                  to="/add-recipe"
                  className="block px-6 py-4 text-gray-600 hover:text-indigo-600 border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PlusCircle className="h-5 w-5 inline mr-2" />
                  Add Recipe
                </Link>
                <Link
                  to="/profile"
                  className="block px-6 py-4 text-gray-600 hover:text-indigo-600 border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 inline mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-6 py-4 text-gray-600 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5 inline mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-6 py-4 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
