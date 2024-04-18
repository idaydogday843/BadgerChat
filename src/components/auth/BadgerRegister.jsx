import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router';

export default function BadgerRegister() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const navigate = useNavigate();

    const register = () => {
        if (password !== repeat) {
            alert("Your passwords do not match!");
        }
        else {
            fetch("https://cs571.org/api/f23/hw6/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": CS571.getBadgerId()
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => {
                console.log(res.status)
                if (res.status === 409) {
                    alert("That username has already been taken!")
                }
                if (res.status === 400) {
                    alert("You must provide both a username and password!");
                }
                if (res.status === 200) {
                    alert("You have successfully registered!");
                    navigate('/');
                }
            })
        }
    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control id="username" onChange={(e) => setUsername(e.target.value)} value={username}/>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <Form.Label htmlFor="repeat">Repeat Password</Form.Label>
            <Form.Control id="repeat" type="password" onChange={(e) => setRepeat(e.target.value)} value={repeat}/>
            <Button variant='primary' onClick={register}>Register</Button>
        </Form>
    </>
}
