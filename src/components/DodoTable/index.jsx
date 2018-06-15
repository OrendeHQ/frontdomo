import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import TableRow from './components/TableRow';

const StyledTable = styled(Table)``;

export default class DodoTable extends React.Component {
  render() {
    return (
      <StyledTable compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Premium Plan</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{[1, 2, 3].map(i => <TableRow key={i} />)}</Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                positive
                size="small"
              >
                <Icon name="building" /> Add Partner
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </StyledTable>
    );
  }
}
