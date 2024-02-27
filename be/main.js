import express from "express";
import cors from "cors";
import fs from "fs";

const port = 3002;
const app = express();
app.use(express.json());
app.use(cors());

let arr = [];

try {
  const data = fs.readFileSync("db.json");
  arr = JSON.parse(data);
} catch (error) {
  console.error("Error reading db.json:", error);
}

app.post("/", (req, res) => {
  arr.push(req.body);
  fs.writeFileSync("db.json", JSON.stringify(arr));
  res.send(arr);
});

app.get("/", (req, res) => {
  res.send(arr);
});
app.delete("/:name", (req, res) => {
  const name = req.params.name;

  try {
    let data = fs.readFileSync("db.json");
    let jsonData = JSON.parse(data);

    // Filter the data to exclude the item with the specified name
    let filteredData = jsonData.filter((item) => item.name !== name);

    fs.writeFileSync("db.json", JSON.stringify(filteredData));
    res.json(filteredData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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

// app.delete("/", (req, res) => {
//   const { id } = req.body;
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].id === id) {
//       arr.splice(i, 1);
//       break;
//     }
//   }

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
