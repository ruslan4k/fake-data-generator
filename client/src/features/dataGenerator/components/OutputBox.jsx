import { array } from 'prop-types';
import React from 'react';
import { DEFAULT_KEY_NAME } from '../../../constants/dataGenerationConstants';

function OutputBox({ generatedDataRows }) {
  return (
    <div className="mt-20">
      {generatedDataRows.map((row, index) => {
        const valuesArray = [];
        const columns = Object.keys(row);
        columns.forEach((column) => {
          if (column !== DEFAULT_KEY_NAME) { valuesArray.push(row[column]); }
        });
        const valuesAsString = valuesArray.join(' ');
        // eslint-disable-next-line no-underscore-dangle
        return <div key={row[DEFAULT_KEY_NAME]}>{`${index + 1}. ${valuesAsString}`}</div>;
      })}
    </div>
  );
}

OutputBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  generatedDataRows: array.isRequired,
};

export default OutputBox;
