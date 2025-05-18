export async function toggleFavourite(item, type) {
    const userRaw = localStorage.getItem("user");
    if (!userRaw) return;
  
    const user = JSON.parse(userRaw);
    const userId = user.id;
  
    const res = await fetch(`http://localhost:3005/users/${userId}`);
    const currentUser = await res.json();
  
    const listKey = type === "film" ? "favouriteFilms" : "favouriteSeries";
    const isAlreadyLiked = currentUser[listKey].some(
      (fav) => fav.id === item.id
    );
  
    const updatedList = isAlreadyLiked
      ? currentUser[listKey].filter((fav) => fav.id !== item.id)
      : [...currentUser[listKey], item];
  
    const updatedUser = { ...currentUser, [listKey]: updatedList };
  
    await fetch(`http://localhost:3005/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    });
  
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
  