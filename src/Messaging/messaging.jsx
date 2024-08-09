import { useState } from "react";
import axios from "axios";

const ws = new WebSocket("ws://localhost:3000/cable");

export function messaging () {
  const [messages, setMessages] = useState([]);
  const [guid, setGuid] = useState("");

  ws.onopen = () => {
    console.log("Connected to websocket server");
    setGuid(Math.random().toString(36).substring(2, 15))

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "Conversation_Channel",
        })
      })
    )
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios.get(`https://localhost:3000/conversations/${conversation.id}/messages`)
    .then((response) => {
      console.log("You are in a current conversation");
      setMessages(data);
    })
  }
  

  return (
    <div>
      <div>
        <h1>Messages</h1>
        <p>Guid: {guid}</p>
      </div>
    </div>
  );
}