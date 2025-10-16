import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { fetchItems } from "./utils/fetchPosts";
import { fetchUser } from "./utils/fetchUser";
import QuestMode from "./components/questMode";
import Login from "./components/Login";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState([]);
  const [accessible, setAccessible] = useState([]);
  const [userId, setUserId] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [LockedValue, setLockedValue] = useState("True");

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
          localStorage.setItem("userData", JSON.stringify(data));
        });
      } else {
        const parsedUser = JSON.parse(localUser);
        setUnlocked(
          Array.isArray(data[0].unlocked)
            ? data[0].unlocked
            : JSON.parse(data[0].unlocked || "[]")
        );
        setAccessible(
          Array.isArray(data[0].accessible)
            ? data[0].accessible
            : JSON.parse(data[0].accessible || "[]")
        );
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

    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (items.length === 0 || unlocked.length === 0) return;

    let newAccessible = [...accessible];
    let changed = true;

    while (changed) {
      changed = false;

      items.forEach((item) => {
        const isUnlocked = unlocked.includes(item.id);
        const hasNoRequirements =
          Array.isArray(item.requires) && item.requires.length === 0;
        const allRequirementsMet =
          Array.isArray(item.requires) &&
          item.requires.every((reqId) => newAccessible.includes(reqId));

        const shouldBeAccessible =
          isUnlocked && (hasNoRequirements || allRequirementsMet);
        const isCurrentlyAccessible = newAccessible.includes(item.id);

        // Add if it should be accessible but isn't yet
        if (shouldBeAccessible && !isCurrentlyAccessible) {
          newAccessible.push(item.id);
          changed = true;
        }

        // Remove if it shouldn’t be accessible but currently is
        if (!shouldBeAccessible && isCurrentlyAccessible) {
          newAccessible = newAccessible.filter((id) => id !== item.id);
          changed = true;
        }
      });
    }

    // Only update if there was an actual change
    if (JSON.stringify(newAccessible) !== JSON.stringify(accessible)) {
      setAccessible(newAccessible);
    }
  }, [unlocked, items]);

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

  console.log("App.js unlocked: ", unlocked);

  return (
    <div className="mainContainer">
      <Header
        unlocked={unlocked}
        setUnlocked={setUnlocked}
        accessible={accessible}
        setAccessible={setAccessible}
        userId={userId}
        setUserId={setUserId}
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />
      <Sidebar />
      {/* Filter buttons */}

      <div className="mainContent">
        <QuestMode
          unlocked={unlocked}
          setUnlocked={setUnlocked}
          accessible={accessible}
          setAccessible={setAccessible}
          userId={userId}
          setUserId={setUserId}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
      </div>
    </div>
  );
}

export default App;
