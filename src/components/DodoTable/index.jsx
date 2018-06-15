import React from 'react';
import { Table, Button, Icon, Loader, Dimmer } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TableRow from './components/TableRow';

const StyledTable = styled(Table)``;

export default class DodoTable extends React.Component {
  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    headers: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <StyledTable compact celled>
        <Dimmer active={this.props.loading} inverted>
          <Loader />
        </Dimmer>
        <Table.Header>
          <Table.Row>
            {this.props.fields.map((v, i) => (
              <Table.HeaderCell key={i}>
                {this.props.headers[v]}
              </Table.HeaderCell>
            ))}
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.rows.map(({ _id, ...rest }) => (
            <TableRow key={_id} keys={this.props.fields} values={rest} />
          ))}
        </Table.Body>

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
