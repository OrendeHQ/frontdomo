import React from 'react';
import {
  Table,
  Button,
  Icon,
  FormField,
  Modal,
  Header,
} from 'semantic-ui-react';
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
        display: PropTypes.func.isRequired,
      }),
    ).isRequired,
    toggleEdit: PropTypes.func.isRequired,
    saveFunc: PropTypes.func.isRequired,
    entryID: PropTypes.string,
    deleteFunc: PropTypes.func.isRequired,
    extraActions: PropTypes.arrayOf(PropTypes.func).isRequired,
  };
  static defaultProps = {
    entryID: null,
  };
  state = {
    modal: false,
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  save = () => {
    const postObj = {};
    this.props.fields.forEach(({ key }) => {
      postObj[key] = this[key].value;
    });

    if (this.props.entryID) {
      postObj.id = this.props.entryID;
    }

    this.props.saveFunc(postObj);
  };

  delete = () => {
    this.props.deleteFunc();
    this.toggleModal();
  };

  render() {
    return (
      <StyledTRow>
        {this.props.fields.map(
          ({ key, editor: Editor, display: Display }) =>
            this.props.values.editing ? (
              <Table.Cell key={key}>
                <FormField className="ui input field">
                  <Editor
                    defaultValue={this.props.values[key]}
                    innerRef={i => (this[key] = i)}
                  />
                </FormField>
              </Table.Cell>
            ) : (
              <Table.Cell key={key}>
                <Display value={this.props.values[key]} />
              </Table.Cell>
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
              <Button
                icon
                labelPosition="left"
                negative
                size="small"
                onClick={this.toggleModal}
              >
                <Icon name="delete" />
                Delete
              </Button>
              {this.props.extraActions.map((Element, i) => (
                <Element values={this.props.values} key={i} />
              ))}
              <Modal open={this.state.modal} basic size="small">
                <Header icon="delete" content="Confirm Delete" />
                <Modal.Content>
                  <p>Are you sure you want to delete?</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic color="red" inverted onClick={this.toggleModal}>
                    <Icon name="remove" /> No
                  </Button>
                  <Button color="green" inverted onClick={this.delete}>
                    <Icon name="checkmark" /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
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
