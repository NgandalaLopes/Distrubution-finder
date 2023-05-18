import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

import NavBar from "./components/NavBar";
import {setContext} from "@apollo/client/link/context"
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';


//import {ToastContainer} from "react-toastify"

// Import your components for each page
import QuickDonate from './pages/QuickDonate';
import WhyGiv2 from './pages/WhyGiv2';
import OurPeople from '../src/pages/OurPeople';
import SignupForm from './components/SignUpForm';
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import CharitySearch from "../src/pages/CharitySearch.jsx";
import Hero from "../src/components/Hero"
import LoginForm from './components/LoginForm';


// import Hero from "./components/Hero";

// import SignUp from "./components/SignUp";


const httpLink = createHttpLink({

  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (

    
    <ApolloProvider client={client}>

    <Router>
      
      <NavBar /> 
      <div>

        
        <Switch>
          <Route exact path="/" component={Hero}/>
          <Route path="/quickdonate" component={QuickDonate} />
          <Route path="/whygiv2" component={WhyGiv2} />
          <Route path="/ourpeople" component={OurPeople} />
          <Route path='/signup' component={SignupForm} />
          <Route path='/login' component={LoginForm} />
          <Route path="/CharitySearch" component={CharitySearch} />
          <Route  path='*'  element={<h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
       
        <Footer />
        </div>
        </Router>
      {/*<ToastContainer/>*/}
    </ApolloProvider>
     
  );
}

export default App;

