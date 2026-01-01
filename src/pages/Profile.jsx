import React, { useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider 
} from '../firebaseConfig';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,     
  updateProfile,
  sendPasswordResetEmail 
} from 'firebase/auth';

import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
// 1. FiArrowLeft import kiya "Back" button ke liye
import { FiLogOut, FiUser, FiPackage, FiMapPin, FiSettings, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

// 2. Components Import kiye (Make sure ye files bani ho)
import MyOrders from '../components/MyOrders';
import Address from '../components/Address';
import Settings from '../components/Settings';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 3. Tab State Banaya (Default 'dashboard' rahega)
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- FORM STATES ---
  const [isSignup, setIsSignup] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- AUTH HANDLER ---
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;
        await updateProfile(newUser, { displayName: fullName });
        toast.success("Account Created Successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome Back!");
      }
    } catch (error) {
      console.error(error);
      let msg = error.message;
      if(msg.includes("auth/invalid-email")) msg = "Invalid Email Address";
      if(msg.includes("auth/user-not-found")) msg = "User not found";
      if(msg.includes("auth/wrong-password")) msg = "Wrong Password";
      if(msg.includes("auth/email-already-in-use")) msg = "Email already used";
      if(msg.includes("auth/invalid-credential")) msg = "Invalid Email or Password";
      toast.error(msg);
    }
    setLoading(false);
  };

  // --- 4. IMPROVED FORGOT PASSWORD (With Logs) ---
  const handleForgotPassword = async () => {
    if (!email) {
      toast.warn("Please enter your Email first! 📧");
      return;
    }
    try {
      console.log("Attempting to send reset email to:", email);
      await sendPasswordResetEmail(auth, email);
      console.log("Email sent successfully!");
      toast.success("Password reset email sent! Check your inbox 📩");
    } catch (error) {
      console.error("Firebase Error:", error.code, error.message);
      if (error.code === 'auth/user-not-found') {
         toast.error("User not found! Please Sign Up first.");
      } else {
         toast.error(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login Successful!");
    } catch (error) {
      toast.error("Google Login Failed!");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.info("Logged out");
    setActiveTab('dashboard'); // Logout hone par wapas main menu par set kar do
  };

  // --- 5. TAB RENDER FUNCTION ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return <MyOrders />;
      case 'address':
        return <Address />;
      case 'settings':
        return <Settings />;
      default:
        return (
          // DASHBOARD GRID (Buttons with onClick)
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
            
            <div onClick={() => setActiveTab('orders')} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition cursor-pointer flex items-center gap-4">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><FiPackage className="text-2xl"/></div>
               <div>
                 <h3 className="font-bold text-gray-800 dark:text-white">My Orders</h3>
                 <p className="text-sm text-gray-500">Track orders</p>
               </div>
            </div>

            <div onClick={() => setActiveTab('address')} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition cursor-pointer flex items-center gap-4">
               <div className="p-3 bg-green-100 text-green-600 rounded-lg"><FiMapPin className="text-2xl"/></div>
               <div>
                 <h3 className="font-bold text-gray-800 dark:text-white">Address</h3>
                 <p className="text-sm text-gray-500">Manage locations</p>
               </div>
            </div>

            <div onClick={() => setActiveTab('settings')} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition cursor-pointer flex items-center gap-4">
               <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><FiSettings className="text-2xl"/></div>
               <div>
                 <h3 className="font-bold text-gray-800 dark:text-white">Settings</h3>
                 <p className="text-sm text-gray-500">Profile settings</p>
               </div>
            </div>

          </div>
        );
    }
  };

  // --- UI PART: LOGIN FORM (No User) ---
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700 transition-all duration-300">
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {isSignup ? "Sign up to start shopping" : "Login to access your dashboard"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {isSignup && (
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 dark:text-white"
                />
              </div>
            )}
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 dark:text-white"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input 
                type="password" 
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 dark:text-white"
              />
            </div>
            {!isSignup && (
              <div className='flex justify-end'>
                <button type="button" onClick={handleForgotPassword} className='text-xs text-orange-600 hover:underline font-medium'>
                  Forgot Password?
                </button>
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold transition active:scale-95 disabled:opacity-70">
              {loading ? "Processing..." : (isSignup ? "Sign Up" : "Login")}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300 font-medium">
            <FcGoogle className="text-2xl" />
            {isSignup ? "Sign up with Google" : "Login with Google"}
          </button>

          <div className="text-center mt-6 text-sm text-gray-500">
            {isSignup ? "Already have an account?" : "Don't have an account?"} {" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-orange-600 font-bold hover:underline">
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- UI PART: LOGGED IN DASHBOARD ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6 mb-6">
          <img 
            src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-orange-100 dark:border-orange-900 object-cover"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
               {user.displayName || "User"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium">
            <FiLogOut /> Logout
          </button>
        </div>

        {/* 6. Back Button (Sirf tab open hone par dikhega) */}
        {activeTab !== 'dashboard' && (
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="mb-4 flex items-center gap-2 text-gray-500 hover:text-orange-600 transition font-medium"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
        )}

        {/* 7. Dynamic Content (Jo activeTab hoga wahi dikhega) */}
        <div className='w-full'>
           {renderTabContent()}
        </div>

      </div>
    </div>
  );
};

export default Profile;