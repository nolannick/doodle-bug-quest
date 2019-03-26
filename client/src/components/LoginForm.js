import React from 'react';
import { Form, Input, Button } from 'reactstrap';

const LoginForm = props => (
    <Form inline>
        <Input name='username' value={props.username} onChange={props.handleChange}></Input>&nbsp;
        <Input name='password' value={props.password} onChange={props.handleChange}></Input>&nbsp;
        <Button onClick={props.handleClick}>Login</Button>
    </Form>
);

export default LoginForm;