import React from "react";

const Header = () => {
  const handleSave = (e) => {
    console.log("saved");
    console.log(unlocked);
  };

  const handleSync = (e) => {
    console.log("synced");
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
