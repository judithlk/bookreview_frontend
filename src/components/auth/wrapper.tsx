"use client";

import React, { ReactNode } from "react";
import withAuth from "./withAuth";

interface AuthProtectedWrapperProps {
  children: ReactNode;
}

const AuthProtectedWrapper: React.FC<AuthProtectedWrapperProps> = ({
  children,
}) => {
  const ProtectedLayout = withAuth((props: AuthProtectedWrapperProps) => (
    <>{props.children}</>
  ));

  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default AuthProtectedWrapper;
