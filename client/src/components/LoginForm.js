import React from 'react';
import { Form, Input, Button } from 'reactstrap';

const LoginForm = props => (
    <Form inline>
        <Input name='username' value={props.username} onChange={props.handleChange}></Input>
        <Input name='password' value={props.password} onChange={props.handleChange}></Input>
        <Button onClick={props.handleClick}>Login</Button>
    </Form>
);

export default LoginForm;