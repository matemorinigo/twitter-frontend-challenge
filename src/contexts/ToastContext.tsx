import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import Toast, { ToastProps } from "../components/toast/Toast";

const ToastContext = createContext<( (toast: ToastProps)=> void) >(()=>{});

export default ToastContext;

export const ToastContextProvider = ({ children }:  {children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    
    useEffect(()=>{
        if(toasts.length > 0){
            const timeout = setTimeout(() => {
                setToasts(toasts.slice(1));
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [toasts])

    const addToast = useCallback((toast: ToastProps)=> {
        setToasts(toasts => [...toasts, toast]);
    }, [setToasts])

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            {toasts.map((toast, index) => (
                <Toast key={index} {...toast} />
            ))}
        </ToastContext.Provider>
    )
}