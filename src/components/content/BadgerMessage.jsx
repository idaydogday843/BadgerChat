import React from "react"
import { Card, Button } from "react-bootstrap";

function BadgerMessage({props, onDelete}) {

    const dt = new Date(props.created);

    const myPost = (props.poster === sessionStorage.getItem("logged_user"));
    
    const deletePost = () => {
        onDelete(props)
    }

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {myPost ? <><Button onClick={deletePost}>Delete Post</Button></> : <></>}
    </Card>
}

export default BadgerMessage;