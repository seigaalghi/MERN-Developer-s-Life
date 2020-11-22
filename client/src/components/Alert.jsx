import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return (
    <div className={`alert-fade-out ${alerts.length > 0 ? ' alert-fade-in' : ''}`}>
      {alerts.slice(Math.max(0, alerts.length - 3), alerts.length).map((alert) => (
        <div className={`alert alert-${alert.alertType}`} key={alert.id}>
          {alert.msg}
        </div>
      ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};

export default connect(mapStateToProps, null)(Alert);
