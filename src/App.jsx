import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [isCopied,SetIsCopied] = useState(false);

  const passwordMaker = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz";
    let number = "0123456789"
    let char = "!@#$%^&*()_+="

    if (numberAllowed) str += number
    if (charactersAllowed) str += char

    for (let i = 0; i <=length; i++){
      let randomIndex = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(randomIndex);
    }
    setPassword(pass)

  }, [length, numberAllowed, charactersAllowed, setPassword])

  
  
  const copyToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password).then(()=>{
      SetIsCopied(true)
    })
  }, [password])

  useEffect(()=>{
    passwordMaker();
  },[passwordMaker])

  return (
    <>
      <h1 className="text-4xl text-white text-center my-20">Password Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-600">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" className="outlined-none w-full py-1 px-3 text-lg " readOnly value={password} />
          <button className="outlined-none bg-blue-800 text-white px-3 py-0.5 shrink-0 text-lg" onClick={copyToClipBoard} >{isCopied?"Copied!":"Copy"}</button>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="range" className="cursor-pointer" value={length} min={8} max={100} onChange={(e)=>{setLength(e.target.value)}} />
          <label className="text-lg">Length:{length}</label>
          <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
          <label htmlFor="numberInput" className="text-lg">Number</label>
          <input type="checkbox" id="characterInput" defaultChecked={charactersAllowed} onChange={()=>{setCharactersAllowed((prev)=>!prev)}}/>
          <label htmlFor="characterInput" className="text-lg">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;