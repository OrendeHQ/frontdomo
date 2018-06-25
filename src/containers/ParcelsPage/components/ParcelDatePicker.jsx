import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';

export default class ParcelDatePicker extends React.Component {
  static propTypes = {
    minDate: PropTypes.object,
    defaultDate: PropTypes.object.isRequired,
    signalDateChange: PropTypes.func.isRequired,
  };
  state = {
    date: undefined,
  };

  handleDateChange = value => {
    this.setState({ date: value });
    this.props.signalDateChange(value);
  };

  render() {
    return (
      <DatePicker
        minDate={new Date()}
        value={new Date(this.state.date || this.props.defaultDate)}
        onChange={this.handleDateChange}
      />
    );
  }
}
