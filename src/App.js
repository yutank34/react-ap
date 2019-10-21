import React, { useState } from 'react';
import { getResponseCount } from './backend';
// import logo from './logo.svg';
import './styles.css';
import './App.css';

function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState({
    type: "busy",
    message: ""})
  const [requestCount, setCount] = useState(0)
  // const [submitted, changeStatus] = useState(false)
  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setStatus({type: "busy", message: ""})
    try {
      const response = await getResponseCount()
      setCount(response)
      setStatus({type: "loaded", message: ""})
    } catch(e) {
      setStatus({
        type: "error",
        message: e.toString()
      })
    }

  }
  const content = false ? (
    <p>
      Thanks for joining in! <br />
      When we're ready to wow you, <br />
      You'll get an email.
    </p>
  ) : (
    <form onSubmit={handleOnSubmit}>
      <p>
        A social network, <br />
        Where you are the customer. <br />
        Ad free. Launching soon.
      </p>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <label>
        Email:
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit">
        I'll vouch for that {requestCount}
      </button>
      { status.type === "error" && (
        <p>{status.message}</p>
      )}
    </form>
  )

  return <div className="App">{content}</div>
}

export default App;
