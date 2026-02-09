// import React, { useEffect, useState } from "react";
// import { useContext } from "react";

// const AuthContext = React.createContext();

// export const AuthProvider = (props) => {
//   const [user, setUser] = useState(
//     JSON.parse(sessionStorage.getItem("CravingUser")) || "",
//   );
//   const [isLogin, setIsLogin] = useState(!!user);
//   const [role, setRole] = useState(user?.role || "");

//   useEffect(() => {
//     setIsLogin(!!user);
//     setRole(user?.role || " ");
//   }, [user]);

//   const value = { user, setUser, isLogin, setIsLogin , role , setRole};

//   return (
//     <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };


import React, { useEffect, useState, useContext } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem("CravingUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      // console.error("Invalid user data in sessionStorage", error);
      sessionStorage.removeItem("CravingUser");
      return null;
    }
  });

  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user?.role || "");
  }, [user]);

  const value = { user, setUser, isLogin, setIsLogin, role, setRole };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

