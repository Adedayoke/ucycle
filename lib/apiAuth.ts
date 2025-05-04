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
export type RegisterRecycluType = {
  first_name: string;
  last_name: string;
  referral_code?: string;
  country: string;
  email: string;
  password: string;
  username: string;
};
export type AuthRecylaType = {
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
    // let response = await axios.post(
    //   `https://recyclu.pythonanywhere.com/api/login/`,
    //   loginData,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );

    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("error", error.response);
  }
}
export function loginRecycla({
  registration_number,
  password,
}: AuthRecylaType) {}

export async function registerRecyclu(
  registrationData: RegisterRecycluType
): Promise<any> {
  console.log("registerRecyclu", registrationData);
  try {
    let response = await axiosNoToken.post("register", registrationData);
    console.log(response);
    return response;
  } catch (error) {
    // console.log("error", error.response);
  }
}
