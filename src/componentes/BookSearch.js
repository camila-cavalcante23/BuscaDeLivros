import React, { useState } from "react";
import axios from "axios";

const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://hn.algolia.com/api/v1/search?query=${query}`
            );
            setBooks(response.data.hits);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setError("Falha ao carregar resultados. Tente novamente."); 
        } finally {
            setLoading(false);
        }
    };

    
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="book-search">
            <h2>Buscar Conteúdo</h2> {}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress} // Busca com Enter
                placeholder="Digite um termo de busca..."
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? "Carregando..." : "Pesquisar"}
            </button>

            {error && <p className="error-message">{error}</p>}

            <ul className="results-list">
                {books.length === 0 && !loading && (
                    <p>Nenhum resultado encontrado.</p>
                )}

                {books.map((item) => (
                    <li key={item.objectID} className="result-item">
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.title || "Título não disponível"}
                        </a>
                        {item.author && <p>Autor: {item.author}</p>} {}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookSearch;