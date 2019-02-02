import React, { Component } from 'react';
import { Table } from 'antd';
import Moment from 'react-moment';

class ConditionTable extends Component {
  constructor(props){
    super(props);

    this.state = { 
      conditions: [],
      loading: true
   };
  }

  render(){

    const columns = [{
      title: 'Condition Name',
      dataIndex: 'condition',
      key: 'condition.id',
      sorter: (a, b) => a.condition.length - b.condition.length,
      width: 250,
    },
    {
      title: 'Date First Recorded',
      dataIndex: 'date',
      key: 'date.id',
      width: 100,
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.date - b.date,
      render: (text, record) => (
        <Moment format="MM/DD/YYYY">{text}</Moment>
      )
    },
    {
      title: 'PubMed Details',
      dataIndex: 'condition',
      key: 'pubmed',
      width: 100,
      render: (text, record) => (
        <span>
          <a href={record.link} target='_blank'>Search Here</a>
        </span>
      )
    }];

    return (
      <Table
        columns={columns}
        bordered
        loading={this.props.loading}
        // loading
        dataSource={this.props.conditions}
      />
    );
  }
}

export default ConditionTable;