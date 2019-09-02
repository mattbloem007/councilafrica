import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";


const LOGIN =  gql`
        mutation login($username: String!, $password: String!) {
        login(username:$username, password: $password) {
        username
        password
        rightsLogin
        }
      }
    `;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""

    };
  }

  

  render() {
    return (
      <Mutation mutation={LOGIN}>
            {(login, { loading, error }) => (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        login({variables: {username: this.state.username, password: this.state.password}}).then((data) => {  
                          if(data) {
                            console.log(data)
                            fetch('http://localhost:5000/api/authenticate', {
                                method: 'POST',
                                body: JSON.stringify({username: data}),
                                headers: {
                                  'Content-Type': 'application/json'
                                }
                              })
                              .then(res => {
                                if (res.status === 200) {
                                  this.props.history.push('/');
                                } else {
                                  const error = new Error(res.error);
                                  throw error;
                                }
                              })
                              .catch(err => {
                                console.error(err);
                                alert('Error logging in please try again');
                              });
                          }
                          
                        })
                    }} method="post" encType="multipart/form-data" className="form-horizontal">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={this.state.username} placeholder="Username" autoComplete="username" onChange={(e) => {this.setState({username: e.target.value})}}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"  value={this.state.password} placeholder="Password" autoComplete="current-password" onChange={(e) => {this.setState({password: e.target.value})}}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
      )}
    </Mutation>
    );
  }
}

export default Login;
