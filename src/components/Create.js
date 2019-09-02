import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { 
    Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row,   
  Badge,
  CardFooter,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label
} from 'reactstrap';

import { countryOptions, provinces, cities, employment, income, industry, education, intrest, shopping } from './common.js'

const ADD_MEMBER = gql`
    mutation AddMember(
       		 $firstname: String!,
		     $lastname: String!,
		     $dateofbirth: String!,
		     $email: String!,
		     $cellno: String!,
		     $race: String!,
		     $gender: String!,
		     $country: String!,
		     $province: String!,
		     $city: String!,
		     $occupation: String!,
		     $industry: String!,
		     $education: String!,
		     $income: String!,
		     $alc_brands: String!,
		     $tob_brands: String!,
		     $intrests: String!,
		     $myshopping: String!,
		     $recruit: String!,) {
        addMember(
             firstname: $firstname,
		     lastname: $lastname,
		     dateofbirth: $dateofbirth
		     email: $email,
		     cellno: $cellno,
		     race: $race,
		     gender: $gender,
		     country: $country,
		     province: $province,
		     city: $city,
		     occupation: $occupation,
		     industry: $industry,
		     education: $education,
		     income: $income,
		     alc_brands: $alc_brands,
		     tob_brands: $tob_brands,
		     intrests: $intrests,
		     myshopping: $myshopping,
		     recruit: $recruit) {
            _id
        }
    }
`;





class Create extends Component {

