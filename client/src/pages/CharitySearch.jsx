import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import {ADD_CHARITY} from "../utils/Mutations"
import { saveCharityIds, getSavedCharityIds } from '../utils/localStorage';

const SearchCharitys = () => {
  // create state for holding returned  api data
  const [searchedCharitys, setSearchedCharitys] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved charityId values
  const [savedCharityIds, setSavedCharityIds] = useState(getSavedCharityIds());

  const [saveCharity]=useMutation(ADD_CHARITY)

  // set up useEffect hook to save `savedCharityIds` list to localStorage on component unmount

  useEffect(() => {
    return () => saveCharityIds(savedCharityIds);
  });






  // create method to search for charitys and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    const apiKey = "pk_live_673d782aef6dfffeb8d90d0bd9389abe";
    try {
     const response = await fetch(`https://partners.every.org/v0.2/search/${searchInput}?apiKey=${apiKey}`);
      

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const {nonprofits } = await response.json();
      console.log({nonprofits})
      const charityData = nonprofits.map((charity) => ({
        charityId: charity.id,
        name: charity.name,
        description:charity.description,
        logoUrl: charity.logoUrl,
       coverImageUrl:charity.coverImageUrl,
        ein:charity.ein,
        matchedTerms: charity.matchedTerms.charity,
        location: charity.location,
        logoCloudinaryId:charity.logoCloudinaryId,
        profileUrl: charity.profileUrl,
       
      
      }));

      setSearchedCharitys(charityData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
      console.log("line76 error, check it")
    }
  };

  // create function to handle saving a charity to our database
  const handleSaveCharity = async (charityId) => {
    // find the charity in `searchedCharitys` state by the matching id
    const charityToSave = searchedCharitys.find((charity) => charity.charityId === charityId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
//*******************************************
try {
  const { data } = await saveCharity({
    variables: { newCharity: { ...charityToSave } },
  });

      // if charity successfully saves to user's account, save charity id to state
      setSavedCharityIds([...savedCharityIds, charityToSave.charityId]);
    } catch (err) {
      console.error(err);
      console.log("savedCharity error")
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Charity!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a charity'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedCharitys.length
            ? `Viewing ${searchedCharitys.length} results:`
            : 'Search for a charity to begin'}
        </h2>
        <Row>
          {searchedCharitys.map((charity) => {
            return (
              <Col md="4">
                <Card key={charity.charityId} border='dark'>
                  {charity.coverImageUrl ? (
                    <Card.Img src={charity.coverImageUrl} alt={`The cover for ${charity.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{charity.name}</Card.Title>
                    <p className='small'>Charities: {charity.location}</p>
                    <Card.Text>{charity.description}</Card.Text>
                    <Card.Text>{charity.matchedTerms}</Card.Text>
                    <Card.Text>{charity.profileUrl}</Card.Text>
                    <Card.Text>{charity.logoCloudinaryId}</Card.Text>
                    <Card.Text>{charity.ein}</Card.Text>
                   
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCharityIds?.some((savedCharityId) => savedCharityId === charity.charityId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveCharity(charity.charityId)}>
                        {savedCharityIds?.some((savedCharityId) => savedCharityId === charity.charityId)
                          ? 'This charity has already been saved!'
                          : 'Save this Charity!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchCharitys;