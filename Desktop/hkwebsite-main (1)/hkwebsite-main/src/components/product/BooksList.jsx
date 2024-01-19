import React, { useEffect, useState } from 'react';
import { useBooks } from '../context/BookContextProvider';
import { Box, Pagination, PaginationItem, Stack, TextField, Typography } from '@mui/material';
import BookCard from './BookCard';
import { useSearchParams } from 'react-router-dom';
import PaginationControlled from './Pagination';
import './Pagination.css';

const BookList = ({ itemPerPage }) => {
  const { getBooks, books } = useBooks();

  //! Search
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  useEffect(() => {
    getBooks();
  }, [searchParams]);

  //! PAGINATION
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const count = Math.ceil(books.length / itemPerPage);

  function currentData() {
    const begin = (page - 1) * itemPerPage;
    const end = begin + itemPerPage;
    return books.slice(begin, end);
  }

  console.log(currentData());

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        mt: '25px',
        backgroundColor: '#191919',
      }}
    >
      {currentData().map((elem) => (
        <BookCard key={elem.id} elem={elem} />
      ))}
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="primary"
          style={{ color: 'white' }}
        />
      </Stack>
    </Box>
  );
};

export default BookList;
