import { useState } from 'react'
import axios from 'axios'

function EmailVerification() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/verifyEmail', { code })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  return (
    <div>
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          required
        />
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default EmailVerification
