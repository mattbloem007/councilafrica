import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_USER = gql`
    mutation AddUser(
          $username: String!,
         $email: String!,
         $password: String!,) {
        addUser(
             username: $username,
         email: $email,
         password: $password) {
            username
        }
    }
`;

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""

    };
  }
  
  render() {
    return (
      <Mutation mutation={ADD_USER}>
            {(addUser, { loading, error }) => (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={e => {
                        e.preventDefault();
                       addUser({ variables: { username: this.state.username, email: this.state.email, password: this.state.password } });
                    }} method="post" encType="multipart/form-data" className="form-horizontal">
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input value={this.state.username} type="text" placeholder="Username" autoComplete="username" onChange={(e) => {this.setState({username: e.target.value})}}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input value={this.state.email} type="text" placeholder="Email" autoComplete="email" onChange={(e) => {this.setState({email: e.target.value})}}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input value={this.state.password} type="password" placeholder="Password" autoComplete="new-password" onChange={(e) => {this.setState({password: e.target.value})}}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button type="submit" color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      )}
    </Mutation>
    );
  }
}

export default Register;
