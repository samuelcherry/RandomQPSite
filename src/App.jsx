import "./App.css";
import { useState, useEffect } from "react";

import { fetchItems } from "./utils/fetchPosts";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState([]);
  const [onlyUnlocked, setonlyUnlocked] = useState([]);
  const [accessible, setAccessible] = useState([]);

  useEffect(() => {
    fetchItems().then((data) => {
      // sort by id ascending
      const sorted = [...data].sort((a, b) => a.id - b.id);
      setItems(sorted);
      setLoading(false);
      console.log(sorted);
    });
    fetchUser().then((data) => {
      setUnlocked(data[0].unlocked);
      setAccessible(data[0].accessible);
    });
  }, []);

  useEffect(() => {
    if (items.length === 0 || unlocked.length === 0) return;

    const updated = items.map((item) => {
      let newItem = { ...item };

      if (unlocked.includes(item.id)) {
        newItem.unlocked = "yes";
      }

      if (
        Array.isArray(item.requires) &&
        ((item.requires.length === 0 && item.unlocked === "yes") ||
          item.requires.every((req) => unlocked.includes(req))) &&
        item.unlocked === "yes"
      ) {
        newItem.accessible = "yes";
      }

      return newItem;
    });

    setItems(updated);
  }, [unlocked, accessible, items]);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredItems = items
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1> Random QP</h1>
      <p>{JSON.stringify(unlocked)}</p>
      <p>{JSON.stringify(accessible)}</p>
      <p>{JSON.stringify(onlyUnlocked)}</p>
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
        {filteredItems.map((item) => {
          let statusClass = "locked";

          if (item.unlocked === "yes") {
            statusClass = "unlocked";
          }

          if (item.accessible === "yes") {
            statusClass = "accessible";
          }
          return (
            <div key={item.id} className={`card ${statusClass}`}>
              <img src={item.icon} alt={item.title} title={item.title} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
