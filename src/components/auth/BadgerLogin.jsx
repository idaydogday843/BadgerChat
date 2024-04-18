import React from 'react';
import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {

    // TODO Create the login component.
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const login = () => {
        fetch("https://cs571.org/api/f23/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        }).then(res => {
            console.log(res.status);
            if (res.status === 401) {
                alert("Incorrect username or password!");
            }
            if (res.status === 400) {
                alert("You must provide both a username and password!")
            }
            if (res.status === 200) {
                alert("You have successfully logged in!");
                sessionStorage.setItem('logged_user', username.current.value);           
                setLoginStatus(true);
                navigate('/');
            }
        });
    };

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control id="username" ref={username}/>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" type="password" ref={password}/>
            <Button variant='primary' onClick={login}>Login</Button>
        </Form>
    </>
}
