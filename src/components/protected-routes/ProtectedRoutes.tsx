import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useHttpRequestService } from "../../service/HttpRequestService"


const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const service = useHttpRequestService()

    useEffect(()=>{
        const checkAuth = async () => {
            const isAuth = await service.isAuthenticated()
            setIsAuthenticated(isAuth)
        }

        checkAuth()
    }, [])


    return (
        <>
            {isAuthenticated ? <Outlet /> : <Navigate to='/sign-in' />}
        </>
    )
}

export default ProtectedRoutes