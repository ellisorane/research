const date1 = new Date("2022-12-30");
const date2 = new Date("2023-01-02");
const diffTime = date2 - date1;
console.log(diffTime);

const diffDays = diffTime / (1000 * 60 * 60 * 24);
console.log(diffDays, " days");