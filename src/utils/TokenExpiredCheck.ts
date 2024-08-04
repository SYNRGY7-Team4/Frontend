import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface jwtTokenPayload extends JwtPayload {
  exp: number;
}

export const useTokenExpire = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");

      try {
        if (token) {
          const { exp } = jwtDecode<jwtTokenPayload>(token);
          const expirationTime = exp * 1000 - 60000;

          if (Date.now() >= expirationTime) {
            setShowAlert(true);
            localStorage.clear();
            navigate("/login");
          }
        }
      } catch (error) {
        setShowAlert(true);
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setShowAlert(false);
    navigate("/login");
  };

  return { showAlert, handleLogout };
};
