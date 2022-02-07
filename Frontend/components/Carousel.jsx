import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ProfileCarousel(props) {
  return (
    <Carousel>
        {props.portfolio.map(media => (
          <div key={media}>
            <img src={media} />
            <p className="legend">Legend 1</p>
          </div>
        ))}

    </Carousel>
  );
}