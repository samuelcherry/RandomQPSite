import React from "react";
import { fetchUser } from "../utils/fetchUser";
import updateAccessible from "../utils/addToAccessible";

const Header = ({
  unlocked,
  setUnlocked,
  accessible,
  setAccessible,
  userId,
  setUserId,
  search,
  setSearch,
  filter,
  setFilter
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
      <div className="headerTitle">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleSync}>Sync</button>
        <h1> Chanceman Mode</h1>
        <button onClick={handleAdmin}>Admin</button>
        <button onClick={handlePublic}>Public</button>
      </div>
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
      <div className="filterContainer">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("unlocked")}>Unlocked</button>
        <button onClick={() => setFilter("locked")}>Locked</button>
      </div>
    </div>
  );
};

export default Header;
