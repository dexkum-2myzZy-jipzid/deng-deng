export function secondsToMmSs(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function storeInLocalStorage(type, id) {
  let userJson = localStorage.getItem("duolinggo_user");
  let user = null;
  if (userJson === null) {
    user = {
      userId: Math.random().toString(),
    };
  } else {
    user = JSON.parse(userJson);
  }
  let typeArray = user[type];
  if (typeArray !== undefined) {
    user[type] = [...typeArray, id];
  } else {
    user[type] = [id];
  }

  localStorage.setItem("duolinggo_user", JSON.stringify(user));
}
