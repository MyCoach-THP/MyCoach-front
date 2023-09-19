import React, { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../config";
import Card from "./Card";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CoachesCarousel = () => {
  const [coaches, setCoaches] = useState([]);
  const handleDragStart = (e) => e.preventDefault();
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/coaches`)
      .then((response) => response.json())
      .then((data) => setCoaches(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des coaches : ", error)
      );
  }, []);

  const responsive = {
    0: {
      items: 1,
    },
    635: {
      items: 2,
      // itemsFit: 'contain',
    },
    970: {
      items: 3,
      // itemsFit: 'contain',
    },
    1230: {
      items: 4,
      // itemsFit: 'contain',
    }
  };

  const items = coaches.map((coach) => (
    <Card
      onDragStart={handleDragStart}
      role='presentation'
      key={coach.id}
      title={coach.firstname}
      description={coach.description}
      imageUrl={
        coach.image_url ? `${coach.image_url}` : "https://via.placeholder.com/250"
      }
      coachId={coach.id}
      userType='coach'
    />
  ));


  const renderPrevButton = ({ isDisabled }) => (
    <button
      onClick={() => carouselRef.current.slidePrev()}
      disabled={isDisabled}
      className="custom-prev-button mr-3 carousel-btn"
      aria-label="Slide précédente"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );

  const renderNextButton = ({ isDisabled }) => (
    <button
      onClick={() => carouselRef.current.slideNext()}
      disabled={isDisabled}
      className="custom-next-button ml-3 carousel-btn"
      aria-label="Slide suivante"
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );

  return (
    <div className='flex justify-around p-4'>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        ref={carouselRef}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton} />
    </div>
  )
}
export default CoachesCarousel