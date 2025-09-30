import "./App.css";
import { useState, useEffect } from "react";

import { fetchItems } from "./utils/fetchPosts";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState([]);
  const [accessable, setAccessable] = useState([]);

  useEffect(() => {
    fetchItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
    fetchUser().then((data) => {
      setUnlocked(data[0].unlocked);
      setAccessable(data[0].accessable);
      console.log("unlocked: ", unlocked);
      console.log("data: ", data[0].unlocked);
    });
  }, []);

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
      <p>{JSON.stringify(accessable)}</p>
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
