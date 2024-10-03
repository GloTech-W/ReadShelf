import { useState } from 'react';
import { fetchBooks } from './services/bookApi';
import HomePage from './pages/HomePage';
import SearchBar from './components/SearchBar'; // Ensure this points to the correct file

function App() {
  const [books, setBooks] = useState([]); // State to store books
  const [query, setQuery] = useState(''); // State to store the search query
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  // Function to handle the search operation
  const handleSearch = async () => {
    if (query.trim() === '') {
      setError('Please enter a search query.');
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Clear any previous errors

    try {
      const result = await fetchBooks(query); // Fetch books based on user query
      if (result.length === 0) {
        setError('No books found.');
      } else {
        setBooks(result);
      }
    } catch (error) {
      setError('Failed to fetch books. Please try again later.');
    }

    setLoading(false); // Stop loading
  };

  return (
    <div>
      <h1>Book Search</h1>
      
      {/* Render the SearchBar component, passing necessary props */}
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />

      {/* Render the HomePage component, passing the necessary props */}
      <HomePage 
        books={books}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
