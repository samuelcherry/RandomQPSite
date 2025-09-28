import "./App.css";
import { useState } from "react";
import questItems from "./itemList";

function App() {
  const [filter, setFilter] = useState("all");

  const filteredItems = questItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "locked") return item.unlocked === "no";
    if (filter === "unlocked") return item.unlocked === "yes";

    return true;
  });

  return (
    <>
      <h1> Random QP</h1>
      <div>
        <input className="searchBar"></input>
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
