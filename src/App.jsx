import "./App.css";
import { useState, useEffect } from "react";
import questItems from "./itemList";
import { fetchItems } from "./utils/fetchPosts";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredItems = questItems
    .filter((item) => {
      if (filter === "all") return true;
      if (filter === "locked") return item.unlocked === "no";
      if (filter === "unlocked") return item.unlocked === "yes";

      return true;
    })
    .filter((item) => {
      if (!search) return true;
      const lowerSearch = search.toLowerCase();
      return (
        (item.title || "").toLowerCase().includes(lowerSearch) ||
        (item.quest || "").toLowerCase().includes(lowerSearch)
      );
    });

  return (
    <>
      <h1> Random QP</h1>
      <div className="searchContainer">
        <input
          className="searchBar"
          type="text"
          placeholder="Search by name or quest..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button>Search</button>
      </div>
      {/* Filter buttons */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("unlocked")}>Unlocked</button>
        <button onClick={() => setFilter("locked")}>Locked</button>
      </div>
      <div className="gridContainer">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={
              item.unlocked === "yes" ? "card unlocked" : "card locked"
            }
          >
            <img src={item.icon} alt={item.title} title={item.title} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
