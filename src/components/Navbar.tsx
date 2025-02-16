import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, PlusCircle, User, LogOut } from 'lucide-react';
// import { supabase } from '../lib/supabase';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  // React.useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setUser(session?.user ?? null);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user ?? null);
  //   });
  // }, []);

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   navigate('/auth');
  // };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">RecipeShare</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/add-recipe"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Add Recipe</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  // onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
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