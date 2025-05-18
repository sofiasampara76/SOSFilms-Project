import React, { useState, useEffect } from "react";
import { toggleFavourite } from "./UserService";

export const FavouriteButton = ({ item, type }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const list = type === "shows" ? user.favouriteSeries : user.favouriteFilms;
    setIsLiked(list?.some((f) => f.id === item.id));
  }, [item.id, type]);

  const handleToggle = async () => {
    await toggleFavourite(item, type);
    setIsLiked((prev) => !prev);
  };

  return (
    <button className="heart-btn" onClick={handleToggle}>
      <img
        src={isLiked ? "/heart-btn-filled.svg" : "/heart-btn.svg"}
        alt="Favourite button"
      />
    </button>
  );
};

export default FavouriteButton;
