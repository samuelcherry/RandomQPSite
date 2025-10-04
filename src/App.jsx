import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { fetchItems } from "./utils/fetchPosts";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState([]);
  const [accessible, setAccessible] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const localItems = localStorage.getItem("itemList");
    const localUser = localStorage.getItem("userData");

    if (!localItems || !localUser) {
      console.log("Fetching form Supabase...");

      if (!localItems) {
        fetchItems().then((data) => {
          // sort by id ascending
          const sorted = [...data].sort((a, b) => a.id - b.id);
          setItems(sorted);
          setLoading(false);
          console.log(sorted);
          localStorage.setItem("itemList", JSON.stringify(data));
        });
      } else {
        setItems(JSON.parse(localItems));
        setLoading(false);
      }

      if (!localUser) {
        fetchUser().then((data) => {
          setUnlocked(data[0].unlocked);
          setAccessible(data[0].accessible);
          setUserId(data[0].id);
          let viewUnlocked = data[0].unlocked;
          console.log(viewUnlocked);
          localStorage.setItem("userData", JSON.stringify(data));
        });
      } else {
        const parsedUser = JSON.parse(localUser);
        setUnlocked(parsedUser[0].unlocked);
        setAccessible(parsedUser[0].accessible);
        setUserId(parsedUser[0].id);
      }
    } else {
      console.log("Loading from LocalStorage...");
      const savedItems = JSON.parse(localItems);
      const savedUser = JSON.parse(localUser);

      setItems(savedItems);
      setUnlocked(savedUser[0].unlocked);
      setAccessible(savedUser[0].accessible);
      setUserId(savedUser[0].id);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (items.length === 0 || unlocked.length === 0) return;
    let unlockedOnly = [];
    let tempArray = [];

    items.forEach((item) => {
      if (unlocked.includes(item.id) && !accessible.includes(item.id)) {
        unlockedOnly.push(item.id);
        console.log("check:", unlockedOnly);
      }
    });

    function checkStatus() {
      setItems((prevItems) =>
        prevItems.map((item) => {
          let newItem = { ...item };

          if (unlocked.includes(item.id)) {
            newItem.unlocked = "yes";
          }

          if (
            unlockedOnly.includes(item.id) &&
            ((Array.isArray(item.requires) &&
              item.requires.every((reqId) => accessible.includes(reqId))) ||
              (Array.isArray(item.requires) && item.requires.length === 0))
          ) {
            newItem.accessible = "yes";
            unlockedOnly = unlockedOnly.filter((val) => val !== item.id);
            setAccessible((prev) => [...prev, item.id]);
            tempArray.push(item.id);
            console.log("tempArray: ", tempArray);
            checkStatus();
          }

          if (tempArray.length > 0) {
            accessible.push(tempArray);
            tempArray = [];
            console.log(accessible);
          }

          return newItem;
        })
      );
    }
    checkStatus();
  }, [unlocked, accessible]);

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
      <Header
        unlocked={unlocked}
        setUnlocked={setUnlocked}
        accessible={accessible}
        setAccessible={setAccessible}
        userId={userId}
        setUserId={setUserId}
      />
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

          if (unlocked.includes(item.id)) {
            statusClass = "unlocked";
          }

          if (accessible.includes(item.id)) {
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
