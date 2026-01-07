import { axiosPrivate } from "./axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import AuthContext from "@/Context/AuthContext";
import { toast } from 'react-hot-toast';

const useAxiosPrivate = () => {
    const { authTokens, clearTokens } = useContext(AuthContext) || {}; // Handle undefined context
    const navigate = useNavigate();

    useEffect(() => {
        if (!authTokens || !clearTokens) return; // Prevent unnecessary effect if context is undefined

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${authTokens?.access}`;
                }

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    toast.error('Your session has expired! Please login again.');
                    clearTokens();
                    navigate("/");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };

    }, [authTokens, clearTokens, navigate]);

    return axiosPrivate;
}

export default useAxiosPrivate;