/**
 *
 * @param {Object} item
 * @param {Number} index
 * @param {Array} array
 * @param {Object} options
 */
export function addOneAfter(item, index, array, { maxSize = null } = {}) {
  if (maxSize && maxSize >= array.length) return array;
  const updatedArray = [...array];

  updatedArray.splice(index, 0, item);

  return updatedArray;
}

/**
 *
 * @param {Number} index
 * @param {Array} array
 * @param {Object} options
 */
export function removeOne(index, array, { atLeastOne = false } = {}) {
  const updatedArray = [...array];

  if (atLeastOne && array.length < 2) return array;

  updatedArray.splice(index, 1);

  return updatedArray;
}

const ArrayService = {
  addOneAfter,
  removeOne,
};

export default ArrayService;
