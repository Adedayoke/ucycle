import axios from "axios";
import { axiosNoToken } from "./axios";

export type LoginRecyluType = {
  email: string;
  password: string;
};
export type LoginRecycluReturnType = {
  refresh: string;
  access: string;
  username: string;
  email: string;
  coins: 0;
  referral_code: string;
};
export type RegisterRecyclaReturnType = {
  refresh: string;
  access: string;
  message: string;
};
export type RegisterRecycluType = {
  first_name: string;
  last_name: string;
  referral_code?: string;
  country: string;
  email: string;
  password: string;
  username: string;
};
export type RegisterRecyclaType = {
  company_name: string;
  registration_number: string;
  recycling_license: string;
  email: string;
  password: string;
  username: string;
};
export type LoginRecylaType = {
  registration_number: string;
  password: string;
};

const authPrefix = "api";

export async function loginRecyclu(
  loginData: LoginRecyluType
): Promise<LoginRecycluReturnType | undefined> {
  try {
    console.log("first", loginData);
    let response = await axiosNoToken.post(`/api/login/`, loginData);
    return response.data;
  } catch (error) {
    throw error
    // console.log("error", error.response);
  }
}
export async function loginRecycla(loginCompanyData: LoginRecylaType) {
  try {
    console.log("first", loginCompanyData);
    let response = await axiosNoToken.post(`/api/auth/company-login/`, loginCompanyData);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw error
    // console.log("error", error.response);
  }
}

export async function registerRecyclu(
  registrationData: RegisterRecycluType
): Promise<any> {
  console.log("registerRecyclu", registrationData);
  try {
    let response = await axiosNoToken.post("/register/", registrationData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error
    // console.log("error", error.response);
  }
}
export async function registerRecycla(
  registrationFormData: FormData
): Promise<RegisterRecyclaReturnType | undefined> {
  console.log("registerRecycla", registrationFormData);
  try {
    let response = await axiosNoToken.post("/api/auth/register-company/", registrationFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    console.log("Successful", response.data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
