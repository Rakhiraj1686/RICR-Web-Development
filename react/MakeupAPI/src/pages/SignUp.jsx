import React, { useState } from "react";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [religion,setReligion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClearForm = () => {
    setFullName("");
    setEmail("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setReligion("");
  };

  const handleSignUp = async (e) => {
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
          userName,
          password,
          confirmPassword,
          religion,
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
      <div className="flex justify-center mt-30 ">
        <div className=" border-4 border-amber-950 p-3 rounded-2xl">
          <p className="text-4xl text-center font-bold">
            <u>Si</u>
            <span>gn Up</span>
          </p>
          <form onSubmit={handleSignUp} onReset={handleClearForm}>
            <div className="mt-6 flex">
              <label htmlFor="fullName" className="w-25">
                Full Name :
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Name"
                className="border w-120 rounded-2xl p-1.5 "
                required
              />
            </div>
            <div className="mt-6 flex">
              <label htmlFor="email" className="w-25">
                Email :
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="border w-120 rounded-2xl p-1.5"
                required
              />
            </div>

            <div className="mt-6 flex">
              <label htmlFor="religion" className="w-25">
                Religion :
              </label>
              <select name="religion" id="religion" onChange={handleSignUp} className="border w-120 rounded-2xl p-1.5">
                <option value="">--Select Religion--</option>
                <option value="islam">Islam</option>
                <option value="hinduism">Hinduism</option>
                <option value="christian">Christian</option>
              </select>
            </div>

            <div className="mt-6 flex">
              <label htmlFor="userName" className="w-25">
                User Name :
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your User Name"
                className="border w-120 rounded-2xl p-1.5"
                required
              />
            </div>
            <div className="mt-6 flex">
              <label htmlFor="password" className="w-25">
                Password :
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="border w-120 rounded-2xl p-1.5"
                required
              />
            </div>
            <div className="mt-6 flex">
              <label htmlFor="confirmPassword" className="w-25">
                Confirm Password :
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your Password"
                className="border w-120 rounded-2xl p-1.5"
                required
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="border-2 rounded py-1 px-4 text-[18px] font-bold text-blue-800 cursor-pointer hover:bg-[blue] hover:text-white hover:rounded "
              >
                {isLoading ? "Laoding.." : "SignUp Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
