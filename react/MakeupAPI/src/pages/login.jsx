import React, { useState } from "react";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClearForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const handleLoginNow = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      setTimeout(() => {
        const data = {
          fullName,
          email,
          password,
        };
        console.log(data);
      }, 5000);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    handleClearForm();
  };

  return (
    <>
      <div className="flex justify-center mt-40 p-5">
        <div className=" border-4 border-blue-500 p-3 rounded-2xl">
          <h2 className="text-3xl font-bold text-black mt-3 mx-3">
            <u className="border-b-blue-600">Lo</u>
            <span>gin Page</span>
          </h2>
          <form onSubmit={handleLoginNow} onReset={handleClearForm}>
            <div className="mt-6 flex ">
              <label htmlFor="fullName" className="w-25 ">
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Full Name"
                className="border w-120 rounded-2xl p-1.5"
              />
            </div>
            <div className="mt-6 flex">
              <label htmlFor="email" className="w-25 ">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="border w-120 rounded-2xl p-1.5"
              />
            </div>
            <div className="mt-6 flex gap-7 mb-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="border w-120 rounded-2xl p-1.5"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="border-2 rounded py-1 px-4 text-[18px] font-bold text-blue-800 cursor-pointer hover:bg-[blue] hover:text-white hover:rounded "
              >
                {isLoading ? "Laoding..":"Login Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
