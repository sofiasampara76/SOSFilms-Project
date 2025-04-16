import React, { useState } from 'react';
import '../styles/Slider.css'; // CSS styles

const Slider = () => {
  // Cards content
  const films = [
    { id: 1, title: 'Card 1', content: 'Content for Card 1' },
    { id: 2, title: 'Card 2', content: 'Content for Card 2' },
    { id: 3, title: 'Card 3', content: 'Content for Card 3' },
    { id: 4, title: 'Card 4', content: 'Content for Card 4' },
    { id: 5, title: 'Card 5', content: 'Content for Card 5' },
  ];

  const shows = [
    { id: 1, title: 'Card 1', content: 'Content for Card 1' },
    { id: 2, title: 'Card 2', content: 'Content for Card 2' },
    { id: 3, title: 'Card 3', content: 'Content for Card 3' },
    { id: 4, title: 'Card 4', content: 'Content for Card 4' },
    { id: 5, title: 'Card 5', content: 'Content for Card 5' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState({films});

  // Move the slider left
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  // Move the slider right
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider-container">
      {/* Left Arrow */}
      <button className="arrow left-arrow" onClick={handlePrev}>
        &lt;
      </button>

      {/* Cards Container */}
      <div
        className="cards-slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {cards.map((card) => (
          <div key={card.id} className="card">
            <h3>{card.title}</h3>
            <p>{card.content}</p>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button className="arrow right-arrow" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Slider;
