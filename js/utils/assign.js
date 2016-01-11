const assign = Object.assign || require('object.assign'); // Polyfill maybe needed for browser support

const assignToEmpty = (oldObject, newObject) => {
  return assign({}, oldObject, newObject);
};

const modifyItemInList = (list, itemFinder, newObject) => {
  const index = list.findIndex(itemFinder);
  if (index === -1) {
    // item wasn't found, return unmodified list
    return list;
  }
  return [
    ...list.slice(0, index),
    assignToEmpty(list[index], newObject),
    ...list.slice(index + 1)
  ];
};

export { assignToEmpty, modifyItemInList };
