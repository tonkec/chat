import api from "./api";

const PhotoLikesService = {
  getAllLikes: (photoId) => {
    return api
      .get(`/likes/all-likes/${photoId}`)
      .then((res) => {
        return res;
      })
      .catch((e) => e);
  },
  like: (data) => {
    return api
      .post("/likes/upvote", data)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw e;
      });
  },
  dislike: (data) => {
    return api
      .post("/likes/downvote", data)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw e;
      });
  },
};

export default PhotoLikesService;
