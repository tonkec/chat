import { rest } from 'msw';

const userFromApi = {
  avatar: 'http://placekitten.com/200/300',
  id: 1,
  firstName: 'antonija',
  lastName: 'v',
  email: 'antonija1023@gmail.com',
  password: 'jadajajad',
  gender: 'female',
  isVerified: true,
  createdAt: '2023-03-07T18:36:51.806Z',
  updatedAt: '2023-03-28T08:19:29.175Z',
  location: 'Zagreb',
};

export const handlersForUserPage = [
  rest.get(`${process.env.REACT_APP_BACKEND_PORT}/users/1`, (req, res, ctx) => {
    return res(
      ctx.set({
        Accept: 'application/json',
        Authorization: `Bearer sometoken`,
      }),
      ctx.status(200),
      ctx.json(userFromApi),
    );
  }),
  rest.get(
    `${process.env.REACT_APP_BACKEND_PORT}/followers/1`,
    (req, res, ctx) => {
      return res(
        ctx.set({
          Accept: 'application/json',
          Authorization: `Bearer sometoken`,
        }),
        ctx.status(200),
        ctx.json({
          followers: [],
        }),
      );
    },
  ),
  rest.post(
    `${process.env.REACT_APP_BACKEND_PORT}/followers/add`,
    (req, res, ctx) => {
      return res(
        ctx.set({
          Accept: 'application/json',
          Authorization: `Bearer sometoken`,
        }),
        ctx.status(200),
        ctx.json({
          follower: [
            {
              userId: 1,
              id: 2,
              firstName: 'antonija',
              lastName: 'v',
              avatar: 'http://placekitten.com/200/300',
            },
          ],
        }),
      );
    },
  ),
  rest.post(
    `${process.env.REACT_APP_BACKEND_PORT}/followers/remove`,
    (req, res, ctx) => {
      return res(
        ctx.set({
          Accept: 'application/json',
          Authorization: `Bearer sometoken`,
        }),
        ctx.status(200),
        ctx.json({
          followers: [],
        }),
      );
    },
  ),
  rest.get(
    `${process.env.REACT_APP_BACKEND_PORT}/uploads/avatar/1`,
    (req, res, ctx) => {
      return res(
        ctx.set({
          Accept: 'application/json',
          Authorization: `Bearer sometoken`,
        }),
        ctx.status(200),
        ctx.json({
          images: [
            {
              id: 1,
              url: 'http://placekitten.com/200/300',
              userId: 1,
              createdAt: '2021-03-28T08:19:29.175Z',
              updatedAt: '2021-03-28T08:19:29.175Z',
              profilePhoto: true,
              description: 'some description',
              name: 'some name',
            },
            {
              id: 2,
              url: 'http://placekitten.com/200/200',
              userId: 1,
              createdAt: '2021-03-28T08:19:29.175Z',
              updatedAt: '2021-03-28T08:19:29.175Z',
              profilePhoto: null,
              description: 'some other description',
              name: 'some other name',
            },
          ],
        }),
      );
    },
  ),
];

export const handlersForProfilePage = [
  rest.post(
    `${process.env.REACT_APP_BACKEND_PORT}/uploads/avatar`,
    (req, res, ctx) => {
      return res(
        ctx.set({
          Accept: 'application/json',
          Authorization: `Bearer sometoken`,
        }),
        ctx.status(200),
        ctx.json({ message: 'Upload successful' }),
      );
    },
  ),
];
