import { log } from "console";
import { text } from "express";
import fs from "fs";

// new folder
// fs.mkdir("test", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("amjilttai");
//   }
// });

// New file
fs.writeFileSync("texfffft.json", "Puujee BNa", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("amjiltai uuslee");
  }
});

//fs.write zaaaval callBack function bichne
// fs.writeFile("textf.txt", "fdfds", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("amjjlttai uuslee");
//   }
// });

// const app = fs.readFileSync("text.txt");
// console.log(app.toString());

fs.readFile("texffffft.txt", (err, data) => console.log(data.toString()));
// const newArr = [];
const data = { age: 18, name: "rew" };
fs.writeFileSync("db.json", JSON.stringify(data));
// const stringify = JSON.stringify(data);
// const parse = JSON.parse(stringify);
// console.log(stringify, "===", parse);
app.post("/", (res, req) => {
  console.log(req.body);
  newArr.push(req.body);
  res.send(newArr);
});
