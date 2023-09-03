import api from './api';

const PhotosService = {
  getPhotos: (userId) => {
    return api
      .get(`/uploads/avatar/${userId}`)
      .then((response) => {
        const allImages = response.data.images.filter(
          (image) => image.isProfilePhoto !== true
        );
        const profilePhoto = response.data.images.filter(
          (image) => image.isProfilePhoto === true
        );

        return {
          profilePhoto,
          allImages,
        };
      })
      .catch((e) => {
        console.log(e);
      });
  },
};

export default PhotosService;
