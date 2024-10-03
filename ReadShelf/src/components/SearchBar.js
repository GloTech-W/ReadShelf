function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
  
    const handleSearch = () => {
      onSearch(query);
    };
  
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a book"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  }
  