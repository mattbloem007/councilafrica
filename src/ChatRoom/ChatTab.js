import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Chat from './Chat'

class ChatTab extends Component {
  render() {
    return (
      <div className="animated fadeIn">
            <Chat />
      </div>
    );
  }
}

export default ChatTab;
