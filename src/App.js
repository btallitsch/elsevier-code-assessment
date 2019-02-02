import React, { Component } from 'react';

import PatientInfo from './components/patient_info.js';
import SearchBar from './components/search_bar.js';
import ConditionTable from './components/condition_table.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      patient: [],
      conditions: [],
      validPatient: false,
      conditionsFound: false,
      loading: true
    }

    this.searchForPatient = this.searchForPatient.bind(this);
  }

  searchForPatient(id){
    // reset state when a new search is submitted
    this.setState({
      patient: [],
      conditions: [],
      loading: true
    });

    // Simultaneously get person array and condition array with id 
    const personUrl = `https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient?_id=${id}`;
    const conditionUrl = `https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Condition?patient=${id}`;

    fetch(personUrl, {
      headers: {"accept": "application/json+fhir"}
    })
    .then(response => response.json())
    .then(data => {
      // see if patient exists
      if (data.total < 1) {
        this.setState({
          patient: [],
          validPatient: false
        });
      } else {
        this.setState({
          patient: data.entry[0].resource,
          validPatient: true
        });
      }
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

    fetch(conditionUrl, {
      headers: {"accept": "application/json+fhir"}
    })
    .then(response => response.json())
    .then(data => {
      // see if any conditions for the patient exist
      if (data.total < 1) {
        this.setState({
          conditions: [],
          conditionsFound: false,
          loading: true
        });
      } else {
        // reduce the specific data we need into an object for the array
        let conditionsArr = data.entry.reduce((conditions, condition)=> {
          const conditionObj = {
            condition: condition.resource.code.text,
            date: condition.resource.dateRecorded,
            link: `https://www.ncbi.nlm.nih.gov/pubmed/?term=${condition.resource.code.text}`
          };
          conditions.push(conditionObj);
          return conditions;
        }, []);

        this.setState({
          conditions: conditionsArr,
          conditionsFound: true,
          loading: false
        });
      }
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
  }

  componentDidMount(){
    this.searchForPatient(4642007);
    console.table([
      'Smart, Valerie (id: 4596007)',
      'Smart, Wilma (id: 4342008)',
      'Smart, Nancy (id: 4342009)',
      'Smart, Joe (id: 4342010)',
      'Smart, Hailey (id: 4342011',
      'Smart, Timmy (id: 4342012)',
      'Smart, Fred (id: 4478007)',
      'Peters, Tim (id: 1316024)'
    ]);
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">Patient Information</h1>
        <PatientInfo
          patient={this.state.patient}
          patientStatus={this.state.validPatient}
        />
        <SearchBar onSearchTermChange={this.searchForPatient} />
        <ConditionTable 
          conditions={this.state.conditions}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default App;
