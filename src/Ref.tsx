import React, { useState } from 'react';
import './Ref.scss';
import friendsText from './assets/letter.png'; // Путь к изображению текста "friends"

const Ref: React.FC = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Поделиться с друзьями',
          text: 'Посмотрите этот интересный сайт!',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Замените на вашу ссылку
        })
        .then(() => {
          console.log('Успешно поделились');
        })
        .catch((error) => {
          console.error('Ошибка при обмене', error);
          alert('Произошла ошибка при обмене. Попробуйте снова.');
        });
    } else {
      alert('Web Share API не поддерживается на этом устройстве.');
    }
  };

  return (
    <div className="ref-container">
      <div className="ref-button" onClick={handleShare}>
        <img src={friendsText} alt="Friends Text" className="friends-text" />
      </div>
    </div>
  );
};

export default Ref;
