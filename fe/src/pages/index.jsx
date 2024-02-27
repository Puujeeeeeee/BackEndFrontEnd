import React, { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/Components/Hero";
export default function Home() {
  const API_ENDPOINT = "http://localhost:3002";
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [gender, setGender] = useState("");

  const isSubmtDisable = name === "" || age === "" || gender === "";

  const handleEdit = (id, name, age, gender) => {
   
    setEditedName(name);
    setEditedAge(age);
    setEditedGender(gender);

  
  };
 
  const createData = async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, gender }),
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_ENDPOINT}${id}`, {
      
        method: "DELETE",
        headers: {
       
          "Content-Type": "application/json",
        },
      
      });
      
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const sendId = async (id) => {
    try {
      await handleDelete(id);
    } catch (error) {
      console.error("Error sending ID:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createData();
  };
  async function updateUser() {
    let item = { newName, newAge, newId };
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item), // corrected syntax: body should be an object
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }
  const addData = async () => {
    await createData();
    setName(""), setAge(""), setGender("");
  };

  return (
    <div>
      {/* <Hero> */}
      <div className="flex justify-center items-center bg-gray-500 ">
        <div className="w-[1000px] h-[1560px] border border-black bg-gray-300 flex flex-col items-center justify-evenly ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col  w-[850px] h-[200px] shadow-xl border border-black gap-[20px] p-[30px] rounded-md items-center">
              <h1 className="text-2xl">FORM</h1>
              <div className="gap-[30px] flex ">
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
                <input
                  className="border rounded-md border-black p-2"
                  type="text"
                  placeholder="Enter your gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                />
              </div>

              <button
                disabled={isSubmtDisable}
                type="submit"
                className="w-[80px] bg-blue-400 text-white h-[30px] border rounded-md hover:scale-95 hover:duration-500 hover:blue-500 hover:text-black duration-500"
              >
                SUBMIT
              </button>
            </div>
          </form>

          <div className="w-[850px] h-[1000px] border border-black  gap-[10px] rounded-md shadow-xl ">
            <div className="flex flex-col gap-[15px]">
              {/* user information */}
              <div className="gap-[10px] flex justify-center items-center  flex-col">
                <div className="flex w-[800px] h-[50px] border-4 border-white bg-blue-400 shadow-xl rounded-lg justify-center items-center ">
                  <p className="border-4 rounded-md border-white p-2 text-white">
                    USER'S INFORMATION
                  </p>
                </div>
                <div className=" flex w-[796px] h-[100px]   bg-blue-400 border-4 border-white rounded-lg shadow-xl justify-center items-center">
                  <div className="items-center flex justify-center  gap-[12px] text-white ">
                    <p className="items-center flex justify-center w-[100px] h-[80px]  border-4 border-white bg-red-300 text-2xl font-bold">
                      №
                    </p>
                    <p className="items-center flex justify-center w-[220px] h-[80px] border-4 border-white bg-red-300 text-2xl font-bold">
                      NAME
                    </p>
                    <p className="  items-center flex justify-center w-[220px] h-[80px] border-4 border-white bg-red-300 text-2xl font-bold">
                      AGE
                    </p>
                    <p className="w-[220px] h-[80px] items-center flex justify-center border-4 border-white bg-red-300 text-2xl font-bold">
                      GENDER
                    </p>
                  </div>
                </div>
              </div>
              {/* data avj bgaa heseg */}

              <div className="flex items-center justify-center ">
                <div className="container w-[810px] h-[850px] border-white  overflow-x-scroll border-4 ">
                  {data.map((element) => (
                    <div key={element.id} className="flex flex-col ">
                      <div className=" flex w-[800px] h-[150px]   bg-blue-400 border-2  border-black flex-col  gap-[20px] rounded-2xl shadow-xl justify-center items-center">
                        <div className="items-center flex justify-center  gap-[12px] text-white p-2">
                          <p className="items-center flex justify-center w-[100px] h-[50px]  border-2 bg-red-300">
                            №
                          </p>
                          <p className="items-center flex justify-center w-[220px] h-[50px]  border-2 bg-red-300">
                            {element.name}
                          </p>
                          <p className="  items-center flex justify-center w-[220px] h-[50px]  border-2 bg-red-300">
                            {element.age}
                          </p>
                          <p className="w-[220px] h-[50px] items-center flex justify-center border-2 bg-red-300">
                            {element.gender}
                          </p>
                        </div>
                        <div className="flex gap-[50px]">
                          <button
                            className="text-center w-[130px] shadow-xl text-white rounded-md hover:bg-slate-200 hover:duration-500 hover:text-black h-[30px] border-2"
                            onClick={() => sendId(element.id)}
                          >
                            DELETE
                          </button>

                          <button
                            className="text-center w-[130px] text-white shadow-xl rounded-md hover:bg-slate-200  hover:duration-500 hover:text-black h-[30px] border-2"
                            onClick={() => handleEdit(element)}
                          >
                            EDIT
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Hero> */}
    </div>
  );
}
