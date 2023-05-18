import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';


const TitleCard = props => {
    let {imgSrc, title, text}= props.data;
  return (
    
   <Card className="p-0 overflow-hidden h-100 shadow">
    <div className="overflow-hidden rounded p-0 bg-light">
       <Card.img variant="top" src={imgSrc} /> 
    </div>
    <Card.Body className= "text-center">
        <Card.Title className="display-6">{text}</Card.Title>
        <Card.Title className="display-6">{title}</Card.Title>
        
    </Card.Body>
  
   </Card>
  );
};

export default TitleCard;
