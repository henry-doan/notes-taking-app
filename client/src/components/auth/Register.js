import React from 'react';
import { Container, Header, Form, Button, Segment } from 'semantic-ui-react';
import useForm from '../../hooks/useForm';

function validate(values) {
  let errs = {}
  let { email='', password='' } = values
  if (email.length === 0 ){
    errs.email = 'Email is required'
  } else if (password.length === 0) {
    errs.password = "Password is required"
  } else if (values.password.length < 8) {
    errs.password = "Password too short"
  }
  return errs
}

const Register = () => {
  const { values, errs, handleChange, handleSubmit } = useForm(
    () => handleRegister(),
    validate,
    {
      email: "",
      password: ""
    }
  )

  const handleRegister = () => {

  }
  return (
    <Container>
      <Header>Register</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Email'
          autoFocus
          required
          name='email'
          value={values.email}
          placeholder='Email'
          onChange={e => { handleChange("email", e.target.value)}}
          error={errs.email ? true : false}
        />
        <Form.Input
          label='Password'
          required
          name='password'
          value=''
          onChange={e => { handleChange("password", e.target.value)}}
          error={errs.password ? true : false}
        />
        <Segment textAlign='center' basic>
          <Button primary type='submit'>Submit</Button>
        </Segment>
      </Form>
    </Container>
  )
}

export default Register;