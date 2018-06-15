import React from 'react';
import { Table, Button, Icon, Loader, Dimmer } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TableRow from './components/TableRow';

const StyleWrapper = styled(Dimmer.Dimmable)`
  width: 100%;
`;

export default class DodoTable extends React.Component {
  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        editor: PropTypes.func.isRequired,
      }),
    ).isRequired,
    headers: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    adding: PropTypes.bool.isRequired,
    defaultAddValue: PropTypes.object.isRequired,
    toggleAdd: PropTypes.func.isRequired,
    addFunc: PropTypes.func.isRequired,
  };

  render() {
    return (
      <StyleWrapper>
        <Dimmer active={this.props.loading} inverted>
          <Loader />
        </Dimmer>
        <Table compact celled>
          <Table.Header>
            <Table.Row>
              {this.props.fields.map(({ key }, i) => (
                <Table.HeaderCell key={i}>
                  {this.props.headers[key]}
                </Table.HeaderCell>
              ))}
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.rows.map(({ _id, ...rest }, i) => (
              <TableRow
                key={_id}
                fields={this.props.fields}
                values={rest}
                toggleEdit={() => this.props.toggleEdit(i)}
                saveFunc={() => {}}
              />
            ))}
            {this.props.adding && (
              <TableRow
                fields={this.props.fields}
                values={this.props.defaultAddValue}
                toggleEdit={this.props.toggleAdd}
                saveFunc={this.props.addFunc}
              />
            )}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              {!this.props.adding && (
                <Table.HeaderCell colSpan="4">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    positive
                    size="small"
                    onClick={this.props.toggleAdd}
                  >
                    <Icon name="building" /> Add Partner
                  </Button>
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Footer>
        </Table>
      </StyleWrapper>
    );
  }
}
