import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Message,
  Loader,
  Dimmer,
  Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getParcelBarcode } from 'lib/parcelService';

export default class BarcodeBtn extends React.Component {
  state = {
    barcode: '',
    modal: false,
    error: '',
    loading: false,
  };
  static propTypes = {
    parcelID: PropTypes.string.isRequired,
    authToken: PropTypes.string.isRequired,
  };

  toggleModal = () => {
    if (this.state.barcode) {
      this.setState({ modal: true });
      return;
    }

    this.setState({ loading: true, modal: true });
    const { parcelID, authToken } = this.props;
    getParcelBarcode({ id: parcelID }, authToken)
      .then(barcode => this.setState({ barcode, loading: false }))
      .catch(({ message }) =>
        this.setState({ error: message, loading: false }),
      );
  };

  closeModal = () => {
    this.setState({ modal: false });
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
          <Icon name="barcode" /> Get Barcode
        </Button>
        <Modal
          open={this.state.modal}
          size="small"
          onClose={this.closeModal}
          closeOnEscape
          closeOnDimmerClick
        >
          <Modal.Header>Parcel {this.props.parcelID} Barcode</Modal.Header>
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
              <Image src={this.state.barcode} />
              <Button
                as="a"
                href={this.state.barcode}
                download={this.props.parcelID}
                positive
              >
                <Icon name="download" /> Download
              </Button>
            </Dimmer.Dimmable>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}
