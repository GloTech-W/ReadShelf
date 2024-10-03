import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { fetchBooks } from "../services/bookApi";

const HomePage = () => {
    const [books, setBooks] =useState([]);
    const [error, setError] =useState('');

    const fetchbooks = async (query) => {
        try {
            const response = await fetch('htttps://openlibrary.org/search.json?q=${query}');
            const data = await response.json();
            if (data.docs.length === 0) {
                setError('No books found. Try a different serach term.');   
            } else {
                setError('');
                setBooks(data.docs);
            }
        } catch (err) {
            setError('Error fetching books. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Search for Books</h1>
      <SearchBar onSearch={fetchBooks} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {/* Display the list of books here (BookCard components) */}
    </div>
  );
};

export default HomePage;