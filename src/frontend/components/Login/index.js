import React from 'react';
import styles from 'components/Login/login.style';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Login = () => (
  <div>
    <h1 style={styles.h1}>Log in to your account</h1>
    <div style={styles.box}>
      <TextField style={styles.loginbutton} hintText="Username" />
      <TextField style={styles.loginbutton} hintText="Password" />
      <br />
      <RaisedButton label="Log in" primary />
    </div>
  </div>
);

export default Login;
