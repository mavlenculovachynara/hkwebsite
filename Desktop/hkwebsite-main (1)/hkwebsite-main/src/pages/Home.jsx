import React, { useEffect, useState } from "react";
import "./HomeStyle.css";
import next from '../accets/nextWhite.svg'
import previous from '../accets/previousWhite.svg';
import Footer from "../components/homePage/Footer";
import BookList from "../components/product/BooksList";
const Home = () => {
  const booksData = [
    {
      image: "https://cv9.litres.ru/pub/c/cover_200/70183792.webp",
      text: "Мой театр. По страницам дневника. Книга II",
      sales: 1200,
      rating: 4.5,
      reviews: 150,
    },
    {
      image: "https://cv7.litres.ru/pub/c/cover_200/65834170.webp",
      text: "Читайте людей как книгу",
      sales: 800,
      rating: 4.2,
      reviews: 100,
    },
    {
      image: "https://cv8.litres.ru/pub/c/cover_200/70068388.webp",
      text: "Сил нет",
      sales: 1500,
      rating: 4.8,
      reviews: 200,
    },
    {
      image: "https://cv8.litres.ru/pub/c/cover_200/68005088.webp",
      text: "Мой театр",
      sales: 600,
      rating: 4.0,
      reviews: 80,
    },
    {
      image: "https://cv6.litres.ru/pub/c/cover_200/68307263.webp",
      text: "Слово пацана",
      sales: 1000,
      rating: 4.6,
      reviews: 120,
    },
    {
      image: "https://cv3.litres.ru/pub/c/cover_200/41893430.webp",
      text: "Теория невероятности",
      sales: 1300,
      rating: 4.7,
      reviews: 180,
    },
    {
      image: "https://cv1.litres.ru/pub/c/cover_200/6444517.webp",
      text: "Думай медленно...Решай быстро",
      sales: 1300,
      rating: 4.7,
      reviews: 180,
    },
    {
      image: "https://cv9.litres.ru/pub/c/cover_200/70183792.webp",
      text: "Война и мир",
      sales: 1500,
      rating: 4.8,
      reviews: 200,
    },
    {
      image: "https://cv0.litres.ru/pub/c/cover_200/70193008.webp",
      text: "1984",
      sales: 1200,
      rating: 4.5,
      reviews: 150,
    },
    {
      image: "https://cv7.litres.ru/pub/c/cover_200/48514275.webp",
      text: "Убить пересмешника",
      sales: 800,
      rating: 4.2,
      reviews: 100,
    },
    {
      image: "https://cv6.litres.ru/pub/c/cover_200/36628165.webp",
      text: "Принципы. Жизнь и работа",
      sales: 1000,
      rating: 4.6,
      reviews: 120,
    },
    {
      image: "https://cv5.litres.ru/pub/c/cover_200/69986659.webp",
      text: "Гарри Поттер и философский камень",
      sales: 600,
      rating: 4.0,
      reviews: 80,
    },
  ];
  const books = [
    {
      image: "https://cv4.litres.ru/pub/c/cover_200/63995641.webp",
      text: "Роман с самим собой",
      sales: 1200,
      rating: 4.5,
      reviews: 150,
    },
    {
      image: "https://cv9.litres.ru/pub/c/cover_200/62780292.webp",
      text: "К себе нежно",
      sales: 800,
      rating: 4.2,
      reviews: 100,
    },
    {
      image: "https://cv8.litres.ru/pub/c/cover_200/65294181.webp",
      text: "Karmalogic",
      sales: 1500,
      rating: 4.8,
      reviews: 200,
    },
    {
      image: "https://cv7.litres.ru/pub/c/cover_200/48508375.webp",
      text: "Выбор",
      sales: 600,
      rating: 4.0,
      reviews: 80,
    },
    {
      image: "https://cv3.litres.ru/pub/c/cover_200/6698633.webp",
      text: "12 недель в году",
      sales: 1000,
      rating: 4.6,
      reviews: 120,
    },
    {
      image: "https://cv3.litres.ru/pub/c/cover_200/49652437.webp",
      text: "Мне все льзя",
      sales: 1300,
      rating: 4.7,
      reviews: 180,
    },
    {
      image: "https://cv7.litres.ru/pub/c/cover_200/8507477.webp",
      text: "Богатый папа, бедный папа",
      sales: 1300,
      rating: 4.7,
      reviews: 180,
    },
    {
      image: "https://cv9.litres.ru/pub/c/cover_200/70183792.webp",
      text: "Война и мир",
      sales: 1500,
      rating: 4.8,
      reviews: 200,
    },
    {
      image: "https://cv0.litres.ru/pub/c/cover_200/70193008.webp",
      text: "1984",
      sales: 1200,
      rating: 4.5,
      reviews: 150,
    },
    {
      image: "https://cv7.litres.ru/pub/c/cover_200/48514275.webp",
      text: "Убить пересмешника",
      sales: 800,
      rating: 4.2,
      reviews: 100,
    },
    {
      image: "https://cv8.litres.ru/pub/c/cover_200/69264385.webp",text: "Самооценка",
      sales: 1000,
      rating: 4.6,
      reviews: 120,
    },
    {
      image: "https://cv5.litres.ru/pub/c/cover_200/69986659.webp",
      text: "Гарри Поттер и философский камень",
      sales: 600,
      rating: 4.0,
      reviews: 80,
    },
  ];
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const booksPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setCurrentBookIndex((prevIndex) => (prevIndex + 1) % booksData.length);
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, [booksData]);

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const booksToShow = booksData.slice(startIndex, endIndex);

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(booksData.length / booksPerPage))
    );
  };

  return (
    <div className="q">
      <div className="container">
        <div
          className="book-info"
          style={{
            backgroundColor: "#212123",
            margin: "2px",
            marginLeft: "2px",
            padding: "0px 10px 0px 10px",
          }}
        >
          <h3 color="transparent">Топ книг по рейтингу</h3>
          <img
            src={booksData[currentBookIndex].image}
            alt={booksData[currentBookIndex].text}
          />
          <p>{booksData[currentBookIndex].text}</p>
        </div>
        <div className="container-for-books">
          {/* <h3 className="for-books-h3">Лучшая покупка</h3> */}
          {booksToShow.map((book, index) => (
            <div key={index} className="book-item">
              <img src={book.image} alt={book.text} />
              <p style={{ color: "#6c3eb8", fontWeight: 700 }}>{book.text}</p>
            </div>
          ))}
          <div className="pagination" style={{ paddingTop: "20px" }}>
            {/* <button onClick={goToPrevPage} disabled={currentPage === 1}>
              Предыдущая страница
            </button> */}
            <img
              style={{ color: "white" }}
              src={previous}
              alt=""
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            />

            <span style={{ color: "white" }}>{currentPage}</span>
            {/* <button
              onClick={goToNextPage}
              disabled={
                currentPage === Math.ceil(booksData.length / booksPerPage)
              }
            >
              Следующая страница
            </button> */}
            <img
              style={{ color: "white" }}
              src={next}
              alt=""
              onClick={goToNextPage}
              disabled={
                currentPage === Math.ceil(booksData.length / booksPerPage)
              }
            />
          </div>
        </div>
      </div>
      <div id="book-container">
        <div id="book-item">
          <div id="book-image1">
            <img
              src="https://venturebeat.com/wp-content/uploads/2018/01/javascript.jpg?fit=780%2C484&strip=all"
              alt=""
            />
          </div>
          {/* <div id="book-image2">
            
          </div> */}
          <img
            className="img2"
            src="https://avatars.mds.yandex.net/get-mpic/4415357/img_id7011755838858551387.jpeg/600x800"
            alt=""
          />
          <div id="book-details">
            <h3>
              Вы готовы сделать шаг вперед в веб-программировании и перейти от
              верстки в HTML и CSS к созданию полноценных динамических страниц?
              Тогда пришло время познакомиться с самым «горячим» языком
              программирования – JavaScript!
            </h3>
            <h5>1134⃀ </h5>
          </div>
        </div>
      </div>
	  <BookList itemPerPage={4} />
	  <Footer/>
    </div>
  );
};

export default Home;