import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { fetchItems } from "./utils/fetchPosts";
import { fetchUser } from "./utils/fetchUser";
import QuestMode from "./components/questMode";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import { saveDataset, loadDataset } from "./utils/saveDataset";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState([]);
  const [accessible, setAccessible] = useState([]);
  const [userId, setUserId] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("authToken");
      if (token) setAuthToken(token);

      const cachedItems = await loadDataset("itemList");
      const cachedUser = localStorage.getItem("userData");

      if (cachedItems) {
        console.log("Loaded items from cache");
        setItems(cachedItems);
      } else {
        console.log("Fetching items from Supabase...");
        const data = await fetchItems();
        const sorted = [...data].sort((a, b) => a.id - b.id);
        setItems(sorted);
        await saveDataset("itemList", sorted);
      }
      if (cachedUser) {
        const parsedUser = JSON.parse(cachedUser);
        setUnlocked(parsedUser[0].unlocked);
        setAccessible(parsedUser[0].accessible);
        setUserId(parsedUser[0].id);
      } else {
        console.log("fetching user from Supabase...");
        const data = await fetchUser();
        setUnlocked(data[0].unlocked);
        setAccessible(data[0].accessible);
        setUserId(data[0].id);
        localStorage.setItem("userData", JSON.stringify(data));
      }
      setLoading(false);
      console.log("cache: ", cachedItems);
    })();
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

  if (!authToken) {
    return (
      <Routes>
        <Route path="/" element={<Login setAuthToken={setAuthToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

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
        setAuthToken={setAuthToken}
      />
      {/* <Sidebar /> */}

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
          items={items}
        />
      </div>
    </div>
  );
}

export default App;
