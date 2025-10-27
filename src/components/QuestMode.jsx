import { useEffect, useState } from "react";
import { fetchQuests } from "../utils/fetchQuests";
import { fetchItems } from "../utils/fetchPosts";

const QuestMode = ({
  unlocked,
  setUnlocked,
  accessible,
  setAccessible,
  activeCard,
  setActiveCard,
  items
}) => {
  const [questList, setQuestList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchQuests().then((questData) => {
      setQuestList(questData);
    });
    console.log("items", items);
  }, []);

  const handleAdminUnlock = (item) => {
    if (unlocked.includes(item.id)) {
      let newUnlocked = unlocked.filter((val) => val !== item.id);
      setUnlocked(newUnlocked);
      let newAccessible = accessible.filter((val) => val !== item.id);
      setAccessible(newAccessible);
    } else {
      let newUnlocked = [...unlocked, item.id];
      setUnlocked(newUnlocked);
    }
  };

  const filteredQuests = questList.filter((quest) => {
    if (!search.trim()) return true;

    const matchingItems = items.filter((item) =>
      item.title.toLowerCase().includes(search.toLocaleLowerCase())
    );

    const questHasMatch = quest.requires.some((reqId) =>
      matchingItems.some((item) => item.id === reqId)
    );

    const questNameMatch = quest.questName
      .toLowerCase()
      .includes(search.toLowerCase());

    return questHasMatch || questNameMatch;
  });
  return (
    <div>
      <div className="searchContainer">
        <input
          className="searchBar"
          type="text"
          placeholder="Search by item or quest..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button>Search</button>
      </div>
      <div>
        {filteredQuests.map((quest) => (
          <div key={quest.questName}>
            <h3>{quest.questName}</h3>
            <hr />
            <div className="gridContainer">
              {quest.requires.map((req) => (
                <div key={req}>
                  {items
                    .filter((item) => item.id === req)
                    .map((item) => {
                      let statusClass = "locked";
                      if (unlocked?.includes(item.id)) statusClass = "unlocked";
                      if (accessible?.includes(item.id))
                        statusClass = "accessible";
                      const isActive = activeCard === item.id;
                      return (
                        <div key={item.id} className="cardWrapper">
                          <div
                            className={`card ${statusClass}`}
                            onClick={() =>
                              setActiveCard(isActive ? null : item.id)
                            }
                          >
                            <img
                              src={item.icon}
                              alt={item.title}
                              title={item.title}
                            />
                          </div>
                          {isActive ? (
                            <div className="smallCardActive">
                              {/* <button onClick={handleItemPage}>
                                Item Page
                              </button> */}
                              <div className="sliderGroup">
                                <div className="sliderTitle">Unlock</div>
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={unlocked.includes(item.id)}
                                    onChange={() => handleAdminUnlock(item)}
                                  />
                                  <span className="slider"></span>
                                </label>
                              </div>
                              {/* <div className="sliderGroup">
                              <div className="sliderTitle">Public Unlock</div>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={unlocked.includes(item.id)}
                                />
                                <span className="slider"></span>
                              </label>
                            </div> */}
                            </div>
                          ) : (
                            <div className="smallCardInactive"></div>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestMode;
