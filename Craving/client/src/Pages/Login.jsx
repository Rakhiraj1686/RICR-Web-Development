import React, { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClearForm = () => {
    setUserName("");
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
          userName,
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
      <div className="min-h-screen bg-linear-to-br  from-(--color-background)  to-indigo-100 py-6 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header  */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Login Now</h1>
          </div>

          {/* From Container  */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden ">
            <form
              onSubmit={handleLoginNow}
              className="p-8"
            >
              <div className="mb-5">
                <div className="space-y-4 ">
                  <div>
                    <input
                      type="text"
                      name="userName"
                      placeholder="User Name"
                      value={userName}
                      disabled={isLoading}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition mb-5 disabled:cursor-not-allowed"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition mb-5 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <hr className="border-gray-200 mt-4" />

                {/* Login Now  */}
                <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-linear-to-r bg-(--color secondary)  font-bold py-4 px-6 rounded-lg bg-(--color-secondary) hover:-text-(--color-text)  transition duration-300 transform hover:scale-105 shadow-lg disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Laoding..":"Login Now"}
                  </button>
                </div>
                <div className="flex justify-between mt-5">
                  <p>Didn't Have Account ?</p>
                  <p>Register Now</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
