function getArr(id) {
  arrJson = localStorage.getItem(id);
  return JSON.parse(arrJson);
}
function saveTolocalStorage(id, data) {
  localStorage.setItem(id, JSON.stringify(data));
}
if (getArr("todo") != undefined) tasksList = getArr("todo");
