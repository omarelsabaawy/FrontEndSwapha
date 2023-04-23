import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaCrosshairs } from 'react-icons/fa';

function Location(props) {
    const res = props.res;
    return (
        <div>
            {res ?
                <Dropdown style={{ marginTop: '1%' }}>
                    <Dropdown.Toggle style={{ color: 'black', borderColor: 'transparent' }} variant="transparent">
                        Choose Your Location
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item href="#/action-1">
                            <FaCrosshairs /> Get Current Location
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-2">Egypt</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">United States</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">United Kingdom</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                :
                <Dropdown style={{ marginTop: '1%' }}>
                    <Dropdown.Toggle style={{ color: 'white', borderColor: 'transparent' }} variant="transparent">
                        Choose Your Location
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item href="#/action-1" active>
                            <FaCrosshairs />  Get Current Location
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-2">Egypt</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">United States</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">United Kingdom</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }

        </div>
    );
}

export default Location;