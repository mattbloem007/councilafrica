import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const GET_MEMBER = gql`
    query member($memberId: String) {
        member(id: $memberId) {
            _id
             firstname
             lastname
             dateofbirth
             email
             cellno
             race
             gender
             country
             province
             city
             occupation
             industry
             education
             income
             alc_brands
             tob_brands
             intrests
             myshopping
             recruit
        }
    }
`;

const UPDATE_MEMBER = gql`
    mutation updateMember(
             $firstname: String!,
             $lastname: String!,
             $dateofbirth: Date!,
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
        updateMember(
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

class EditMember extends Component {

    constructor(props) {
    super(props);
    this.state = {
      name: props.defaultValue,
      open: true
    };
  }

  // focus() {
  //   this.refs.inputRef.focus();
  // }

  close = () => {
    this.setState({ open: false });
   // this.props.onUpdate(this.props.defaultValue);
  }
  
    render() {
        const fadeIn = this.state.open ? 'in' : '';
        const display = this.state.open ? 'block' : 'none';

      let firstname, lastname ,dateofbirth ,email ,cellno ,race ,gender, country, province,city,occupation,industry,education,income,alc_brands,tob_brands,intrests,myshopping,recruit;
      return (
            <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>

                        <Query query={GET_MEMBER} variables={{ memberId: this.props.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={UPDATE_MEMBER} key={data.member._id} onCompleted={() => this.props.history.push(`/`)}>
                        {(updateMember, { loading, error }) => (
                            <div className="container">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            EDIT Member
                                        </h3>
                                    </div>
                                    <div className="panel-body">
                                        <h4><Link to="/" className="btn btn-primary">Member List</Link></h4>
                                        <form onSubmit={e => {
                                e.preventDefault();
                                updateMember({ variables: { firstname: firstname.value, lastname: lastname.value, dateofbirth: dateofbirth.value , email: email.value, cellno: cellno.value, race: race.value, gender: gender.value, country: country.value, province: province.value, city: city.value, occupation: occupation.value, industry: industry.value, education: education.value, income: income.value, alc_brands: alc_brands.value, tob_brands: tob_brands.value, intrests: intrests.value, myshopping: myshopping.value, recruit: recruit.value } });
                                 firstname.value = "";
                                 lastname.value = "";
                                 dateofbirth.value = "";
                                 email.value = "";
                                 cellno.value = "";
                                 race.value = "";
                                 gender.value = "";
                                 country.value = "";
                                 province.value = "";
                                 city.value = "";
                                 occupation.value = "";
                                 industry.value = "";
                                 education.value = "";
                                 income.value = "";
                                 alc_brands.value = "";
                                 tob_brands.value = "";
                                 intrests.value = "";
                                 myshopping.value = "";
                                 recruit.value = "";
                            }}>
                                <div className="form-group">
                                    <label htmlFor="firstname">First Name:</label>
                                    <input type="text" className="form-control" name="firstname" ref={node => {
                                        firstname = node;
                                    }} placeholder="First Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname">Last Name:</label>
                                    <input type="text" className="form-control" name="lastname" ref={node => {
                                        lastname = node;
                                    }} placeholder="Last Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateofbirth">Date of Birth:</label>
                                    <input type="text" className="form-control" name="dateofbirth" ref={node => {
                                        dateofbirth = node;
                                    }} placeholder="Date of Birth" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <textarea className="form-control" name="email" ref={node => {
                                        email = node;
                                    }} placeholder="Email" cols="80" rows="3" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cellno">Cell Number:</label>
                                    <input type="text" className="form-control" name="cellno" ref={node => {
                                        cellno = node;
                                    }} placeholder="Cell Number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="race">Race:</label>
                                    <input type="text" className="form-control" name="race" ref={node => {
                                        race = node;
                                    }} placeholder="Race" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>
                                    <input type="text" className="form-control" name="gender" ref={node => {
                                        gender = node;
                                    }} placeholder="Gender" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="race">Country:</label>
                                    <input type="text" className="form-control" name="country" ref={node => {
                                        country = node;
                                    }} placeholder="Country" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="race">Province:</label>
                                    <input type="text" className="form-control" name="province" ref={node => {
                                        province = node;
                                    }} placeholder="Province" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="race">City:</label>
                                    <input type="text" className="form-control" name="city" ref={node => {
                                        city = node;
                                    }} placeholder="City" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="occupation">Occupation:</label>
                                    <input type="text" className="form-control" name="occupation" ref={node => {
                                        occupation = node;
                                    }} placeholder="Occupation" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="industry">industry:</label>
                                    <input type="text" className="form-control" name="industry" ref={node => {
                                        industry = node;
                                    }} placeholder="industry" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="education">Education:</label>
                                    <input type="text" className="form-control" name="education" ref={node => {
                                        education = node;
                                    }} placeholder="Education" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="income">Income:</label>
                                    <input type="text" className="form-control" name="income" ref={node => {
                                        income = node;
                                    }} placeholder="Income" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="alc_brands">Alcohol Brands:</label>
                                    <input type="text" className="form-control" name="alc_brands" ref={node => {
                                        alc_brands = node;
                                    }} placeholder="Alcohol Brands" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tob_brands">Tobacco Brands:</label>
                                    <input type="text" className="form-control" name="tob_brands" ref={node => {
                                        tob_brands = node;
                                    }} placeholder="Tobacco Brands" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="intrests">Intrests:</label>
                                    <input type="text" className="form-control" name="intrests" ref={node => {
                                        intrests = node;
                                    }} placeholder="Intrests" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="myshopping">Shopping Behaviour:</label>
                                    <input type="text" className="form-control" name="myshopping" ref={node => {
                                        myshopping = node;
                                    }} placeholder="Shopping Behaviour" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recruit">Recruit:</label>
                                    <input type="text" className="form-control" name="recruit" ref={node => {
                                        recruit = node;
                                    }} placeholder="Recruit" />
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Mutation>
                );
            }}
        </Query>
                            
                        </div>
                    </div>
                </div>
            </div>
      );
    }
}
export default EditMember;