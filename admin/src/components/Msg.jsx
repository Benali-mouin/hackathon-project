

import { useEffect, useState } from "react"
import axios from "axios"
import "../Style.css/Msg.css"

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch messages from the API
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contact/getall")
        setMessages(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch messages")
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  if (loading) {
    return <div className="loading">Loading messages...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="messages-container">
      <h1 className="messages-header">Contact Us Messages</h1>
      {messages.length === 0 ? (
        <p className="empty-message">No messages found.</p>
      ) : (
        <ul className="messages-list">
          {messages.map((message) => (
            <li key={message.id} className="message-card">
              <p className="message-field">
                <span className="field-label">Name:</span>
                <span className="field-value">{message.name}</span>
              </p>
              <p className="message-field">
                <span className="field-label">Email:</span>
                <span className="field-value">{message.email}</span>
              </p>
              <p className="message-field">
                <span className="field-label">Phone Number:</span>
                <span className="field-value">{message.phonenumber}</span>
              </p>
              <p className="message-field">
                <span className="field-label">Address:</span>
                <span className="field-value">{message.adress}</span>
              </p>
              <div className="message-content">
                <p className="message-field">
                  <span className="field-label">Message:</span>
                </p>
                <p className="field-value">{message.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Messages