    constructor(props) {
    super(props);
    this.state = {
      modal: false,
      firstname: "",
      lastname: "",
      dateofbirth: "",
     email: "",
     cellno: "",
     race: "",
     gender: "",
     country: "",
     province: "",
     city: "",
     occupation: "",
     industry: "",
     education: "",
     income: "",
     alc_brands: "",
     tob_brands: "",
     intrests: [],
     myshopping: [],
     intrestFinal: "",
     shoppingFinal:"",
     recruit: "",

    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  
    render() {
      return (
        <Mutation mutation={ADD_MEMBER} onCompleted={() => this.props.history.push(`/dashboard`)}>
            {(addMember, { loading, error }) => (
                <div className="container">
                  <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            Create Member
                                        </h3>
                                    </div>
                                    <div className="panel-body">
                                        <Link to="/dashboard"><Button className="btn btn-primary">Back to Member List</Button></Link>
                                        <br/>
                                        <br/>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        this.state.intrests.map((i) => {
                            this.state.intrestFinal = this.state.intrestFinal + i + " ";
                        })
                        this.state.myshopping.map((i) => {
                            this.state.shoppingFinal = this.state.shoppingFinal + i + " "
                        })
                       addMember({ variables: { firstname: this.state.firstname, lastname: this.state.lastname, dateofbirth: this.state.dateofbirth , email: this.state.email, cellno: this.state.cellno, race: this.state.race, gender: this.state.gender, country: this.state.country, province: this.state.province, city: this.state.city, occupation: this.state.occupation, industry: this.state.industry, education: this.state.education, income: this.state.income, alc_brands: this.state.alc_brands, tob_brands: this.state.tob_brands, intrests: this.state.intrestFinal, myshopping: this.state.shoppingFinal, recruit: this.state.recruit } });
                    }} method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                          <Col md="3">
                              <Label htmlFor="firstname">First Name</Label>
                          </Col>
                          <Col xs="12" md="9">
                              <Input value={this.state.firstname} type="text" id="firstname" placeholder="Enter your first name" onChange={(e) => {this.setState({firstname: e.target.value})}}/>
                          </Col>
                       </FormGroup>
                       <FormGroup row>
                          <Col md="3">
                              <Label htmlFor="lastname">Last Name</Label>
                          </Col>
                          <Col xs="12" md="9">
                              <Input value={this.state.lastname} type="text" id="lastname" placeholder="Enter your last name" onChange={(e)=>{this.setState({lastname: e.target.value})}}/>
                          </Col>
                        </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Date of Birth</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.dateofbirth} type="date" id="dateofbirth" name="dateofbirth" placeholder="Enter your date of birth" onChange={(e)=>{this.setState({dateofbirth: e.target.value})}}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email">Email</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.email} type="email" id="email" name="email" placeholder="Enter Email" autoComplete="email" onChange={(e)=>{this.setState({email: e.target.value})}}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="cellno">Cell Number</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.cellno} type="text" id="cellno" name="cellno" placeholder="000 000 0000" onChange={(e)=>{this.setState({cellno: e.target.value})}}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="Race">Race</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.race} type="select" name="race" id="race" onChange={(e)=>{this.setState({race: e.target.value})}}>
                            <option value="0">Please select</option>
                            <option value="Asian">Asian</option>
                            <option value="African">African</option>
                            <option value="Coloured">Coloured</option>
                            <option value="Indian">Indian</option>
                            <option value="White">White</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="gender">Gender</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.gender} type="select" name="gender" id="gender" onChange={(e)=>{this.setState({gender: e.target.value})}}>
                            <option value="0">Please select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="country">Country</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.country} type="select" name="country" id="select" onChange={(e)=>{this.setState({country: e.target.value})}}>
                          <option value="0">Please select</option>
                            {
                                countryOptions.map(country => {
                                    return(<option value={country.value} key={country.key}>{country.text}</option>)
                                })
                            }
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="province">Province</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.province} type="select" name="province" id="select" onChange={(e)=>{this.setState({province: e.target.value})}}>
                          <option value="0">Please select</option>
                            {
                                provinces.map(province => {
                                  if (this.state.country == "South Africa") {
                                      return(<option value={province.value} key={province.value}>{province.value}</option>)
                                  }
                                })
                            }
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="city">City</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input  value={this.state.city} type="select" name="city" id="select" onChange={(e)=>{this.setState({city: e.target.value})}}>
                          <option value="0">Please select</option>
                            {
                                cities.map(city => {
                                  if (city.country == this.state.country) {
                                    return(<option value={city.value} key={city.value}>{city.value}</option>)
                                  }
                                })
                            }
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="occupation">Occupation</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.occupation} type="select" id="occupation" name="occupation" placeholder="Enter occupation" onChange={(e)=>{this.setState({occupation: e.target.value})}}>
                            <option value="0">Please select</option>
                            {
                                employment.map(i => {
                                    return(<option value={i.value} key={i.value}>{i.value}</option>)
                                })
                            }
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="industry">Industry</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input  value={this.state.industry} type="select" id="industry" name="industry" placeholder="Enter industry" onChange={(e)=>{this.setState({industry: e.target.value})}}>
                          <option value="0">Please select</option>
                            {
                                industry.map(i => {
                                    return(<option value={i.value} key={i.value}>{i.value}</option>)
                                })
                            }
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="education">Education</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.education} type="select" name="education" id="education" onChange={(e)=>{this.setState({education: e.target.value})}}>
                            <option value="0">Please select</option>
                            {
                                education.map(i => {
                                    return(<option value={i.text} key={i.text}>{i.text}</option>)
                                })
                            }
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="income">Income</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.income} type="select" id="income" name="income" placeholder="Enter your income" onChange={(e)=>{this.setState({income: e.target.value})}}>
                           <option value="0">Please select</option>
                            {
                                income.map(i => {
                                    return(<option value={i.value} key={i.value}>{i.value}</option>)
                                })
                            }
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="alc_brands">Alcohol Brands</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.alc_brands} type="select" name="alc_brands" id="alc_brands" onChange={(e)=>{this.setState({alc_brands: e.target.value})}}>
                            <option value="0">Please select</option>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="tob_brands">Tobacco Brands</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.tob_brands} type="select" name="tob_brands" id="tob_brands" onChange={(e)=>{this.setState({tob_brands: e.target.value})}}>
                            <option value="0">Please select</option>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                    <Col md="3"><Label>Intrests</Label></Col>
                    <Col md="9">
                    {
                        intrest.map(ed => {
                            return (
                                <FormGroup check className="checkbox" key={ed.text}>
                                    <Col lg="15">
                                      <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value={ed.text} onChange={(e)=>{this.setState({intrests: [...this.state.intrests, e.target.value] })}}/>
                                      <Label check className="form-check-label" htmlFor="checkbox1">{ed.text}</Label>
                                    </Col>
                                </FormGroup>
                            )
                        })
                    }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>Shopping Behaviours</Label></Col>
                    <Col md="9">
                    {
                        shopping.map(ed => {
                            return (
                                <FormGroup check className="checkbox" key={ed.text}>
                                    <Col md="15">
                                        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value={ed.text} onChange={(e)=>{this.setState({myshopping: [...this.state.myshopping, e.target.value]})}}/>
                                        <Label check className="form-check-label" htmlFor="checkbox1">{ed.text}</Label>
                                    </Col>
                                </FormGroup>
                            )
                        })
                    }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="recruit">Would you be open to helping us recruit in your area in the future?</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input value={this.state.recruit} type="select" name="recruit" id="recruit" onChange={(e)=>{this.setState({recruit: e.target.value})}}>
                            <option value="0">Please select</option>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <Button type="reset" size="sm" color="danger" className="float-right"><i className="fa fa-ban"></i> Reset</Button>
                      <Button type="submit" size="sm" color="primary" className="float-right"><i className="fa fa-dot-circle-o"></i> Submit</Button>

                    </Form>
            </div>
          </div>
        </div>
            )}
        </Mutation>
            
      );
    }
}
export default Create;