import { useEffect, useState } from "react";
import { fetchQuests } from "../utils/fetchQuests";
import { fetchItems } from "../utils/fetchPosts";

const QuestMode = ({
  unlocked,
  setUnlocked,
  accessible,
  setAccessible,
  activeCard,
  setActiveCard
}) => {
  const [questList, setQuestList] = useState([]);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetchQuests().then((questData) => {
      setQuestList(questData);
      fetchItems().then((itemData) => {
        setItemList(itemData);
      });
    });
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
  return (
    <div>
      {questList.map((quest) => (
        <div key={quest.questName}>
          <h3>{quest.questName}</h3>
          <hr />
          <div className="gridContainer">
            {quest.requires.map((req) => (
              <div key={req}>
                {itemList
                  .filter((item) => item.id === req)
                  .map((item) => {
                    console.log("itemList: ", item);
                    console.log("unlocked: ", unlocked);
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
                            <div className="sliderGroup">
                              <div className="sliderTitle">Admin Unlock</div>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={unlocked.includes(item.id)}
                                  onChange={() => handleAdminUnlock(item)}
                                />
                                <span className="slider"></span>
                              </label>
                            </div>
                            <div className="sliderGroup">
                              <div className="sliderTitle">Public Unlock</div>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={unlocked.includes(item.id)}
                                />
                                <span className="slider"></span>
                              </label>
                            </div>
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
  );
};

export default QuestMode;
