import { useState, useRef } from "react";
import { useStore } from "../contexts/StoreContext";
import { Container, Alert, Button, Collapse, Form, Row, Col, Table } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PageHeader from "./PageHeader";

export default function Tasks() {
    const { groups, tasks, createTask } = useStore();

    const [showCreate, setShowCreate] = useState(false);
    const [error, setError] = useState("");

    const renderTasks = () => {
        if (tasks && tasks.length === 0) {
            return <h2>You do not have any active tasks right now.</h2>;
        } else {
            return (
                <>
                    <h2>Your tasks</h2>
                    <Table striped bordered hover responsive className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Date Due</th>
                                <th>Team</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{task.name}</td>
                                    <td>{task.desc}</td>
                                    <td>{task.dueDate.toLocaleDateString("en-GB")}</td>
                                    <td>{task.groupName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            );
        }
    };

    const [loading, setLoading] = useState(false);
    const taskNameRef = useRef();
    const taskDescRef = useRef();
    const taskTeamRef = useRef();
    const [taskDate, setTaskDate] = useState(new Date());

    function makeTask(e) {
        e.preventDefault();

        createTask(
            taskNameRef.current.value,
            taskDescRef.current.value,
            taskTeamRef.current.value,
            taskDate
        );
    }

    return (
        <>
            <PageHeader />
            <Container className="pt-5 mt-5">
                {error && <Alert variant="danger">{error}</Alert>}
                <Container className="d-flex flex-column">
                    <Container className="col-sm-12 mx-auto bg-light p-5 rounded">
                        <h1>Tasks</h1>
                        <p>
                            Tasks are events that have been scheduled within the Teams that you are
                            subcribed to.
                        </p>
                        <Button
                            onClick={() => setShowCreate(!showCreate)}
                            variant="danger"
                            size="lg"
                        >
                            Create a Task
                        </Button>
                        <Collapse in={showCreate}>
                            <div>
                                <Container className="mt-5 col-10" style={{ maxWidth: "600px" }}>
                                    <Form onSubmit={makeTask}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                Task Name
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control
                                                    type="text"
                                                    ref={taskNameRef}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                Task Description
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control as="textarea" ref={taskDescRef} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                Team Involved
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control
                                                    as="select"
                                                    ref={taskTeamRef}
                                                    className="form-select"
                                                >
                                                    {groups.map((group) => (
                                                        <option key={group.uid}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                Date Due
                                            </Form.Label>
                                            <Col sm="9">
                                                <DatePicker
                                                    selected={taskDate}
                                                    onChange={(date) => setTaskDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Button disabled={loading} className="w-100" type="submit">
                                            Create
                                        </Button>
                                    </Form>
                                </Container>
                            </div>
                        </Collapse>
                    </Container>
                    <Container className="col-sm-12 mx-auto mt-2 pt-5">{renderTasks()}</Container>
                </Container>
            </Container>
        </>
    );
}
