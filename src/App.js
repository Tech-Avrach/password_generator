import "bootstrap/dist/css/bootstrap.css";
import { useState, useCallback, useEffect , useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@$!%*?&@$!%*?&";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    
    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);

  const copyPasswordOnClipBord = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  } ,[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div
          className="bg-secondary mt-3 mx-auto"
          id="upperBdy"
          style={{
            width: "40%",
            height: "17vh",
            borderRadius: "20px",
            color: "orange",
          }}
        >
          <h1 className="text-white text-center pt-2">Password Generator</h1>
          <div className="d-flex rounded mb-4 d-flex justify-content-center align-items-center">
            <input
              type="text"
              value={password}
              class="form-control mt-2"
              style={{ outline: "none", width: "80%", height: "50px" ,fontSize:'x-large', color:'orange'}}
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button className="btn btn-primary mt-2" style={{ height: "50px" }} onClick={copyPasswordOnClipBord}>
              Copy
            </button>
          </div>
          <div
            className="d-flex align-items-center"
            style={{
              marginLeft: "37px",
              marginTop: "-13px",

              width: "100%",
            }}
          >
            <div className="d-flex align-items-center" style={{ width: "35%" }}>
              <input
                type="range"
                min={8}
                max={30}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label class="fw-bolder" style={{ marginLeft: "10px" }}>
                length: {length}
              </label>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ marginLeft: "40px" }}
            >
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label class="fw-bolder" style={{ marginLeft: "10px" }}>
                Numbers
              </label>

              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                style={{ marginLeft: "40px" }}
              />
              <label class="fw-bolder" style={{ marginLeft: "10px" }}>
                Character
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
