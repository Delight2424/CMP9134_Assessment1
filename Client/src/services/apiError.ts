import axios from "axios";

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Request failed"
    );
  }

  return "Something went wrong";
}
