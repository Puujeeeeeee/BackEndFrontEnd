import React, { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3002");

      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createData = async () => {
    try {
      const response = await fetch("http://localhost:3002", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      fetchData(); // Refresh data after successful creation
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createData();
    await handleDelete();
  };

  return (
    <div className="flex justify-center items-center flex-col gap-[20px]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-[300px] h-[300px] shadow-xl border border-black gap-[20px] p-[30px] rounded-md items-center">
          <h1 className="text-2xl">FORM</h1>
          <input
            className="border rounded-md border-black p-2"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="border rounded-md border-black p-2"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
          <button
            type="submit"
            className="w-[80px] bg-blue-500 text-white h-[30px] border rounded-md"
          >
            SUBMIT
          </button>
        </div>
      </form>
      <div className="w-[600px] h-[500px] border border-black overflow-x-scroll gap-[10px] rounded-md shadow-xl">
        <div className="flex w-[605px] h-[50px] border border-black bg-red-400 justify-center items-center">
          <p className="border rounded-md border-black p-2 text-white">
            USER'S INFORMATION
          </p>
        </div>
        {data.map((element) => (
          <div className="flex items-center justify-center" key={element.id}>
            <div className="flex flex-col gap-[30px]">
              <div className="w-[350px] shadow-2xl h-[120px] gap-[30px] rounded-md border border-black">
                <div className="flex gap-[30px]">
                  <li className="px-5 py-2">Name: {element.name}</li>
                </div>
                <div>
                  <li className="px-5 py-2">Age: {element.age}</li>
                </div>
                <div className="flex justify-evenly py-[-10px]">
                  <button
                    className="text-center w-[130px] shadow-xl rounded-md hover:bg-slate-200 hover:duration-300 h-[30px] border border-black"
                    onClick={() => handleDelete(element.id)}
                  >
                    DELETE
                  </button>
                  <button className="text-center w-[130px] shadow-xl rounded-md hover:bg-slate-200 hover:duration-300 h-[30px] border border-black">
                    EDIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
