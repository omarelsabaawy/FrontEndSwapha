import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:8000";
var socket;

function MessageRequest(props) {
    const message = props.message;
    const messageId = props.messageId;
    const globalData = JSON.parse(localStorage.getItem('user12345'));
    const user = globalData.currentUser;
    const [disable, setDisable] = useState(false);
    const [yes, setYes] = useState(false);
    const [msg, setMsg] = useState("");
    const [loadingAccept, setLoadingAccept] = useState(false);
    // const [loadingDecline, setLoadingDecline] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [hide, setHide] = useState(false);
    const [response, setResponse] = useState("");
    // const [messageReceived, setMessageReceived] = useState(false);

    const [socketConnected, setSocketConnected] = useState(false)

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnected(true));
    }, [])

    const acceptRequest = async (messageId) => {
        setLoadingAccept(true);
        setDisable(true);
        const { data } = await axios.post('/api/notification/AcceptRequest', {
            messageId
        });
        setLoadingAccept(false);
        setYes(true);
        console.log(data.notification);
        socket.emit("send Acceptance", data.notification);
    }
    const declineRequest = async (messageId) => {
        setDeclined(true);
        const { data } = await axios.post('/api/notification/DeclineRequest', {
            messageId
        })
        console.log(data.notification)
        socket.emit("send Rejection", data.notification);
    }

    const sendMessage = async (messageId) => {
        const { data } = await axios.post('/api/notification/sendMessage', {
            messageId,
            msg
        });
        setResponse(data.response);
        setHide(true);
        socket.emit("send Message", data.notification);
    }

    return (
        <>
            <Row style={{ margin: '10px' }}>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5>
                                From: <span style={{ color: 'red' }}> {message.from.username}</span>
                                <span style={{ float: 'right', color: 'grey', fontSize: '16px' }}>{message.timestamp}</span>
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Message: </Card.Title>
                            <Card.Text style={{ fontSize: '16px' }}>
                                {message.body}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Link href="/reportMessage" style={{ color: '#0077b6', textDecorationLine: 'underline' }}>
                                Report the Message
                            </Card.Link>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5><span style={{ color: 'red' }}> Your Action: </span> </h5>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Your Response:
                                {(message.accepted === true && message.declined === true) ? (
                                    <span
                                        style={{ color: 'black', margin: '6px' }}
                                    >
                                        {message.response}
                                    </span>
                                ) : (message.accepted && message.response !== "") ? (
                                    <span
                                        style={{ color: 'black', margin: '6px' }}
                                    >
                                        {message.response}
                                    </span>
                                ) : (yes || message.accepted) ? (<>
                                    {!hide ? (<>
                                        <input
                                            type='text'
                                            name='message'
                                            placeholder='Enter your message'
                                            onChange={(e) => setMsg(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter' && msg !== "") { sendMessage(messageId) } }}
                                            style={{ marginLeft: '5px', fontSize: '15px', height: '40px', width: '250px', borderRadius: '0.4rem', borderWidth: '0.1px' }}
                                            required
                                        />
                                        <Button
                                            type='submit'
                                            style={{ backgroundColor: 'green', borderColor: 'transparent', margin: '6px', height: '40px' }}
                                            onClick={() => sendMessage(messageId)}
                                        >
                                            Send Message
                                        </Button>
                                    </>) : (<span
                                        style={{ color: 'black', margin: '6px' }}
                                    >
                                        {response}
                                    </span>)}
                                </>) : (declined || message.declined) ? (
                                    <span
                                        style={{ color: 'red', marginLeft: '7px', fontSize: '16px' }}
                                    >
                                        {response !== "" ? response : message.response !== "" ? message.response : "You Declined this Request"}
                                    </span>
                                ) : (message.declined) ? (
                                    <span
                                        style={{ color: 'black', marginLeft: '7px', fontSize: '16px' }}
                                    >
                                        {message.response}
                                    </span>
                                ) : !(message.accepted || message.declined) ? (<>
                                    <Button
                                        type='submit'
                                        style={{ backgroundColor: 'green', borderColor: 'transparent', margin: '6px' }}
                                        onClick={() => acceptRequest(messageId)}
                                        disabled={disable === true ? true : false}
                                    >
                                        {loadingAccept ? <Spinner size='sm' /> : "Accept Request"}
                                    </Button>
                                    <Button
                                        type='submit'
                                        style={{ backgroundColor: 'red', borderColor: 'transparent', margin: '6px' }}
                                        onClick={() => declineRequest(messageId)}
                                        disabled={disable === true ? true : false}
                                    > Decline Request </Button>
                                </>
                                ) : (message.response !== '' && message.declined) ? (
                                    <span
                                        style={{ color: 'black', marginLeft: '7px', fontSize: '16px' }}
                                    >
                                        {message.response}
                                    </span>
                                ) : (
                                    <span
                                        style={{ color: 'black', marginLeft: '7px', fontSize: '16px' }}
                                    >
                                        {response}
                                    </span>
                                )}
                            </Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Link href="/reportMessage" style={{ color: '#0077b6', textDecorationLine: 'underline' }}>
                                Report an issue
                            </Card.Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <hr />
        </>
    )
}

export default MessageRequest