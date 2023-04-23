import React, { useEffect, useState } from 'react'
import './style.css'
import logo from './robot.gif'
import logoHeader from './Bot_1.png'
import { FaPaperPlane } from 'react-icons/fa'
import { Row, Col } from 'react-bootstrap'


function ChatBot() {

    useEffect(() => {
        class Chatbox {
            constructor() {
                this.args = {
                    openButton: document.querySelector('.chatbox__button'),
                    chatBox: document.querySelector('.chatbox__support'),
                    sendButton: document.querySelector('.send__button')
                }

                this.state = false;
                this.messages = [];
            }

            display() {
                const { openButton, chatBox, sendButton } = this.args;

                openButton.addEventListener('click', () => this.toggleState(chatBox))

                sendButton.addEventListener('click', () => this.onSendButton(chatBox))

                const node = chatBox.querySelector('input');
                node.addEventListener("keyup", ({ key }) => {
                    if (key === "Enter") {
                        this.onSendButton(chatBox)
                    }
                })
            }

            toggleState(chatbox) {
                this.state = !this.state;

                // show or hides the box
                if (this.state) {
                    chatbox.classList.add('chatbox--active')
                } else {
                    chatbox.classList.remove('chatbox--active')
                }
            }

            onSendButton(chatbox) {
                var textField = chatbox.querySelector('input');
                let text1 = textField.value
                if (text1 === "") {
                    return;
                }

                let msg1 = { name: "User", message: text1 }
                this.messages.push(msg1);

                fetch('http://localhost:5000/ai/predict', {
                    method: 'POST',
                    body: JSON.stringify({ message: text1 }),
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(r => r.json())
                    .then(r => {
                        let msg2 = { name: "Sam", message: r.answer };
                        this.messages.push(msg2);
                        this.updateChatText(chatbox)
                        textField.value = ''

                    }).catch((error) => {
                        console.error('Error:', error);
                        this.updateChatText(chatbox)
                        textField.value = ''
                    });
            }

            updateChatText(chatbox) {
                var html = '';
                this.messages.slice().reverse().forEach(function (item, index) {
                    if (item.name === "Sam") {
                        html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
                    }
                    else {
                        html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
                    }
                });

                const chatmessage = chatbox.querySelector('.chatbox__messages');
                chatmessage.innerHTML = html;
            }
        }

        const chatbox = new Chatbox();
        chatbox.display();

    }, []);

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(current => !current);
    };

    return (
        <div>
            <div class="container">
                <div style={{ zIndex: isActive ? '123456' : '-123456' }} className="chatbox">
                    <div class="chatbox__support">
                        <div class="chatbox__header">
                            <Row>
                                <Col xs={4} sm={4} md={4} lg={4} >
                                    <div className="chatbox__image--header">
                                        <img src={logoHeader} alt="Header Logo" style={{ minWidth: '70px' }} />
                                    </div>
                                </Col>
                                <Col xs={7} sm={7} md={7} lg={7}>
                                    <div class="chatbox__content--header">
                                        <h4 class="chatbox__heading--header">SWAPHA Chatbot</h4>
                                        <p class="chatbox__description--header">Get to know SWAP.IT now.</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div class="chatbox__messages">
                            <div></div>
                        </div>
                        <div class="chatbox__footer">
                            <input type="text" placeholder="Write a message..." />
                            <button class="chatbox__send--footer send__button"><FaPaperPlane style={{ fontSize: '20px', marginRight: 10 }} /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ bottom: '5%', right: '5%', position: 'fixed', width: '110px' }} className="chatbox__button">
                <button onClick={handleClick}><img style={{ borderRadius: '5rem' }} src={logo} alt="logo" /></button>
            </div>
        </div >

    )
}

export default ChatBot