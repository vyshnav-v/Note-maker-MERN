import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import {  Badge, Button, Card } from "react-bootstrap";
import MainScreen from "./Screens/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../actions/notesActions";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";

function MyNotes({ search }) {
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
     navigate("/");
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
    
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(notes)}
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <Accordion defaultActiveKey="0">
              <Card style={{ margin: 10 }} key={note._id}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <Card.Header
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            fontSize: 18,
                            alignSelf: "center",
                          }}
                        >
                          {note.title} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                      </div>

                      <div>
                        <Button href={`/note/${note._id}`}>Edit</Button>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandler(note._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                  </Accordion.Header>

                  <Accordion.Body>
                    <Card.Body>
                      <h4>
                        <Badge variant="success">
                          Category - {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyNotes;





