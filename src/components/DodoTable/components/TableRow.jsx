import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledTRow = styled(Table.Row)``;

export default class TableRow extends React.Component {
  render() {
    return (
      <StyledTRow>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
        <Table.Cell collapsing>
          <Button icon labelPosition="left" primary size="small">
            <Icon name="edit" />
            Edit
          </Button>
          <Button icon labelPosition="left" negative size="small">
            <Icon name="delete" />
            Delete
          </Button>
        </Table.Cell>
      </StyledTRow>
    );
  }
}
