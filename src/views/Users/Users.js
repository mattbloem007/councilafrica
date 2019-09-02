import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MemberTable from '../../memberTable2';



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


function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user._id}`
  console.log(user)

  // const getBadge = (status) => {
  //   return status === 'Active' ? 'success' :
  //     status === 'Inactive' ? 'secondary' :
  //       status === 'Pending' ? 'warning' :
  //         status === 'Banned' ? 'danger' :
  //           'primary'
  // }

  return (
    <tr key={user._id.toString()}>
      <th scope="row"><Link to={userLink}>{user._id}</Link></th>
      <td><Link to={userLink}>{user.firstname}</Link></td>
      <td>{user.lastname}</td>
   {/*   <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td> **/}
    </tr>
  )
}

class Users extends Component {

  render() {


    return (
    <Query pollInterval={500} query={GET_MEMBERS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${data}`;
    
          return (
            <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <MemberTable rows={data.members} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
          );
        }}
      </Query>
    )
  }
}

export default Users;
