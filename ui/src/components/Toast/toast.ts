import { ReactNode } from "react";

interface ToastFunction {
  (message: ReactNode | string): string;
  error(message: ReactNode | string): string;
  success(message: ReactNode | string): string;
}

const toast: ToastFunction = (message) => {
  console.log("TOAST", message);
  return "";
};

toast.error = (message) => {
  console.log("TOAST/Error", message);
  return "";
};

toast.success = (message) => {
  console.log("TOAST/Success", message);
  return "";
};

export default toast;
