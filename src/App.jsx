import "./App.css";
import { useState, useEffect } from "react";

import { fetchItems } from "./utils/fetchPosts";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState([]);
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
    if (items.length === 0 || unlocked.length === 0 || accessible.length === 0)
      return;

    const updated = items.map((item) => {
      let newItem = { ...item };

      if (unlocked.includes(item.id)) {
        newItem.unlocked = "yes";
      }

      if (accessible.includes(item.id)) {
        newItem.accessible = "yes";
      }

      return newItem;
    });
    setItems(updated);
  }, [unlocked, accessible]);

  const checkStatus = () => {
    for (let i = 0; i < unlocked.length; i++) {
      if (items[i].id === i + 1) {
        items.unlocked = "yes";
      }
    }
    for (let i = 0; i < accessible.length; i++) {
      if (items[i].id === i) {
        items.accessible = "yes";
      }
    }
  };

  checkStatus();

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
