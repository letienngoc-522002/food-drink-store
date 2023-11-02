import Logo from "../img/logo.png";
import { MdAdd, MdLogout, MdShoppingCart } from "react-icons/md";
import avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useState } from "react";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER, //actionType
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <div className="fixed z-10 w-screen p-6 py-6 bg-slate-300">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City Food</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 ml-auto">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer"></MdShoppingCart>
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold"> 5 </p>
            </div>
            {/* -top2 :âm*/}
          </div>
          <div className="relative">
            <motion.img
              src={user ? user.photoURL : avatar}
              whileTap={{ scale: 0.7 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
              alt="avatar"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
              >
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer 
                            hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => {setIsMenu(false)}}
                  >
                    <MdAdd /> New Item
                  </p>
                </Link>
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 
                        transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  <MdLogout />
                  Logout
                </p>
              </motion.div>
            )}
          </div>
        </div>
        {/* <div className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0">
          <Link to={"/createItem"}>
            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
              {" "}
              <MdAdd /> New Item
            </p>
          </Link>
          <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
            <MdLogout />
            Logout
          </p>
        </div> */}
      </div>
      {/*Mobile */}
      <div className="flex md:hidden justify-between items-center w-full h-full">
        {/* Giỏ hàng */}
        <div className="relative flex items-center justify-center">
          <MdShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer"></MdShoppingCart>
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className="text-xs text-white font-semibold">2</p>
          </div>
        </div>

        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">Food</p>
        </Link>

        {/* Avatar */}
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.7 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
            src={user ? user.photoURL : avatar}
            alt="avatar"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
            >
              <Link to={"/createItem"}>
                <p className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  <MdAdd /> New Item
                </p>
              </Link>

              {/* menu  */}
              <ul className="flex flex-col px-4 py-3 gap-4">
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  About Us
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Services
                </li>
              </ul>

              <p
                className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                <MdLogout />
                Logout
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
