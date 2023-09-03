import api from './api';

const PhotoLikesService = {
  getAllLikes: (photoId) => {
    return api
      .get(`/likes/all-likes/${photoId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  },
  like: (data) => {
    return api
      .post('/likes/upvote', data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  },
  dislike: (data) => {
    return api
      .post('/likes/downvote', data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  },
};

export default PhotoLikesService;
