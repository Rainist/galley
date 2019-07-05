import * as _ from 'lodash';

export function fillAorB(a, b) {
  if (_.isObject(a)){
    return _.mergeWith(a, b, fillAorB)
  }
  return a || b
}
