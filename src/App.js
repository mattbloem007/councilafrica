import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MemberTable from './memberTable2';


const GET_MEMBERS = gql`
  {
    members {
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



class App extends Component {

  render() {
    return (
      <Query pollInterval={500} query={GET_MEMBERS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${data}`;
    
          return (
            <div className="container">
                <MemberTable rows={data.members} />
            </div>
          );
        }}
      </Query>
    );
}
}

export default App;
