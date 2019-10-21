import React, { useState, useEffect } from 'react';
import { getResponseCount, postResponse } from './backend';
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
      const response = await postResponse({name: name, email: email})
      console.log(response)
      if (response.status === 'error') {
        setStatus({
          type: "error",
          message: response.issues.email || response.issues.name || response.status
        })
      } else {
        // setName(response.name)
        // setEmail(response.email)
        setStatus({type: "success", message: ""})
      }
    } catch(e) {
      setStatus({
        type: "error",
        message: e.toString()
      })
    }
  }
  useEffect(() => {
      getResponseCount().then((response) => {
        setCount(response)
        setStatus({type: "loaded", message: ""})
      }).catch(e => {
      setStatus({
        type: "error",
        message: e.toString()
      })
    })
  }, [])
  const content = status.type === "success" ? (
    <>
      <p>Hello! {name}.</p>
      <p>
        Thanks for joining in! <br />
        When we're ready to wow you, <br />
        You'll get an email.
      </p>
    </>
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
      {status.type === 'busy' ? (<p>loading</p>) : (
        <button type="submit">
        I'll vouch for that {requestCount}
        </button>
      )}
      { status.type === "error" && (
        <p>{status.message}</p>
      )}
    </form>
  )

  return <div className="App">{content}</div>
}

export default App;
