import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { setupInterceptors } from "../libs/axios";

export const AxiosInterceptorProvider = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return null;
};
