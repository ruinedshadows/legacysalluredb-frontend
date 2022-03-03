import React from 'react';
import CarouselDisplay from '../share/carousel-display/Carousel-Display';
import DisplayBox from '../share/display-box/Display-Box';
import './Homepage.css';

const Homepage = () => (
    <div className="Homepage">
        <h1>Legacy's Allure DB</h1>
        <h2>A deckbuilder for the new customizable, card-based wargame.</h2>
        <CarouselDisplay></CarouselDisplay>
        <div>
            <DisplayBox title={"Noob-Friendly"}></DisplayBox>
            <DisplayBox title={"Recent"}></DisplayBox>
            <DisplayBox title={"Popular"}></DisplayBox>
        </div>
    </div>
)

export default Homepage;