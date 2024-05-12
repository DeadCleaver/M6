import React from "react";
import { Button } from "react-bootstrap";
import { IoLogoGoogle } from "react-icons/io";

export default function GoogleLogin() {

  const handleGoogleLogin = () => {
    const googlelogin = "http://localhost:3001/auth/googleLogin";
    window.open(googlelogin, "_self");
  };

  return (
    <Button onClick={handleGoogleLogin} size="sm" variant="light" className="text-center">
      <IoLogoGoogle className="fs-5 m-1" />
      Accedi con Google
    </Button>
  );
}
