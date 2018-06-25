import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Header,
  Icon,
  Message,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import DodoTable from 'components/DodoTable';
import { fetchAllParcels, toggleParcelEdit } from 'actions';
import { parcelRedux } from 'constants/propTypes';
import { LOADING, ERROR } from 'constants/misc';

const StyleWrapper = styled(Container)``;

class ParcelsPage extends React.Component {
  static propTypes = {
    parcel: parcelRedux,
  };
  state = {
    adding: false,
    showErr: false,
  };

  shouldComponentUpdate(nextProps) {
    if (
      this.props.parcel.status !== ERROR &&
      nextProps.parcel.status === ERROR
    ) {
      if (this.timeoutShowErr) {
        clearTimeout(this.timeoutShowErr);
      }
      if (!this.state.showErr) {
        this.toggleShowErr();
      }
      this.timeoutShowErr = setTimeout(this.toggleShowErr, 10000);

      return this.state.showErr;
    }

    return true;
  }

  componentDidMount() {
    this.props.fetchAllParcels();
  }

  toggleAdding = () => {
    this.setState({ adding: !this.state.adding });
  };

  add = () => {};

  edit = () => {};

  toggleShowErr = () => {
    this.setState({ showErr: !this.state.showErr });
  };

  render() {
    const fields = [
      {
        key: 'address',
        editor: ({ innerRef, ...props }) => (
          <input ref={innerRef} {...props} placeholder="Enter Address..." />
        ),
        display: ({ value, ...props }) => <p {...props}>{value}</p>,
      },
      {
        key: 'date_of_delivery',
        editor: ({ innerRef, ...props }) => (
          <input ref={innerRef} {...props} placeholder="Enter Date..." />
        ),
        display: ({ value, ...props }) => <p {...props}>{value}</p>,
      },
      {
        key: 'customer_contact',
        editor: ({ innerRef, defaultValue, ...props }) => (
          <>
            <label className="ui basic label">+65</label>
            <input
              ref={innerRef}
              defaultValue={defaultValue.substring(3)}
              {...props}
              placeholder="Enter Customer Contact..."
            />
          </>
        ),
        display: ({ value, ...props }) => <p {...props}>{value}</p>,
      },
    ];

    return (
      <StyleWrapper fluid>
        <Grid columns="equal">
          <Grid.Row centered>
            <Header as="h2" icon textAlign="center">
              <Icon name="building" circular />
              <Header.Content>Partners</Header.Content>
            </Header>
          </Grid.Row>
          {this.props.parcel.status === ERROR &&
            this.state.showErr && (
              <Grid.Row centered>
                <Message negative>
                  <p>
                    <strong>Error!</strong> {this.props.parcel.error}
                  </p>
                </Message>
              </Grid.Row>
            )}
          <Grid.Row centered>
            <DodoTable
              loading={this.props.parcel.status === LOADING}
              fields={fields}
              headers={{
                address: 'Address',
                date_of_delivery: 'Date of Delivery',
                customer_contact: 'Customer Contact',
              }}
              rows={this.props.parcel.value}
              toggleEdit={this.props.toggleParcelEdit}
              adding={this.state.adding}
              defaultAddValue={{
                address: '',
                date_of_delivery: new Date().toDateString(),
                customer_contact: '',
                editing: true,
              }}
              addFunc={this.add}
              toggleAdd={this.toggleAdding}
              addButton={() => (
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  positive
                  size="small"
                  onClick={this.toggleAdding}
                >
                  <Icon name="archive" /> Add Parcel
                </Button>
              )}
              editFunc={this.edit}
              deleteFunc={() => {}}
            />
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ parcel }) => ({ parcel }),
  { fetchAllParcels, toggleParcelEdit },
)(ParcelsPage);
