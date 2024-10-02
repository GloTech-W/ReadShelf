import { useState, useEffect } from 'react';
import { fetchBooks } from './services/bookApi';

function App() {
  const [books, setBooks] = useState([]);   // State to store books
  const [query, setQuery] = useState('');   // State to store the search query
  const [loading, setLoading] = useState(false);   // State to handle loading status
  const [error, setError] = useState(null);   // State to handle errors

  // Function to handle the search operation
  const handleSearch = async () => {
    if (query.trim() === '') {
      setError('Please enter a search query.');
      return;
    }
    
    setLoading(true);   // Start loading
    setError(null);   // Clear any previous errors

    try {
      const result = await fetchBooks(query);   // Fetch books based on user query
      if (result.length === 0) {
        setError('No books found.');
      } else {
        setBooks(result);
      }
    } catch (error) {
      setError('Failed to fetch books. Please try again later.');
    }

    setLoading(false);   // Stop loading
  };

  return (
    <div>
      <h1>Book Search</h1>
      
      {/* Search Bar */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}   // Update query on input change
          placeholder="Search for a book"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading Message */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Book Search Results */}
      <ul>
        {books.map((book) => (
          <li key={book.key}>
            <strong>{book.title}</strong> by {book.author_name?.join(', ')}   {/* Author names if available */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
