import React from 'react';
import { List, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { parcel } from 'constants/propTypes';
import { sendSMSToCustomer } from 'lib/parcelService';

const StyleWrapper = styled(List)``;

const ListItem = ({ address, customerContact, parcelID, token }) => (
  <List.Item>
    <List.Content floated="right">
      <Button
        color="yellow"
        onClick={sendSMSToCustomer.bind(null, { parcelID }, token)}
      >
        <Icon name="mail" />
        Send SMS
      </Button>
    </List.Content>
    <Icon name="gift" size="large" />
    <List.Content>
      <List.Header>{address}</List.Header>
      <List.Description>{customerContact}</List.Description>
    </List.Content>
  </List.Item>
);

const ParcelsList = props => (
  <StyleWrapper divided verticalAlign="middle">
    {props.parcels.map(p => (
      <ListItem
        key={p._id}
        parcelID={p._id}
        address={p.address}
        customerContact={p.customer_contact}
        token={props.token}
      />
    ))}
  </StyleWrapper>
);
ParcelsList.propTypes = {
  parcels: PropTypes.arrayOf(parcel).isRequired,
  token: PropTypes.string.isRequired,
};

export default ParcelsList;
