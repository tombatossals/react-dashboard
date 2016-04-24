import React from 'react';
import Field from 'components/Field/Field';
import Label from 'components/Label/Label';
import TextInput from 'components/TextInput/TextInput';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
      type: 'String',
      name: '',
    };
  }

  render() {
    return (
      <div>
        <Field
          label={
            <Label
              text="Username"
            />
          }
          input={
            <TextInput
              placeholder="Insert here  your username"
              value={this.state.name}
              onChange={(name) => this.setState({ name })}
            />
          }
        />
        <Field
          label={
            <Label
              text="Password"
            />
          }
          input={
            <TextInput
              placeholder="Insert here your password"
              type="password"
              onChange={(name) => this.setState({ name })}
            />
          }
        />
        <div>hola que tal</div>
      </div>
    );
  }
}
