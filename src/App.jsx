// import { useState,useCallback,useEffect,useRef} from 'react'
// import './App.css'

// function App() {
//   const [length,setLength] = useState(8)
//   const [numberAllowed,setNumerAllowed]=useState(false);
//   const [charAllowed,setCharAllowed]=useState(false);
//   const [password,setPassword]=useState("");
//   const [strength,setStrength]=useState("weak");
//   const [darkMode,setDarkMode]=useState(false);
//   const [passwordList,setPasswordList]=useState([]);

//   //useRef
//   const passwordRef=useRef(null)

//   const passwordGenerator=useCallback(()=>{
//     let pass=""
//     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz"

//     if(numberAllowed) str+="0123456789";
//     if(charAllowed) str+="~!@#$%&*_+=[]{}`"

//     for(let i=1;i<=length;i++)
//     {
//       let char=Math.floor(Math.random()*str.length+1)
//       pass += str.charAt(char);
//     }
//     setPassword(pass)

//     //Determine the passoword Strength
//     let strengthlevel="weak";
//     if(length>12 && numberAllowed && charAllowed)
//     {
//       strengthlevel="Strong";
//     }
//     else if(length>8 && numberAllowed || charAllowed)
//     {
//       strengthlevel="Medium"
//     }
//     setStrength(strengthlevel);

//   },[length,numberAllowed,charAllowed,setPassword])


//   const copyPasswordToClipboard=useCallback(()=>{
//     passwordRef.current?.select();
//     passwordRef.current?.setSelectionRange(0,999);
//   window.navigator.clipboard.writeText(password)
//   },[password]);

//   //multiplepasswordgenerator
//   const generateMultiplePasswords=()=>{
//     let newPasswords=[];
//     for(let i=0;i<5;i++)
//     {
//       let tempPass="";
//       let str="ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz";
//       if(numberAllowed) str +="0123456789";
//       if(charAllowed) str += "`~!@#$%&*()-_+=[]{}?<>,";
//       for(let j=0;j<length;j++)
//       {
//         let char= Math.floor(Math.random()*str.length);
//         tempPass +=str.charAt(char);

//       }
//       newPasswords.push(tempPass);
      
//     }
//     setPasswordList(newPasswords)
//   }


// useEffect(()=>{passwordGenerator()},[length,charAllowed,numberAllowed,passwordGenerator])
//   return (
   

// <div className={`w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 ${darkMode ?' bg-gray-700 text-white' :'bg-gray-100 text-black' }`}>
//       <h1 className='text-white text-center my-3'
//       style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif " }} >Password generator</h1>
//       <button className='mb-3 px-3 py-1 rounded bg-blue-500 text-white' onClick={()=>setDarkMode(!darkMode)}>Toggle Dark mode</button>
//     <div className="flex shadow rounded-lg overflow-hidden mb-4">
//         <input 
//         type="text" 
//         value={password}
//         className='outline-none w-full py-1 px-3 text-gray-800'
//         placeholder='password'
//         readOnly
//         ref={passwordRef}
//          />
//          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 transition-all  active:scale-90' onClick={copyPasswordToClipboard}>Copy</button>
//       </div>
//       <div className='mb-2 font-bold'>Strength: <span className={strength==="Strong"? "text-green-400" :strength==="Medium" ? "text-yellow-300" :"text-red-500"}>{}strength</span></div>
//       <div className='flex text-sm gap-x-2'>
//         <div className='flex items-center gap-x-1'>
//         <input 
//         type="range"
//         min={6}
//         max={100}
//         value={length}
//         className='cursor-pointer'
//         onChange={(e)=>{setLength(e.target.value)}}
//         />
//     <label >Length:{length}</label>
//         </div>
         

//          { /* for checkbox */ }
//          <div className='flex items-center gap-x-1'>
//           <input 
//           type="checkbox"
//           defaultChecked={numberAllowed}
//           id="numberInput"
//           onChange={()=>{
//             setNumerAllowed((prev)=>!prev);
//           }}
//            />
//            <label htmlFor="numberInput">Numbers</label>
//          </div>

//           {/* for characters */}
//           <div className='flex items-center gap-x-1'>
//             <input type="checkbox"
//             defaultValue={charAllowed}
//             id="charInput"
//             onChange={()=>{
//               setCharAllowed((prev)=>!prev)
//             }}
//              />
//              <label htmlFor="charInput">Characters</label>
//           </div>

//       </div>
//      </div>
    
//   )
// }

// export default App

import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordList, setPasswordList] = useState([]);
  const [customChars, setCustomChars] = useState("~!@#$%^&*");
  const [strength, setStrength] = useState("Weak");
  const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  const passwordRef = useRef(null);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => setDarkMode(e.matches);
    matchMedia.addEventListener("change", listener);
    return () => matchMedia.removeEventListener("change", listener);
  }, []);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed && customChars.trim().length>0) str += customChars.trim();

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);

    let strengthLevel = "Weak";
    if (length > 12 && numberAllowed && charAllowed) {
      strengthLevel = "Strong";
    } else if (length > 8 && (numberAllowed || charAllowed)) {
      strengthLevel = "Medium";
    }
    setStrength(strengthLevel);
  }, [length, numberAllowed, charAllowed, customChars]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, customChars]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  }, [password]);

  const generateMultiplePasswords = () => {
    let newPasswords = [];
    for (let i = 0; i < 5; i++) {
      let tempPass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) str += "0123456789";
      if (charAllowed && customChars.trim().length>0) str += customChars.trim();
      for (let j = 0; j < length; j++) {
        let char = Math.floor(Math.random() * str.length);
        tempPass += str.charAt(char);
      }
      newPasswords.push(tempPass);
    }
    setPasswordList(newPasswords);
  };

  const downloadPasswords = () => {
    const blob = new Blob([passwordList.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "passwords.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <button onClick={() => setDarkMode(!darkMode)} className="mb-3 px-3 py-1 rounded">
        {darkMode ? "🌙" : "☀️"}
      </button>
    <div className={`w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h1 className="text-center my-3">Password Generator</h1>
      
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type={showPassword ? "text" : "password"} value={password} className="outline-none w-full py-1 px-3" readOnly ref={passwordRef} />
        <button className="bg-blue-700 text-white px-3 mr-2" onClick={copyPasswordToClipboard}>Copy</button>
        <button className="bg-gray-600 text-white px-3 rounded-full" onClick={() => setShowPassword(!showPassword)}>👁️</button>
      </div>
      <div className="mb-2 font-bold">Strength: <span className={strength === "Strong" ? "text-green-500" : strength === "Medium" ? "text-yellow-500" : "text-red-500"}>{strength} Password</span></div>
      <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e) => setLength(Number(e.target.value))} />
      <label> Length: {length}</label>
      <br />
      <input type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed(prev => !prev)} /> Numbers
      <input type="checkbox" checked={charAllowed} onChange={() => setCharAllowed(prev => !prev)} /> Characters
      <br />
      <input type="text" value={customChars} className="border p-1" onChange={(e) => setCustomChars(e.target.value)} placeholder="Custom Characters" />
      <br />
      <button className="mt-2 px-3 py-1 bg-green-500 text-white" onClick={generateMultiplePasswords}>Generate Multiple</button>
      <button className="mt-2 px-3 py-1 bg-red-500 text-white" onClick={downloadPasswords}>Download</button>
      <ul className="mt-3">
        {passwordList.map((pass, index) => (
          <li key={index} className="border-b py-1">{pass}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;
