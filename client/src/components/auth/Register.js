import React from 'react';
import { Container, Header, Form, Button, Segment } from 'semantic-ui-react';

const Register = () => {
  return (
    <Container>
      <Header>Register</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label='Email'
          autoFocus
          required
          name='email'
          value={email}
          placeholder='Email'
          onChange={this.handleChange}
        />
        <Form.Input
          label='Password'
          required
          name='password'
          value={password}
          placeholder='Password'
          onChange={this.handleChange}
        />
        <Form.Input
          label='Password Confirmation'
          required
          name='password_confirmation'
          value={password_confirmation}
          placeholder='Password Confirmation'
          onChange={this.handleChange}
        />
      </Form>
    </Container>
  )
}

export default Register;