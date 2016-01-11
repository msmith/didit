const assign = Object.assign || require('object.assign'); // Polyfill maybe needed for browser support

const assignToEmpty = (oldObject, newObject) => {
  return assign({}, oldObject, newObject);
};

const modifyItemInList = (objects, finder, newObject) => {
  var index = objects.findIndex(finder);
  if (index == -1) {
    return objects;
  }
  return [
    ...objects.slice(0, index),
    assignToEmpty(objects[index], newObject),
    ...objects.slice(index + 1)
  ];
};

export { assignToEmpty, modifyItemInList };
