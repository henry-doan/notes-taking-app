import React from 'react';
import { Container, Header, Form, Button, Segment } from 'semantic-ui-react';

const Login = () => {

  return (
    <Container>
      <Header as='h1' textAlign='center'>Login</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Email"
          autoFocus
          required         
          name='email'
          value={email}
          placeholder='Email'
          onChange={this.handleChange}
        />
        <Form.Input
          label="Password"
          required
          name='password'
          value={password}
          placeholder='Password'
          type='password'
          onChange={this.handleChange}
        />
        <Segment textAlign='center' basic>
          <Button primary type='submit'>Submit</Button>
        </Segment>
      </Form>
    </Container>
  )
}

export default Login;