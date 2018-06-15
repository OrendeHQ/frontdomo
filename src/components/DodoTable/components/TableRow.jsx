import React from 'react';
import { Table, Button, Icon, FormField } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTRow = styled(Table.Row)`
  .ui.input {
    width: 100%;
  }
`;

export default class TableRow extends React.Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        editor: PropTypes.func.isRequired,
      }),
    ).isRequired,
    toggleEdit: PropTypes.func.isRequired,
    saveFunc: PropTypes.func.isRequired,
  };

  save = () => {
    const postObj = {};
    this.props.fields.forEach(({ key }) => {
      postObj[key] = this[key].value;
    });

    this.props.saveFunc(postObj);
  };

  render() {
    return (
      <StyledTRow>
        {this.props.fields.map(
          ({ key, editor: Editor }) =>
            this.props.values.editing ? (
              <Table.Cell key={key}>
                <FormField className="ui input">
                  <Editor
                    defaultValue={this.props.values[key]}
                    innerRef={i => (this[key] = i)}
                  />
                </FormField>
              </Table.Cell>
            ) : (
              <Table.Cell key={key}>{this.props.values[key]}</Table.Cell>
            ),
        )}
        <Table.Cell collapsing>
          {!this.props.values.editing ? (
            <>
              <Button
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={this.props.toggleEdit}
              >
                <Icon name="edit" />
                Edit
              </Button>
              <Button icon labelPosition="left" negative size="small">
                <Icon name="delete" />
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                icon
                labelPosition="left"
                positive
                size="small"
                onClick={this.save}
              >
                <Icon name="check" />
                Save
              </Button>
              <Button
                icon
                labelPosition="left"
                size="small"
                onClick={this.props.toggleEdit}
              >
                <Icon name="close" />
                Cancel
              </Button>
            </>
          )}
        </Table.Cell>
      </StyledTRow>
    );
  }
}
