/* eslint-disable import/prefer-default-export */
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function onDragEnd(result, data, setData) {
  if (!result.destination) {
    return;
  }

  if (result.destination.index === result.source.index) {
    return;
  }

  const updatedDate = reorder(data, result.source.index, result.destination.index);

  setData(updatedDate);
}
