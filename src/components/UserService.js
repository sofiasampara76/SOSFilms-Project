 export async function toggleFavourite(item, type) {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) return;

  const user = JSON.parse(userRaw);
  const userId = user.id;
  if (!userId) return;

  const res = await fetch(`http://localhost:3005/users/${userId}`);
  const currentUser = await res.json();

  const listKey = type === "films" ? "favouriteFilms" : "favouriteSeries";
  const currentList = currentUser[listKey] || [];

  const isAlreadyLiked = currentList.some((fav) => fav.id === item.id);

  const updatedList = isAlreadyLiked
    ? currentList.filter((fav) => fav.id !== item.id)
    : [...currentList, item];

  await fetch(`http://localhost:3005/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [listKey]: updatedList }),
  });

  const latestRes = await fetch(`http://localhost:3005/users/${userId}`);
  const latestUser = await latestRes.json();

  localStorage.setItem("user", JSON.stringify(latestUser));
}
