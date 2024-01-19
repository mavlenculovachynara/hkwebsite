import React, { useState } from "react";
import "./Card.css"; // Предполагается, что файл стилей Card.css существует

// Обновленный функциональный компонент Card с состоянием для открытия/закрытия
const Card = ({ title, description, imageUrl }) => {
  // Состояние для управления видимостью содержимого карточки
  const [isOpen, setIsOpen] = useState(false);

  // Функция для переключения состояния isOpen
  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card" onClick={toggleCard}>
      {imageUrl && (
        <img src={imageUrl} alt="Изображение" className="card-image" />
      )}
      {isOpen && (
        <div className="card-body">
          {title && <h3 className="card-title">{title}</h3>}
          {description && <p className="card-description">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default Card;