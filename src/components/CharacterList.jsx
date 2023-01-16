import { useEffect, useState } from "react";
import Character from "./Character";

function NavPage(props) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <button
        className="btn btn-primary btn-sm"
        onClick={() => props.page > 1 && props.setPage(props.page - 1)}
        disabled={props.page === 1}
      >
        Page: {props.page}
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={() =>
          props.page < props.lastPage && props.setPage(props.page + 1)
        }
        disabled={props.page === props.lastPage}
      >
        Page: {props.page + 1}
      </button>
    </header>
  );
}

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setLastPage(data.info.pages);
      setLoading(false);
      setCharacters(data.results);
    }
    fetchdata();
  }, [page]);

  return (
    <div className="cointainer">
      <NavPage page={page} setPage={setPage} lastPage={lastPage} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
      <NavPage page={page} setPage={setPage} lastPage={lastPage} />
    </div>
  );
}

export default CharacterList;
