import updateAccessible from "../utils/addToAccessible";

const Header = ({ unlocked, userId, search, setSearch, setAuthToken }) => {
  const handleSave = (e) => {
    console.log("saved");
    updateAccessible(userId, unlocked);
  };

  const handleLogOut = (e) => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
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
        {/* <button onClick={handleLogOut}>Log Out</button> */}
        <h1> Chanceman Mode</h1>
        {/* <button onClick={handleAdmin}>Admin</button>
        <button onClick={handlePublic}>Public</button> */}
      </div>
    </div>
  );
};

export default Header;
