import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTRow = styled(Table.Row)``;

export default class TableRow extends React.Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    return (
      <StyledTRow>
        {this.props.keys.map(k => (
          <Table.Cell key={k}>{this.props.values[k]}</Table.Cell>
        ))}
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
