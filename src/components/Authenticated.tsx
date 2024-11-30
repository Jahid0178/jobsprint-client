import { setUser } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { IJwtPayload } from "@/typescript/interface";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const Authenticated = ({ children }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const jobSprintToken = localStorage.getItem("jobsprint-auth-token");

  if (jobSprintToken) {
    const decodedToken = jwtDecode<IJwtPayload>(jobSprintToken) as IJwtPayload;
    dispatch(setUser(decodedToken));
  }
  return <>{children}</>;
};

export default Authenticated;
