import React from 'react';
import DataRow from '../components/DataRow';

function DataGeneratorPage() {
  const rows = [{ columnName: 'firstName', columnType: 'firstName' }, { columnName: 'lastName', columnType: 'lastName' }];
  return (
    <div className="App">
      <p className="mb-16">Fake Data Generator</p>
      {rows.map(({ columnName, columnType }) => <DataRow key={`${columnName}${columnType}`} columnName={columnName} columnType={columnType} />)}
    </div>
  );
}

export default DataGeneratorPage;
