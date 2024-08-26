import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    if (error) setError(''); // Limpia el error al escribir
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() === '') {
      setError('Por favor, ingresa un término de búsqueda.');
      return;
    }
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="field">
      <form onSubmit={handleSearch}>
        <div className="control has-icons-left">
          <input
            className={`input is-large ${error ? 'is-danger' : ''}`}
            type="text"
            placeholder="Buscar canciones, álbumes o artistas..."
            value={query}
            onChange={handleInputChange}
            aria-label="Buscar canciones, álbumes o artistas"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search"></i> {/* Icono de búsqueda de FontAwesome */}
          </span>
        </div>
        {error && <p className="help is-danger">{error}</p>}
        {isLoading && (
          <div className="control">
            <span className="loader is-small">Buscando...</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
