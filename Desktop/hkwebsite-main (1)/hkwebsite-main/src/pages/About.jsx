import React from "react";
import Card from "./Card";

import "./About.css";
import ReactPlayer from "react-player";

import im1 from "../image/cat.jpg";
import im2 from "../image/photo_2024-01-17_20-15-00.jpg";
import im3 from "../image/photo_2024-01-17_20-21-53.jpg";
import im4 from "../image/photo_2024-01-17_20-21-59.jpg";
import im5 from "../image/Снимок экрана 2024-01-17 202143.png";
import im6 from "../image/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product.jpg";
import im7 from "../image/Снимок экрана 2024-01-18 192414.png";

const About = () => {
  return (
    <div>
      <img src={im7} className="ll" />

      <div className="AboutCard">
        <Card
          className="Card1"
          title="Эрлан"
          description="Тимлид. Тренера не играют, руководствуют 20"
          imageUrl={im5}
        />
        <Card
          className="Card2"
          title="Алексей"
          description="Главное призвание - дота, 28"
          imageUrl={im2}
        />
        <Card
          className="Card4"
          title="Мээрим"
          description="Создатель веток и прекрасного футера и много чего другого 17"
          imageUrl={im3}
        />
        <Card
          className="Card5"
          title="Абдиль"
          description="Черная лошадка, переводчик, но перевода нет :D 16"
          imageUrl={im1}
        />
        <Card
          className="Card3"
          title="Болотбек"
          description="Архитектор, статичный человек, 4-класс"
          imageUrl={im4}
        />

        {/* Конечно, вы можете добавить столько карточек, сколько нужно */}
      </div>
    </div>
  );
};

export default About;
