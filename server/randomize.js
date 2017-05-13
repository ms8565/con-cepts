
// get rid of non-unique values in array
const unique = (e, index, self) => self.indexOf(e) === index;

const randomizeArray = (inAr) => {
  let randAr = [];
  const temp = [];
    // loop until there is a random number for every round
  while (randAr.length < inAr.length) {
    for (let i = 0; i < inAr.length; i++) {
      randAr[i] = Math.floor(Math.random() * (inAr.length));
    }
    // make sure they're unique
    randAr = randAr.filter(unique);
  }
  for (let i = 0; i < inAr.length; i++) {
    temp[i] = inAr[randAr[i]];
  }
  return temp;
};

module.exports.randomizeArray = randomizeArray;
