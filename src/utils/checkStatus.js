import { fetchUser } from "./fetchUser";
import { fetchItems } from "./fetchPosts";

useEffect(() => {
  fetchItems().then((data) => {
    setItems(data);
    setLoading(false);
  });
  fetchUser().then((data) => {
    setUnlocked(data[0].unlocked);
    setAccessible(data[0].accessible);
  });
}, []);
