import localforage from "localforage";

localforage.config({
  name: "ChanceManMode",
  storeName: "itemList_cache"
});

export async function saveDataset(key, data) {
  await localforage.setItem(key, data);
}

export async function loadDataset(key) {
  return await localforage.getItem(key);
}
