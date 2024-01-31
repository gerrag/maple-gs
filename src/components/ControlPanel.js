import React from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';

export default function HomePage() {
    return (
        <div>
            <Card className='m-4'>
                <Card.Body>
                    <Card.Title>Control Panel</Card.Title>
                    <Row className='my-3'>
                        <Col className="text-center">
                            <Button className='m-3' variant='secondary' size='lg'>Validate System</Button>
                            <Button className='m-3' variant='secondary' size='lg'>Start Heartbeat</Button>
                            <Button className='m-3' variant='secondary' size='lg'>Begin Drop Test</Button>
                            <Button className='m-3' variant='secondary' size='lg'>End Drop Test</Button>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col>
                            <Form.Control
                                as="textarea"
                                style={{ height: '25px' }}
                                disabled
                                value={"Status:   Not Connected"}
                            >
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                as="textarea"
                                style={{ height: '25px' }}
                                disabled
                                value={"Last Heartbeat Received:   None"}
                            >
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col>
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                disabled
                                value={"---- Beginning of Log ----"}
                            >
                            </Form.Control>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}