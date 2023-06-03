import React, { useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard/BookCard';
import './booksearch.css';

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      let query = '';
      if (title) {
        query += `title:${title}`;
      }
      if (author) {
        query += ` author:${author}`;
      }
      if (subject) {
        query += ` subject:${subject}`;
      }
      if (publishDate) {
        query += ` publish_date:${publishDate}`;
      }
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=10`
      );
      
      console.log(response.data.docs);
      if (response.data.docs.length === 0 && page === 1) {
        setNoResults(true);
      } else {
        setBooks((prevBooks) => [...prevBooks, ...response.data.docs]);
        setPage((prevPage) => prevPage + 1);
        setNoResults(false); // Reset no results state
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    handleSearch();
  };

  const handleSearchClick = () => {
    setBooks([]);
    setPage(1);
    setNoResults(false);
    handleSearch();
  };

  const handleReset = () => {
    setBooks([]);
    setTitle('');
    setAuthor('');
    setSubject('');
    setPublishDate('');
    setNoResults(false);
  };

  return (
    <div>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search by title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by author..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by publish year..."
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>

      {noResults ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      )}

      {isLoading && <p>Loading...</p>}

      {!isLoading && books.length > 0 && books.length % 10 === 0 && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default BookSearch;
