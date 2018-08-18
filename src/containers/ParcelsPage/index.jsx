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
import {
  fetchAllParcels,
  toggleParcelEdit,
  addNewParcel,
  editExistingParcel,
  removeParcel,
} from 'actions';

import { parcelRedux, token as tokenType } from 'constants/propTypes';
import { LOADING, ERROR } from 'constants/misc';
import ParcelDatePicker from './components/ParcelDatePicker';
import BarcodeBtn from './components/BarcodeBtn';

const StyleWrapper = styled(Container)`
  .react-date-picker {
    .react-date-picker__button {
      padding: 0 1em;
      border-radius: 0.28571429rem;
      height: 40px;
      border: 1px solid rgba(34, 36, 38, 0.15);
      line-height: 1.21428571em;
      font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
      color: rgba(0, 0, 0, 0.87);
    }
  }
`;

class ParcelsPage extends React.Component {
  static propTypes = {
    parcel: parcelRedux,
    token: tokenType,
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

  setDate = date => {
    this.date = date;
  };

  add = parcel => {
    parcel.date_of_delivery = this.date || new Date();
    parcel.customer_contact = '+65' + parcel.customer_contact;
    this.props.addNewParcel(parcel);
    this.date = undefined;
    this.toggleAdding();
  };

  edit = parcel => {
    parcel.date_of_delivery = this.date;
    parcel.customer_contact = '+65' + parcel.customer_contact;
    this.props.editExistingParcel(parcel);
    this.date = undefined;
  };

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
        editor: ({ defaultValue }) => (
          <ParcelDatePicker
            minDate={new Date()}
            defaultDate={new Date(defaultValue)}
            signalDateChange={this.setDate}
          />
        ),
        display: ({ value, ...props }) => (
          <p {...props}>{new Date(value).toDateString()}</p>
        ),
      },
      {
        key: 'customer_contact',
        editor: ({ innerRef, defaultValue, ...props }) => (
          <>
            <label className="ui basic label">+65</label>
            <input
              ref={innerRef}
              defaultValue={defaultValue.substring(3)}
              type="number"
              min="0"
              step="1"
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
              <Icon name="gift" circular />
              <Header.Content>Parcels</Header.Content>
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
                date_of_delivery: new Date(),
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
              deleteFunc={this.props.removeParcel}
              extraActions={[
                ({ values }) => (
                  <BarcodeBtn
                    parcelID={values._id}
                    authToken={this.props.token.value}
                  />
                ),
              ]}
            />
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ parcel, token }) => ({ parcel, token }),
  {
    fetchAllParcels,
    toggleParcelEdit,
    addNewParcel,
    editExistingParcel,
    removeParcel,
  },
)(ParcelsPage);
