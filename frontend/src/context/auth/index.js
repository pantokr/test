import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchUser } from "api/auth";

// AuthContext 생성
const AuthContext = createContext();

// Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  // user 정보를 상태로 관리
  const [user, setUser] = useState({
    id: null,
    empName: "",
    deptName: "",
    officeTel: "",
    mobileTel: "",
  });

  useEffect(() => {}, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 훅으로 간편하게 사용
export const useAuth = () => useContext(AuthContext);
