import React from 'react';
import Moment from 'react-moment';
import { Spin } from 'antd';

const PatientInfo = (props) => {
  // display either depending on if patient data and then when loaded
  const patient = props.patient;
  if (patient.length < 1){
    if (props.patientStatus === false){
      return (
        <p>No patient found with this ID. Please search again</p>
      );
    }
    return (
      <Spin />
    );
  }

  // format fields
  const name = `${patient.name[0].given[0]} ${patient.name[0].family[0]}`;

  return (
    <div className="patient-info">
      <p className="patient-name">{name}</p>
      <p className="patient-gender">{patient.gender}</p>
      <p className="patient-birthday">
        <Moment format="MM/DD/YYYY">{patient.birthDate}</Moment>
      </p>
    </div>
  );
}

export default PatientInfo;