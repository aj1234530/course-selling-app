import { toast } from "react-toastify";
export const triggerToast = (message: string, type: "success" | "error") => {
  if (type === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  }
  if (type === "error") {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  }
};
