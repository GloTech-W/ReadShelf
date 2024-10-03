import axios from 'axios';

const API_BASE_URL = 'https://openlibrary.org/search.json';

/**
 * Fetch books from the Open Library API based on the search query.
 * @param {string} query - The search query (title, author, etc.).
 * @returns {Promise<Array>} - A promise that resolves to an array of book objects.
 */
export const fetchBooks = async (query) => {
  if (!query) return []; // Return an empty array if no query is provided

  try {
    const response = await axios.get(`${API_BASE_URL}?title=${encodeURIComponent(query)}`);
    return response.data.docs;  // Assuming 'docs' contains the book data
  } catch (error) {
    console.error('Error fetching books:', error); // Log the error for debugging
    throw new Error('Failed to fetch books.'); // Throwing a more descriptive error
  }
};
