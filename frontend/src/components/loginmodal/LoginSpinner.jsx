import React, { useContext, useEffect} from 'react'
import { Spinner } from 'react-bootstrap'
import { UserContext } from '../../context/UserContextProvider'
import { useNavigate } from 'react-router-dom';

export default function LoginSpinner() {
    
    const { setUserToken } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLoginVerify = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            setUserToken(token);
            navigate("/")
        } else {
            navigate("/")   
        }
    }

    useEffect(() => {
        handleLoginVerify();
    }, [])
    

  return (
    <div className='d-flex justify-content-center mt-5'>
        <Spinner  animation="border" variant="success"/>
    </div>
  )
}
