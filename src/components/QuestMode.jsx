import { useEffect, useState } from "react";
import { fetchQuests } from "../utils/fetchQuests";
import { fetchItems } from "../utils/fetchPosts";
fetchItems;

const QuestMode = () => {
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
                  .map((item) => (
                    <p key={item.id}>{item.title}</p>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestMode;
