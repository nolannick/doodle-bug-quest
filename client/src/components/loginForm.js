import React from 'react';

const LoginForm = (props) => {
    return (
        <div>
            <input onChange ={props.changeHandler} name = "username" value={props.Uservalue}label="Your username" group type="text"></input>
            <input label="Your password"
                  type="password"
                  onChange={props.changeHandler}
                  value={props.Passvalue}
                  name= "password"></input>
            <button>Log in</button>
        </div>
    )
};

export default LoginForm