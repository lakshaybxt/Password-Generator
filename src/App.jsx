import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const[length, setLength] = useState(8)
  const[numAllowed, setNumAllowed] = useState(false)
  const[specialCharAllowed, setSpecialCharAllowed] = useState(false)
  const[password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(specialCharAllowed) str += "!@#$%^&*[]{}_+~`"

    for(let i=1; i<length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
 
  }, [length, numAllowed, specialCharAllowed, setPassword])

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, specialCharAllowed, passwordGenerator])
 
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-[#393E46] text-[#ffffff]'>
        <h1 className='text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-[#948979] text-[#222831] rounded-tl-lg rounded-bl-lg'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
            className='shrink-0 rounded-tr-lg rounded-br-lg'
            onClick={copyPasswordToClipboard}
          >
              copy
            </button>
        </div>

        <div className='flex justify-between text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
            <input 
              type="range" 
              min={6} 
              max={100} 
              value={length}
              className='cursor-pointer'
              onChange={e => setLength(e.target.value)}
            />
            <label className='font-medium'>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed(prev => !prev)
              }}
            />
            <label htmlFor="numberInput" className='font-medium'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={specialCharAllowed}
            id='characterInput'
            onChange={() => {
              setSpecialCharAllowed(prev => !prev)
            }}
          />
          <label htmlFor="characterInput" className='font-medium'> Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
