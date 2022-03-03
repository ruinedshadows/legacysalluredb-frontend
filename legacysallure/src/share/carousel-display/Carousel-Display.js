import Carousel from 'react-bootstrap/Carousel'
import React from 'react';
import './Carousel-Display.css';
import imgList from '../../constants/imgList';
import shortid from 'shortid';

const CaroItem = ({title, content}) => (
    <Carousel.Item interval={500}>
        <img 
            src= {imgList.placeholder}
        />
        <Carousel.Caption>
            <h5>{title}</h5>
            <p>{content}</p>
        </Carousel.Caption>
    </Carousel.Item>
)
const CarouselDisplay = () => {
    let items = []
    const title = "Title"
    const content = "Content"
    for(var x = 0; x<4; x++) {
        items.push(<CaroItem key={shortid.generate()} title={"Title"} content={"contents"} />)
    }
    return (
    <div >
        <Carousel variant="dark" interval={3000} className="Carousel-display">
            <Carousel.Item >
                <img 
                    src= {imgList.placeholder}
                />
                <Carousel.Caption>
                    <h5>{title}</h5>
                    <p>{content}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <img 
                    src= {imgList.placeholder}
                />
                <Carousel.Caption>
                    <h5>{title}</h5>
                    <p>{content}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <img 
                    src= {imgList.placeholder}
                />
                <Carousel.Caption>
                    <h5>{title}</h5>
                    <p>{content}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
    )
}

export default CarouselDisplay