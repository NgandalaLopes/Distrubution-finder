import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import {useQuery, useMutation} from "@apollo/client"
import {UNSAVE_CHARITY} from "../utils/mutations"
import {GET_ME} from "../utils/queries"
import Auth from '../utils/auth';
import { unsaveCharityId } from '../utils/localStorage';

const SavedCharitys = () => {
 
  const {loading, data} = useQuery(GET_ME)

  const [unsaveCharity, {error}] = useMutation(UNSAVE_CHARITY)

  // use this to determine if `useEffect()` hook needs to run again
  const userData = data?.me || {}


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (charityId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await unsaveCharity( {variables: {charityId}});
      console.log(response)

      if (error) {
        console.log(error)
      }

     
      unsaveCharityId(charityId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved charitys!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedCharitys.length
            ? `Viewing ${userData.savedCharitys.length} saved ${userData.savedCharitys.length === 1 ? 'charity' : 'charitys'}:`
            : 'You have no saved charitys!'}
        </h2>
        <Row>
          {userData.savedCharitys.map((charity) => {
            return (
              <Col md="4">
                <Card key={charity.charityId} border='dark'>
                  {charity.image ? <Card.Img src={charity.image} alt={`The cover for ${charity.name}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{charity.name}</Card.Title>
                    <p className='small'>Charitys: {charity.city}</p>
                    <Card.Text>{charity.city}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(charity.charityId)}>
                      Delete this Book!
                    </Button>
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

export default SavedCharitys;
