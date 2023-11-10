import Step1Form from "src/components/sign-up/sign-up-first/SignUpForm1";

import React from 'react'
import SignUpHeader from "src/components/reusable/header";

function SignUp() {
  return (
    <>
    <SignUpHeader text="Sign Up"/>
    <Step1Form onNext={()=>{}}/>
    </>
  )
}

export default SignUp
