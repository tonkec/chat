import { useEffect, useState, useContext } from "react";
import PhotoLikesService from "../../../services/photolikesService";

const PhotoLikes = ({ photo, data, setData }) => {
  useEffect(() => {
    PhotoLikesService.getAllLikes(photo.id)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => e);
  }, []);
  return <p>{data.length} lajkova</p>;
};

export default PhotoLikes;
