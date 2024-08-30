import { useEffect, useState } from "react"
import { Navigate, Outlet, useActionData } from "react-router-dom"
import { useHttpRequestService } from "../../service/HttpRequestService"


const ProtectedRoutes = () => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const service = useHttpRequestService()

    useEffect(()=>{
        setIsLoading(true)
        const fetchAuth = async () => {
            setIsAuthenticated(await service.isAuthenticated())
            setIsLoading(false)
        }

        fetchAuth()
    }, [])

    return (
        <>
            {(isAuthenticated && !isLoading) && <Outlet />}
            {(!isAuthenticated && !isLoading) && <Navigate to='/sign-in' />}
        </>
    )
}

export default ProtectedRoutes