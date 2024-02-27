import express from "express";
import cors from "cors";
import fs from "fs";

const port = 3002;
const app = express();
app.use(express.json());
app.use(cors());

let arr = [];
let newArr = [];
try {
  const data = fs.readFileSync("db.json");
  arr = JSON.parse(data);
} catch (error) {
  console.log("Error reading db.json:", error);
}

app.post("/", (req, res) => {
  arr.push(req.body);
  fs.writeFileSync("db.json", JSON.stringify(arr));
  res.send(arr);
});

app.get("/", (req, res) => {
  res.send(arr);
});

app.delete("/:id", (req, res) => {
  const { id } = req.query.id;
  arr = arr.filter((item) => item.id !== parseInt(id));
  arr.push(req.body);
  fs.writeFileSync("db.json", JSON.stringify(arr));
  res.send(arr);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// app.delete("/", (req, res) => {
//   const { id } = req.body;
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].id === id) {
//       arr.splice(i, 1);
//       break;
//     }
//   }

// import express from "express";
// import cors from "cors";
// import fs from "fs";

// const port = 3002;
// const app = express();

// app.use(express.json());
// app.use(cors());

// let arr = [];

// const rawData = fs.readFileSync("db.json");
// arr = JSON.parse(rawData);

// app.post("/", (req, res) => {
//   arr.push(req.body);

//   fs.writeFileSync("db.json", JSON.stringify(arr));
//   res.send(arr);
// });

// });

// import express from "express";
// import cors from "cors";
// import fs from "fs";

// const port = 3002;

// const app = express();
// app.use(express.json());
// app.use(cors());

// let arr = [];

// app.post("/", (req, res) => {
//   arr.push(req.body);
//   console.log(arr);
//   fs.writeFileSync("db.json", JSON.stringify(arr));
//   res.send(arr);
// });
