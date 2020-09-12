import { arrayOf } from 'prop-types';
import React from 'react';

function OutputBox({ generatedDataRows }) {
  return (
    <div>
      {generatedDataRows.map((row, index) => {
        const valuesArray = [];
        const columns = Object.keys(row);
        columns.forEach((column) => {
          valuesArray.push(row[column]);
        });
        const valuesAsString = valuesArray.join(' ');
        return <div>{`${index + 1}. ${valuesAsString}`}</div>;
      })}
    </div>
  );
}

OutputBox.propTypes = {
  generatedDataRows: arrayOf.isRequired,
};

export default OutputBox;
