import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminService = () => {

    const axiosPrivate = useAxiosPrivate()

     const postRegister = async (data) => {
        const response = await axiosPrivate.post("/api/signup",data);
        return response;
    };

    const postLogin = async (data) => {
        const response = await axiosPrivate.post("/api/login",data);
        return response;
    };

    const getallProductData = async () => {
        const response = await axiosPrivate.get("/api/products/all");
        return response;
    };

    return { 
        postRegister,
        postLogin,
        getallProductData
    };
};

export default AdminService;