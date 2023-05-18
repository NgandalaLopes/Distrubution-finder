import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER } from "../utils/Mutations";
import Auth from '../utils/auth';
import {useMutation} from '@apollo/client';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("It worked")

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      //event.stopPropagation();
    }
console.log("before try");
    try {
      const { data } = await addUser({
        variables: { ...userFormData }
      }); 
      console.log(data);
      Auth.login(data.addUser.token);
      
    } catch (err) {
      console.error(err);
      
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
            <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Sign Up!</h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Create your account</p>
        </div>

        <div class="relative max-w-md mx-auto mt-8 md:mt-16">
            <div class="overflow-hidden bg-white rounded-md shadow-md">
                <div class="px-4 py-6 sm:px-8 sm:py-7">
              {/* This is needed for the validation functionality above */}
              <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <div class="space-y-5">
                {/* show alert if server response is bad */}
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                  Something went wrong with your signup!
                </Alert>

                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='username'className="text-base font-medium text-gray-900">Username</Form.Label>
                  <Form.Control
                    type='text'
                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    placeholder='Your username'
                    name='username'
                    onChange={handleInputChange}
                    value={userFormData.username}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='email'className="text-base font-medium text-gray-900">Email</Form.Label>
                  <Form.Control
                    type='email'
                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    placeholder='Your email address'
                    name='email'
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='password'className="text-base font-medium text-gray-900">Password</Form.Label>
                  <Form.Control
                    type='password'
                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    placeholder='Your password'
                    name='password'
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <Button
                  disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                  type='submit'
                  className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                  variant='success'>
                  Submit
                </Button>
                </div>
              </Form>
              </div> </div> </div> </div> 
      </section>
      </div>
  );
};

export default SignupForm;
