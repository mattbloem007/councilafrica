import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Button } from 'reactstrap';

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

const DELETE_MEMBER = gql`
  mutation removeMember($id: String!) {
    removeMember(id:$id) {
      _id
    }
  }
`;

class Show extends Component {

  render() {
    return (
        <Query pollInterval={500} query={GET_MEMBER} variables={{ memberId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-body">
                            <Link to="/dashboard"><Button block color="primary">Back to Member List</Button></Link>
                                <h3 className="panel-title">
                                {data.member.firstname}
                                </h3>
                            </div>
                            <div className="panel-body">
                                <dl>
                                    <dt>First Name:</dt>
                                    <dd>{data.member.firstname}</dd>
                                    <dt>Last Name:</dt>
                                    <dd>{data.member.lastname}</dd>
                                    <dt>Date of Birth:</dt>
                                    <dd>{data.member.dateofbirth}</dd>
                                    <dt>Email:</dt>
                                    <dd>{data.member.email}</dd>
                                    <dt>Cell Number:</dt>
                                    <dd>{data.member.cellno}</dd>
                                    <dt>Race:</dt>
                                    <dd>{data.member.race}</dd>
                                    <dt>Gender:</dt>
                                    <dd>{data.member.gender}</dd>
                                    <dt>Country:</dt>
                                    <dd>{data.member.country}</dd>
                                    <dt>Province:</dt>
                                    <dd>{data.member.province}</dd>
                                    <dt>City:</dt>
                                    <dd>{data.member.city}</dd>
                                    <dt>Occupation:</dt>
                                    <dd>{data.member.occupation}</dd>
                                    <dt>Industry:</dt>
                                    <dd>{data.member.industry}</dd>
                                    <dt>Education:</dt>
                                    <dd>{data.member.education}</dd>
                                    <dt>Income:</dt>
                                    <dd>{data.member.income}</dd>
                                    <dt>Alcohol Brands:</dt>
                                    <dd>{data.member.alc_brands}</dd>
                                    <dt>Tobacco Brands:</dt>
                                    <dd>{data.member.tob_brands}</dd>
                                    <dt>intrests:</dt>
                                    <dd>{data.member.intrests}</dd>
                                    <dt>Shopping Behaviour:</dt>
                                    <dd>{data.member.myshopping}</dd>
                                    <dt>Recruit:</dt>
                                    <dd>{data.member.recruit}</dd>
                                </dl>
                                <Mutation mutation={DELETE_MEMBER} key={data.member._id} onCompleted={() => this.props.history.push('/')}>
                                    {(removeMember, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeMember({ variables: { id: data.member._id } });
                                                }}>
                                                <Link to={`/edit/${data.member._id}`}><Button className="btn btn-success">Edit</Button></Link>&nbsp;
                                                <Button type="submit" className="btn btn-danger">Delete</Button>
                                            </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
  }
}

export default Show;