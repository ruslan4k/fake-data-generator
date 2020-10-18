/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { func, array, object } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DataColumnItem from './DataColumnItem';

import { onDragEnd } from '../../../helpers/dndHelpers';

function DataColumns({ setColumns, columns, duplicatedColumnNames }) {
  const handleChangeDataRow = (event, index, field) => {
    const newValue = event.target.value;
    const updatedDataColumns = columns.slice();
    if (field === 'isCustomDomainEnabled') {
      updatedDataColumns[index][field] = !updatedDataColumns[index][field];
    } else {
      updatedDataColumns[index][field] = newValue;
    }
    setColumns(updatedDataColumns);
  };

  const handleDeleteDataRow = (indexOfRowToDelete) => {
    const updatedDataColumns = columns.filter((row, index) => index !== indexOfRowToDelete);
    setColumns(updatedDataColumns);
  };

  function handleDragEnd(result) {
    onDragEnd(result, columns, setColumns);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {columns.map(({ columnName, columnType, id, isCustomDomainEnabled, customDomain }, index) => (
                <Draggable draggableId={id} index={index} key={id}>
                  {(providedTwo) => {
                    const dragHandleProps = { ...providedTwo.dragHandleProps };
                    return (
                      <div ref={providedTwo.innerRef} {...providedTwo.draggableProps}>
                        <DataColumnItem
                          key={id}
                          dragHandleProps={dragHandleProps}
                          columnName={columnName}
                          columnType={columnType}
                          customDomain={customDomain}
                          isCustomDomainEnabled={isCustomDomainEnabled}
                          handleChangeDataRowColumnName={(event) => handleChangeDataRow(event, index, 'columnName')}
                          handleChangeDataRowColumnType={(event) => handleChangeDataRow(event, index, 'columnType')}
                          handleChangeShowCustomDomainField={(event) =>
                            handleChangeDataRow(event, index, 'isCustomDomainEnabled')
                          }
                          handleChangeCustomDomainField={(event) => handleChangeDataRow(event, index, 'customDomain')}
                          handleDeleteDataRow={() => handleDeleteDataRow(index)}
                          isDuplicatedColumnName={Boolean(duplicatedColumnNames[columnName])}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

DataColumns.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  columns: array.isRequired,
  setColumns: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  duplicatedColumnNames: object.isRequired,
};

export default DataColumns;
