import React from 'react';
import { List, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { sendSMSToCustomer } from 'lib/parcelService';

export default class ListItem extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    customerContact: PropTypes.string.isRequired,
    parcelID: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  };
  state = {
    loading: false,
  };

  sendSMS = () => {
    const { parcelID, token } = this.props;
    this.setState({ loading: true });
    sendSMSToCustomer({ parcelID }, token).finally(() =>
      this.setState({ loading: false }),
    );
  };

  render() {
    return (
      <List.Item>
        <List.Content floated="right">
          <Button color="yellow" onClick={this.sendSMS} animated>
            {this.state.loading ? (
              <>
                <Button.Content visible>
                  <Icon name="hourglass half" />
                  Loading.
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="hourglass start" loading />
                </Button.Content>
              </>
            ) : (
              <>
                <Button.Content visible>
                  <Icon name="mail" />
                  Send SMS
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="send" />
                </Button.Content>
              </>
            )}
          </Button>
        </List.Content>
        <Icon name="gift" size="large" />
        <List.Content>
          <List.Header>{this.props.address}</List.Header>
          <List.Description>{this.props.customerContact}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}
