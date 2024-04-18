import React, { useEffect, useState, useContext } from "react"
import BadgerMessage from "./BadgerMessage";
// import { useNavigate } from "react-router";
import {Row, Col, Pagination, Form, Button} from 'react-bootstrap';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    // const navigate = useNavigate();

    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);

    // useEffect(() => {
    //     console.log(messages.length);
    // }, [messages])

    const buildPaginator = () => {
        let pages = []
        const num_pages = 4
            for(let i = 1; i <= num_pages; i++) {
                pages.push(
                    <Pagination.Item 
                        key={i}
                        active={page === i}
                        onClick={() => setPage(i)}
                    >
                        {i}
                    </Pagination.Item>
                )
            }
            return pages;
    };

    const postContent = () => {
        if (!loginStatus) {
            alert("You must be logged in to post!");
        }
        else {
            if (title === "" | content === "") {
                alert("You must provide both a title and content!");
            }
            else {
                fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": CS571.getBadgerId()
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            }).then(res => {
                alert("Successfully posted!");
                loadMessages();
        })
            }
        }
    }

    const deletePost = (message) => {
        if (message.poster === sessionStorage.getItem("logged_user")) {
            fetch(`https://cs571.org/api/f23/hw6/messages?id=${message.id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": CS571.getBadgerId(),
                },
        })
          .then((res) => {
            alert("Successfully Deleted");
            loadMessages();
          });
        }
    };

    return <>
        <h1>{props.name} Chatroom</h1>
        <Form>
            <Form.Label htmlFor="title">Post Title</Form.Label>
            <Form.Control id="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
            <Form.Label htmlFor="content">Post Content</Form.Label>
            <Form.Control id="content" onChange={(e) => setContent(e.target.value)} value={content}/>
            <Button onClick={postContent}>Create Post</Button>
        </Form>
        <hr/>
        {
            messages.length > 0 ?
                <Row>
                    {
                        messages.map(message => {
                            return <Col xs={12} md={6} xl={3} key={[message.created,message.title]}>
                                <BadgerMessage key={message.created} props={message} title={message.title} poster={message.poster} content={message.content} created={message.created} onDelete={deletePost}/>
                            </Col>
                        })
                    }
                </Row>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination>
            {buildPaginator()}
        </Pagination>
    </>
}
