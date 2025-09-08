import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    // testing credentials
    // user: akshat4724@gmail.com
    // pass: akshatpass
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});

        } catch (error) {
            set({ authUser: null });
            console.log("Error in useAuthStore checkAuth, error: ", error);
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signUp: async(data) => {
        try {
            set({isSigningUp: true});
            const res = await axiosInstance.post("auth/signup", data);
            set({authUser: res.data});
            toast.success("User created Successfully!")

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in signup function in useAuthStore", error.message);

        } finally {
            set({isSigningUp: false});
        }
    },
    
    login: async(data) => {
        set({ isLogginIn: true });
        try {
            const res = await axiosInstance.post("auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully!")

        } catch (error) {

            if (!error.response) {
            toast.error("Could not connect to the server at the moment!");
            console.log("Network Error, maybe server not active! : ", error.message);
            } 
            
            else {
            // This handles errors sent from the backend (e.g., wrong password)
            toast.error(error.response.data.message || "An unexpected error occurred.");
            console.log("Server Response Error:", error.message);
            }

        } finally {
            set({isLogginIn: false});
        }
        
    },

    logout: async() => {
        try {
            axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logout Successful");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in logout function in useAuthStore: ", error.message);
        } 
    },

    updateProfile: async(data) => {
        set ({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set ({ authUser: res.data });
            toast.success("Profile Photo Updated Successfully!");

        } catch (error) {
            console.log("Error in update profile: ", error);
            toast.error(error.response.data.message);
        } finally {
            set ({ isUpdatingProfile: false });
        }
    },
}));