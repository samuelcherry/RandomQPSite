import React from "react";
import { fetchUser } from "../utils/fetchUser";
import updateAccessible from "../utils/addToAccessible";

const Header = ({
  unlocked,
  setUnlocked,
  accessible,
  setAccessible,
  userId,
  setUserId
}) => {
  const handleSave = (e) => {
    console.log("saved");
    updateAccessible(userId, accessible);
  };

  const handleSync = (e) => {
    console.log("synced");
    fetchUser().then((data) => {
      setUnlocked(data[0].unlocked);
      setAccessible(data[0].accessible);
      setUserId(data[0].id);
      let viewUnlocked = data[0].unlocked;
      console.log(viewUnlocked);
      localStorage.setItem("userData", JSON.stringify(data));
    });
  };

  const handleAdmin = (e) => {
    console.log("Admin Mode");
  };

  const handlePublic = (e) => {
    console.log("Public Mode");
  };
  return (
    <div className="headerContainer">
      {" "}
      <h1> Chanceman Mode</h1>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleSync}>Sync</button>
      <button onClick={handleAdmin}>Admin</button>
      <button onClick={handlePublic}>Public</button>
    </div>
  );
};

export default Header;
