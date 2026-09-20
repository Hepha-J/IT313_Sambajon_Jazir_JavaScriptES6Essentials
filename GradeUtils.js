export const computeAverage = (prelim, midterm, final) => {
  return (prelim + midterm + final) / 3;
};

const isPassing = (average) => {
  return average >= 75 ? "PASSING" : "PROBATION";
};

export default isPassing;