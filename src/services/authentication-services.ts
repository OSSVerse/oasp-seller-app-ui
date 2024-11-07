import { toast } from "@/hooks/use-toast";
import { api } from "./apis";
import { httpService } from "./http-service";
import { AxiosError } from "axios";
import type { ChangePasswordPayload, LoginPayload } from "@/store/auth-store";
import storage, { removeIsAuthenticated, setIsAuthenticated } from "@/lib/storage-helper";
import { AUTH_STORAGE_KEY, AUTH_STORAGE_TOKEN } from "@/lib/constant";

export interface Role {
    createdAt: string;
    updatedAt: string;
    name: string;
    _id: string;
}

export interface Organization {
    _id: string;
    name: string;
    storeDetailsAvailable: boolean;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    isSystemGeneratedPassword: boolean;
    mobile: string;
    role: Role;
    organization: Organization;
}

export interface LoginResponse {
    data: {
        access_token: string;
        user: User;
    };
}

export const forgetPassword = async (data: string) => {
    try {
        return await httpService.post(api.auth.forgetPassword, data);
    } catch (error) {
        if (error instanceof AxiosError) {
            toast({
                title: "Error",
                description: error?.response?.data?.error,
                variant: "destructive",
            });
        }
    }
};

export const login = async (data: LoginPayload, rememberMe: boolean) => {
    try {
        const res = await httpService.post<LoginResponse>(api.auth.login, data);
        if (rememberMe) {
            setIsAuthenticated(res.data.user);
            storage.setItem(AUTH_STORAGE_TOKEN, res.data.access_token);
        } else {
            sessionStorage.setItem(AUTH_STORAGE_TOKEN, res.data.access_token);
            sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res.data.user));
        }
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            toast({
                title: "Error",
                description: error?.response?.data?.error,
                variant: "destructive",
            });
        }
    }
};



export const changePassword = async (data: ChangePasswordPayload) => {
    try {
        const res = await httpService.post<LoginResponse>(api.auth.updatePassword, {
            email: data.email,
            currentPassword: data.password,
            password: data.newPassword,
        });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            toast({
                title: "Error",
                description: error?.response?.data?.error,
                variant: "destructive",
            });
        }
    }
};


export const logout = async () => {
    try {
        await httpService.post(api.auth.logout, {});
        storage.removeItem(AUTH_STORAGE_TOKEN);
        sessionStorage.clear()
        removeIsAuthenticated();
    } catch (error) {
        if (error instanceof AxiosError) {
            toast({
                title: "Error",
                description: error?.response?.data?.error,
                variant: "destructive",
            });
        }
    }
}
