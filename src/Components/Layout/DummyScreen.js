import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
const DummyScreen = () => {
  const token = useSelector(state => state.authentication.token);
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      let responce = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_PROJECT_API}`,
        {
          method: 'POST',
          body: JSON.stringify({
            "requestType": "VERIFY_EMAIL",
            "idToken": token
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
  
      if (responce.ok) {
        let data = await responce.json();
        console.log("Authantication Token:", data);
        alert("Please verify your account link has been sent to your mail")
      } else {
        let errorMessage = 'Sending Verify Link failed!';
        alert(errorMessage);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error)
    }
   
  }
  return (
    <div className='my-2 mx-2 row'>
      <h1 className="fst-italic text-center col-lg-8 col-md-8 col-sm-12 col-12" >
        Welcome to expanse tracker!!!
      </h1>
      <span className='fst-italic bg-warning my-2 col-lg-4 col-md-4 col-sm-12 col-12 text-center'>Your profie is incomplete<Link className='text-primary' to="/details">Complete now</Link></span>
      <hr />

      <div className='text-center col-lg-4 col-md-4 col-sm-12 col-12'>
        <button className="text-center btn btn-primary" onClick={handleVerify}>Veify Your E-mail</button>
      </div>
    </div>
  )
}

export default DummyScreen
