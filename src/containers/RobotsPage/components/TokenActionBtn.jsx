import React from 'react';
import {
  Button,
  Modal,
  Input,
  Dimmer,
  Loader,
  Icon,
  Popup,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Clipboard from 'react-clipboard.js';

import { BASE_URL } from 'constants/misc';
import serviceTemplate from 'lib/serviceTemplate';

export default class TokenActionBtn extends React.Component {
  state = {
    token: '',
    modal: false,
    error: '',
    loading: false,
    popup: false,
  };
  static propTypes = {
    robotID: PropTypes.string.isRequired,
    authToken: PropTypes.string.isRequired,
  };

  toggleModal = () => {
    if (this.state.token) {
      this.setState({ modal: true });
      return;
    }

    this.setState({ loading: true, modal: true });
    serviceTemplate(
      fetch(`${BASE_URL}/robot/token/${this.props.robotID}`, {
        method: 'GET',
        headers: { Authorization: this.props.authToken },
      }),
    )
      .then(({ token }) => this.setState({ token, loading: false }))
      .catch(({ message }) =>
        this.setState({ error: message, loading: false }),
      );
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  openPopup = () => {
    this.setState({ popup: true });
    if (this.popTimeout) {
      clearTimeout(this.popTimeout);
    }
    this.popTimeout = setTimeout(() => this.setState({ popup: false }), 3000);
  };

  render() {
    return (
      <>
        <Button
          icon
          labelPosition="left"
          color="yellow"
          size="small"
          onClick={this.toggleModal}
        >
          <Icon name="lock open" /> Get Robot Token
        </Button>
        <Modal
          open={this.state.modal}
          size="small"
          onClose={this.closeModal}
          closeOnEscape
          closeOnDimmerClick
        >
          <Modal.Header>Robot Token</Modal.Header>
          <Modal.Content>
            {this.state.error && (
              <Message negative>
                <strong>Error!</strong> {this.state.error}
              </Message>
            )}
            <Dimmer active={this.state.loading} inverted>
              <Loader />
            </Dimmer>
            <Dimmer.Dimmable>
              <Input
                style={{ width: '100%' }}
                action={
                  <Clipboard
                    data-clipboard-text={this.state.token}
                    onSuccess={this.openPopup}
                    className="ui small icon yellow right labeled button"
                  >
                    <>
                      <i aria-hidden="true" className="icon copy" />
                      Copy
                      <Popup
                        trigger={
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '3px',
                              left: '50px',
                            }}
                          />
                        }
                        inverted
                        content="Copied!"
                        open={this.state.popup}
                        onOpen={this.openPopup}
                        position="bottom center"
                      />
                    </>
                  </Clipboard>
                }
                value={this.state.token}
              />
            </Dimmer.Dimmable>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}
