import React from 'react';
import { Table, Loader, Dimmer } from 'semantic-ui-react';
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
        display: PropTypes.func.isRequired,
      }),
    ).isRequired,
    headers: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleAdd: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    adding: PropTypes.bool.isRequired,
    defaultAddValue: PropTypes.object.isRequired,
    addButton: PropTypes.func.isRequired,
    addFunc: PropTypes.func.isRequired,
    editFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
  };

  render() {
    const AddButton = this.props.addButton;

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
                entryID={_id}
                values={rest}
                toggleEdit={() => this.props.toggleEdit(i)}
                saveFunc={this.props.editFunc}
                deleteFunc={this.props.deleteFunc.bind(null, { id: _id })}
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
                <Table.HeaderCell colSpan="99">
                  <AddButton />
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Footer>
        </Table>
      </StyleWrapper>
    );
  }
}
