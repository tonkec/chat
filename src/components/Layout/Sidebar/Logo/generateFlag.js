const rainbow = '#ed3833, #f5a640, #fdf851, #3b841e, #2143ef, #992f83';
const ace = 'black, grey, white, purple, purple, purple';
const trans = '#5bcef9, #f3a9b8, white, #f3a9b8, #5bcef9, #5bcef9';
const pan = '#ec428d, #fcd94b, #fcd94b, #43b2f8, #43b2f8, #43b2f8';
const genderqueer = '#b899dd , #b899dd, white, #6b8e3a, #6b8e3a, #6b8e3a';
const enby = '#f7ed4e, white, #9655ca, black, black, black';
const bi = '#d2376d, #d2376d, #704d91, #0036a2, #0036a2, #0036a2';
const lesbian = '#d4312c, #f39753, #ffffff, #d161a2, #a32b61, #a32b61';
export const colors = [
  rainbow,
  ace,
  trans,
  pan,
  genderqueer,
  enby,
  bi,
  lesbian,
];

const generateFlag = () => {
  const index = Math.floor(Math.random() * colors.length);
  return index;
};

export default generateFlag;
