import React from 'react';
import { List, Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { parcel } from 'constants/propTypes';

import ListItem from './components/ListItem';

const StyleWrapper = styled(Dimmer.Dimmable)``;

const ParcelsList = props => (
  <StyleWrapper>
    <Dimmer active={props.loading} inverted>
      <Loader />
    </Dimmer>
    <List divided verticalAlign="middle">
      {props.parcels.map(p => (
        <ListItem
          key={p._id}
          parcelID={p._id}
          address={p.address}
          customerContact={p.customer_contact}
          token={props.token}
        />
      ))}
    </List>
  </StyleWrapper>
);
ParcelsList.propTypes = {
  parcels: PropTypes.arrayOf(parcel).isRequired,
  token: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ParcelsList;
