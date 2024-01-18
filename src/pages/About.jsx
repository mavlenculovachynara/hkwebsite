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
          title="эрлан"
          description="Описание для карточки. Здесь может быть информация о продукте, пользователе или любом другом объекте."
          imageUrl={im1}
        />
        <Card
          className="Card2"
          title="Аликсеи"
          description="Описание для карточки. Здесь может быть информация о продукте, пользователе или любом другом объекте."
          imageUrl={im2}
        />
        <Card
          className="Card4"
          title="Мерим"
          description="Описание для карточки. Здесь может быть информация о продукте, пользователе или любом другом объекте."
          imageUrl={im3}
        />
        <Card
          className="Card5"
          title="Абдиль"
          description="Описание для карточки. Здесь может быть информация о продукте, пользователе или любом другом объекте."
          imageUrl={im4}
        />
        <Card
          className="Card3"
          title="Болотбек"
          description="Описание для карточки. Здесь может быть информация о продукте, пользователе или любом другом объекте."
          imageUrl={im5}
        />

        {/* Конечно, вы можете добавить столько карточек, сколько нужно */}
      </div>
    </div>
  );
};

export default About;
