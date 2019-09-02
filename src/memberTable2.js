import React, { Component, useState } from 'react';
import {BootstrapTable, TableHeaderColumn, ExportCSVButton, DeleteButton, InsertButton, InsertModalHeader, InsertModalFooter} from 'react-bootstrap-table';
import Create from './components/Create'
import Show from './components/Show'
import { Link } from 'react-router-dom';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import EditMember from './components/EditMember'

const handleExportCSVButtonClick = (onClick) => {
  // Custom your onClick event here,
  // it's not necessary to implement this function if you have no any process before onClick
  console.log('This is my custom function for ExportCSVButton click event');
  onClick();
}

const createCustomExportCSVButton = (onClick) => {
  return (
    <ExportCSVButton
      btnText='Export to CSV'
      onClick={ () => handleExportCSVButtonClick(onClick) }/>
  );
}

// const handleInsertButtonClick = (history) => {
//   console.log(history) 
// }
// const createCustomInsertButton = (history) => {
//   return (
//     <InsertButton
//       btnText='Create Member'
//       btnContextual='btn-warning'
//       className='my-custom-class'
//       btnGlyphicon='glyphicon-edit'
//       onClick={ () => this.handleInsertButtonClick(history) }/>
//   );
// }

function handleDeleteButtonClick(next, dropRowKeys) {
  //Call mutation to delete selected rows
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql"
  });

  for (let i = 0; i < dropRowKeys.length; i++) {

    client.mutate({
      variables: { id: dropRowKeys[i] },
      mutation: gql`
        mutation removeMember($id: String!) {
        removeMember(id:$id) {
        _id
        }
      }
    `,
  
})
.then(result => { 
  console.log(result)
 })
.catch(error => { console.log(error) });

  }
  // onClick();
}

const createCustomDeleteButton = (onClick) => {
  return (
    <DeleteButton
      btnText='Delete'
      btnContextual='btn-warning'
      className='my-custom-class'
      btnGlyphicon='glyphicon-edit'
      />
  );
}

const handleModalClose = (closeModal) => {
  // Custom your onCloseModal event here,
  // it's not necessary to implement this function if you have no any process before modal close
  console.log('This is my custom function for modal close event');
  closeModal();
}

const createCustomModalBody = (closeModal, save) => {

   const headerStyle = {
      fontWeight: 'bold',
      fontSize: 'large',
      textAlign: 'center',
      backgroundColor: '#eeeeee'
    };

  // If you want have more power to custom the child of InsertModalHeader,
  // you can do it like following
  return (
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
         <div className="modal-header">
          <h5 className="modal-title">Member Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Create />
          </div>
        </div>
      </div>
  );
}

const createCustomModalHeader = (closeModal, save) => {
  return (
    <div style={{display: "none"}} />
  );

}

const createCustomModalFooter = (closeModal, save) => {
  return (
     <div style={{display: "none"}}>
    </div>
  );
}

const handleRowClick = (row, isSelected, e) => {
  console.log("clicked:" + row)
}


const MemberTable = ({ rows, history }) => {

  const selectRow = {
    mode: 'checkbox',
    bgColor: 'pink',
    className: 'my-selection-custom',
    onSelect: handleRowClick
  };

  const cellEditProp = {
    mode: 'dbclick'
  };

  const options = {
   onRowClick: function(row, columnIndex, rowIndex, e) {
    const link = '/show/' + row._id;
    console.log(link)
    history.push(link);
  },
  // onAddRow: function() {
  //   history.push('/create')
  // },
  exportCSVBtn: createCustomExportCSVButton,
  deleteBtn: createCustomDeleteButton,
  handleConfirmDeleteRow: handleDeleteButtonClick,
  insertBtn: function(onClick) {
    return (
    <InsertButton
      btnText='Create Member'
      btnContextual='btn-info'
      className='my-custom-class'
      btnGlyphicon='glyphicon-edit'
      onClick={ () => history.push('/create') }/>
  );
  },
  // insertModalHeader: createCustomModalHeader,
  // insertModalBody: createCustomModalBody,
  // insertModalFooter: createCustomModalFooter,
  printToolBar: false

};

  return (
    <BootstrapTable data={rows} selectRow={ selectRow }  cellEdit={ cellEditProp } striped hover search={ true } options={options} exportCSV pagination deleteRow insertRow>
      <TableHeaderColumn isKey dataField='firstname' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>First Name</TableHeaderColumn>
      <TableHeaderColumn dataField='lastname' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Last Name</TableHeaderColumn>
      <TableHeaderColumn dataField='dateofbirth' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Date of Birth</TableHeaderColumn>
      <TableHeaderColumn dataField='email' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Email</TableHeaderColumn>
      <TableHeaderColumn dataField='cellno' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Cell Number</TableHeaderColumn>
      <TableHeaderColumn dataField='race' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Race</TableHeaderColumn>
      <TableHeaderColumn dataField='gender' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Gender</TableHeaderColumn>
      <TableHeaderColumn dataField='country' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Country</TableHeaderColumn>
      <TableHeaderColumn dataField='province' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Province</TableHeaderColumn>
      {/**
      <TableHeaderColumn dataField='city' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>City</TableHeaderColumn>
      <TableHeaderColumn dataField='occupation' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Employment Status</TableHeaderColumn>
      <TableHeaderColumn dataField='industry' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Industry</TableHeaderColumn>
      <TableHeaderColumn dataField='education' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Education Level</TableHeaderColumn>
      <TableHeaderColumn dataField='income' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Income Range</TableHeaderColumn>
      <TableHeaderColumn dataField='alc_brands' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Alcohol Brands</TableHeaderColumn>
      <TableHeaderColumn dataField='tob_brands' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Tobacco Brands</TableHeaderColumn>
      <TableHeaderColumn dataField='intrests' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Intrests</TableHeaderColumn>
      <TableHeaderColumn dataField='myshopping' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Shopping Behaviour</TableHeaderColumn>
      <TableHeaderColumn dataField='recruit' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Recruit Again?</TableHeaderColumn>*/}
  </BootstrapTable>
  );
}

export default MemberTable;