import React, { useEffect, useState } from 'react'
import BreadCrumb from './Breadcrumb';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import MessageRequest from './MessageRequest';
import PreLoader from './PreLoader'
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:8000";
var socket;

function Messages() {
  const globalData = JSON.parse(localStorage.getItem('user12345'));
  const _id = globalData.currentUser._id;
  const user = globalData.currentUser;
  console.log(_id);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data } = await axios.get(`/api/notification/${_id}`)
      setMessages(data.messages);
      setLoading(false);
    }
    fetchMessages();
  }, [_id])

  useEffect(() => {
    socket.on("Receive Message", (newMessage) => {
      setMessages([newMessage, ...messages]);
    })
  }, [messages])

  return (
    <>
      <BreadCrumb type="Your Notifications" />
      {loading ? (<PreLoader />) :
        (messages.length === 0) ? (
          <h4 style={{ textAlign: 'center', marginBottom: '100px', marginTop: '100px' }}>
            No Messages
          </h4>
        ) : (
          <div style={{ margin: '10px' }}>
            <Row>
              <Col style={{ textAlign: 'center' }}>
                <h4>Message</h4>
              </Col>
              <Col style={{ textAlign: 'center' }}>
                <h4>Action</h4>
              </Col>
            </Row>
            <hr />
            {
              messages.map(message => {
                const messageId = message._id; // or another unique identifier
                return (
                  <MessageRequest key={messageId} message={message} messageId={messageId} />
                );
              })
            }
          </div>
        )}

    </>
  )
}

export default Messages