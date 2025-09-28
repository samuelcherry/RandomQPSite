import "./App.css";
import questItems from "./itemList";

function App() {
  return (
    <>
      <h1> Random QP</h1>
      <div>
        <input className="searchBar"></input>
        <button>Search</button>
      </div>
      <div>
        <button>unlocked</button>
        <button>locked</button>
      </div>
      <div className="gridContainer">
        {questItems.map((item) => (
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
