const en = {
  app_title: 'App title',
  app: `this application`,
  example: 'text for demo purposes',
  signUpFirstForm: {
    seeker: {
      title: "Seeker",
      description: "Find the perfect caregiver for you and your loved one to get reliable and personalised care"
    },
    caregiver: {
      title: "Caregiver",
      description: "Connect with clients seeking your expertise and provide compassionate care for those in need"
    }
  },
  signUpSecondForm: {
    firstNameInvalid: 'First name maximum length is 100',
    firstNameRequired: 'First name is required',
    lastNameInvalid: 'Last name maximum length is 100',
    lastNameRequired: 'Last name is required',
    emailLengthInvalid: 'Email maximum length is 100',
    emailInvalid: 'Please enter valid email',
    emailRequired: 'Email is required',
    phoneLengthInvalid: 'Phone length must be 10 numbers',
    phoneRequired: 'Phone is required',
    birthDateRequired: 'Birth date is required',
    placeholderFirstName: 'First Name',
    placeholderLastName: 'Last Name',
    placeholderEmail: 'E-mail Address',
    placeholderPhone: 'Phone Number',
    placeholderBirthDate: 'Date of Birth',
    placeholderIsOpen: 'I`m open to living in clients` houses',
  },
  footer: {
    termsText: 'By signing up you agree to our',
    termsButton: 'Terms & Conditions',
  },
  termsModal: {
    title: 'Terms',
    headText:
      'Welcome to the Caregiver App! Before you begin using our services, we kindly ask you to read and agree to the following terms and conditions, which govern your use of the app. By accessing or using the app, you acknowledge that you have read, understood, and agreed to these terms. If you do not agree to these terms, please refrain from using the app.',
    firstItem:
      'App Purpose: The Caregiver App serves as a platform that connects caregivers with individuals seeking caregiving services. The app facilitates communication and arrangements between caregivers and seekers but does not employ caregivers directly. We do not provide any caregiving services ourselves.',
    secondItem:
      'Eligibility: You must be 18 years or older to use the Caregiver App. By using the app, you represent and warrant that you are of legal age to enter into a binding agreement.',
    thirdItem:
      'User Accounts: To access certain features of the app, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account.',
    fourthItem:
      'User Conduct: While using the Caregiver App, you agree to: a. Provide accurate and up-to-date information in your profile. b. Use the app solely for lawful purposes and in compliance with all applicable laws and regulations. c. Respect the privacy and confidentiality of other users` information. d. Not engage in any fraudulent, misleading, or deceptive activities. e. Not harass, intimidate, or harm other users in any way.',
    fifthItem:
      'Caregiver-Seeker Engagements: a. Caregiver and seeker interactions facilitated through the app are solely between the parties involved. The Caregiver App does not act as an employer or agent for caregivers. b. Caregivers are responsible for setting their own rates, availability, and service terms. c. Seekers are responsible for reviewing and assessing caregivers` qualifications and references. d. The Caregiver App is not liable for any disputes, damages, or claims arising from caregiver-seeker engagements.',
  },
  needHelpModal: {
    title: 'Need Help',
    text: 'Reach out to us via email and we`ll get back to you as soon as possible:',
    email: 'support@afyanexcare.com',
  },
  signUpThirdForm: {
    countryRequired: 'Country is required',

    stateMaxLength: 'State must be at most 100 characters',
    stateRequired: 'State is required',

    cityMaxLength: 'City must be at most 100 characters',
    cityRequired: 'City is required',

    zipCodeMaxLength: 'Zip code must be at most 100 characters',
    zipCodeRequired: 'Zip code is required',

    addressMaxLength: 'Address must be at most 100 characters',
    addressRequired: 'Address is required',

    placeholderCountry: 'Country',
    placeholderState: 'State',
    placeholderCity: 'City',
    placeholderZipCode: 'Zip Code',
    placeholderAddress: 'Address',
  },
  countries: {
    canada: 'Canada',
    unitedStates: 'USA',
  },
  signUpFourthForm: {
    passwordInvalid: 'Password needs to be at least 8 characters',
    passwordsNotMatching: 'Passwords field and Confirm password field must match',
    passwordRequired: 'Password is required',
    confirmPasswordRequired: 'Confirm password is required',
    placeholderPassword: 'Password',
    placeholderConfirmPassword: 'Confirm Password',
  },
  SignUp: 'Sign Up',
  seeker:
    'Find the perfect caregiver for you or your loved one to get reliable and personalized care',
  caregiver:
    'Connect with clients seeking your expertise and provide compassionate care for those in need',
  BySigningUp: 'By signing up you agree to the ',
  terms_conditions: 'Terms and Conditions',
  btn_submit: 'Submit',
  request_code: 'Request new code',
  edit_email: 'Edit email',
  account_verification: {
    sent_code: 'We have sent and OTP verification code to your email, please enter it here',
    request_code: 'Request new code',
    btn_submit: 'Submit',
    successfully_verified: "Successfully Verified",
    successfully_caregiver: "Now you can pass background check and set up your profile and start exploring care seekers in your area",
    successfully_caregiver_btn: "Set up Profile",
    successfully_seeker: "Now you can sign in your account and start seeking care givers in your area",
    successfully_seeker_btn: "Sign In",
  },
  reset_password: {
    title: 'Reset Password',
    enter_email: 'Please enter your e-mail to get a link to reset your password',
    input_label: 'Email Address',
    btn_reset: 'Reset Password',
    btn_back: 'Back to Login',
    sent_code: 'We have sent and OTP verification code to your email, please enter it here',
    enter_new: 'Enter new Password',
    confirm: 'Confirm Password',
    success: 'Your Password is Updated!',
    instructions: 'Now you can go back to login to authenticate with new credentials',
    placeholder: {
      pass: 'Password',
      confirm_pass: 'Confirm Password',
    },
    aria: {
      toggle: 'toggle password visibility',
    },
    errors: {
      pass: "Passwords don't match",
      pass_required: 'This field is required',
      email: "An account matching that email doesn't exist",
      invalid: 'Enter valid email',
      invalid_pass: 'Password should contain at least {{num}} characters',
    },
  },
};

export default en;
