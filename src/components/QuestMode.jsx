import { useEffect, useState } from "react";
import { fetchQuests } from "../utils/fetchQuests";
import { fetchItems } from "../utils/fetchPosts";
import { fetchUser } from "../utils/fetchUser";
fetchItems;

const QuestMode = ({ unlocked, setUnlocked, accessible }) => {
  const [questList, setQuestList] = useState([]);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetchQuests().then((questData) => {
      setQuestList(questData);
      fetchItems().then((itemData) => {
        setItemList(itemData);
      });
    });
    fetchUser().then((userData) => {
      setUnlocked(userData.unlocked);
    });
  }, []);

  return (
    <div>
      {questList.map((quest) => (
        <div key={quest.questName}>
          <h3>{quest.questName}</h3>
          <hr />
          <div>
            {quest.requires.map((req) => (
              <div key={req}>
                {itemList
                  .filter((item) => item.id === req)
                  .map((item) => {
                    console.log(item);
                    console.log(unlocked);
                    let statusClass = "locked";
                    if (unlocked.includes(item.id)) statusClass = "unlocked";
                    if (accessible.includes(item.id))
                      statusClass = "accessible";
                    return (
                      <div key={item.id} className="cardWrapper">
                        <div className={`card ${statusClass}`}>
                          <img
                            src={item.icon}
                            alt={item.title}
                            title={item.title}
                          />
                        </div>
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
