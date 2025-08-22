import { USER_ROUTE } from "@/constants";
import { axiosClient, createApiUrl } from "@/utils/api";
import { UserRegistration } from "../types/user";

// API Functions
/**
 * 사용자 등록
 */
export const UserRegistrationApi = async (
  registrationData: UserRegistration
): Promise<void> => {
  await axiosClient.post(
    createApiUrl(USER_ROUTE, "/user-registration"),
    registrationData
  );
};
