import { useContext } from "react";
import ToastContext from "../contexts/ToastContext";

const useToastContext = () => {
    return useContext(ToastContext);
}
export default useToastContext