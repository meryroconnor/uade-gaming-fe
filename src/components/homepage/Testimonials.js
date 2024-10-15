import React, { useState } from 'react';
import './Testimonials.css';

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: 'Viezuh Robert',
            rating: 4.0,
            text: "Wow... I am very happy to use this site. I have purchased many games and the offers are really good.",
            image: "../../images/fantasmita_secondary.jpg"
        },
        {
            name: 'Paola Grey',
            rating: 4.5,
            text: "I really like the email subscription, all the game recommendations were of my interest.",
            image: 'image2-url'
        },
        {
            name: 'Tonatiu Diaz',
            rating: 4.5,
            text: "Beware of bargains are really too tempting! Since I registered I increased my monthly game purchases.",
            image: 'image3-url'
        },
        {
            name: 'Alexa Thompson',
            rating: 4.2,
            text: "A great site with an extensive library of games, very user-friendly!",
            image: 'image4-url'
        },
        {
            name: 'Chris Evans',
            rating: 4.8,
            text: "I found so many deals here that I wouldn’t have found elsewhere.",
            image: 'image5-url'
        },
        {
            name: 'Samantha Lee',
            rating: 4.6,
            text: "Customer support is very responsive, I got help with my account quickly!",
            image: 'image6-url'
        }
    ];

    const itemsToShow = 3;

    // Ensure the indices wrap around properly
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsToShow >= testimonials.length
                ? 0
                : prevIndex + itemsToShow
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - itemsToShow < 0
                ? testimonials.length - itemsToShow
                : prevIndex - itemsToShow
        );
    };

    // Get the testimonials to display
    const displayedTestimonials = testimonials.slice(
        currentIndex,
        currentIndex + itemsToShow
    );

    // If there are fewer than `itemsToShow` testimonials at the end, wrap around to the beginning
    if (displayedTestimonials.length < itemsToShow) {
        displayedTestimonials.push(
            ...testimonials.slice(0, itemsToShow - displayedTestimonials.length)
        );
    }

    return (
        <div className='body-container' >
            <div className='testimonial-container'>
                <div className="testimonial-carousel">
                    <h2>Trusted by Thousands of Happy Customers</h2>
                    <p className='subtitle'>We keep track of our customer experience. We plan towards better experiences every day.</p>
                    <div className="carousel-content">
                        {displayedTestimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="testimonial-item"
                            >
                                <div className="testimonial-header">
                                    <img src={testimonial.image} className="avatar" />
                                    <div className="name-rating">
                                        <h4>{testimonial.name}</h4>
                                        <span className="rating">{testimonial.rating}</span>
                                    </div>
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                            </div>
                        ))}
                    </div>
                    <div className="carousel-controls">
                        <button onClick={handlePrev}>&larr;</button>
                        <button onClick={handleNext}>&rarr;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;
