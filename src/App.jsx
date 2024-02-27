import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNums, setIsNums] = useState(false);
  const [isSpecialChars, setIsSpecialChars] = useState(false);

  const passInputRef = useRef(null);

  const passCopyToClipboard = useCallback(() => {
    passInputRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(
    (length, isNums, isSpecialChars) => {
      console.log("password generating");

      let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (isNums) {
        chars += "1234567890";
      }
      if (isSpecialChars) {
        chars += "!@#$%^&*()_+";
      }

      let pass = "";

      for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setPassword(pass);
    },
    [length, isNums, isSpecialChars, setPassword]
  );

  useEffect(() => {
    passwordGenerator(length, isNums, isSpecialChars, passwordGenerator);
  }, [length, isNums, isSpecialChars]);

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Password Generator</h1>
      <div className="container bg-blue-900 w-1/2 m-auto px-4 py-2 mt-2">
        <div className="mb-2 flex">
          <div className="" style={{width:"100%"}}>
            <input
              type="text"
              name="password"
              className="text-black outline-0 px-2 py-1"
              value={password}
              ref={passInputRef}
              style={{width:"100%"}}
              readOnly
            />
          </div>
          <div>
            <button
              className="bg-green-600 px-2 hover:bg-green-800 py-1"
              onClick={passCopyToClipboard}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="flex">
          <div className="pr-4">
            <input
              type="range"
              name="length"
              min={8}
              max={30}
              step={1}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">&nbsp; Length ({length})</label>
          </div>
          <div className="px-4">
            <input
              type="checkbox"
              name="numbers"
              onChange={(e) => setIsNums(e.target.checked)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="characters"
              onChange={(e) => setIsSpecialChars(e.target.checked)}
            />
            <label htmlFor="numbers">Characters</label>
          </div>
        </div>
      </div>
      <footer className="text-center mt-4 py-2 bg-slate-900">
        <p className="text-sm">Made By <a href="https://github.com/anand-jaiswal-IN"> @its_anand_aj</a>

        </p>
      </footer>
    </>
  );
}

export default App;
