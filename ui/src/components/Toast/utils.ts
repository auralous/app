import { TFunction } from "react-i18next";
import toast from "./toast";

export const toastAPIErrors = (errors: Error[], t: TFunction) => {
  for (const error of errors) {
    toast.error(t(error.message));
  }
};
