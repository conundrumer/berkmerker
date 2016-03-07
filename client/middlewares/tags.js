import {modifyTags} from '../bookmarks/reduxModule.js'
import {add} from '../tags/reduxModule.js'

const {type: MODIFY} = modifyTags()
const {type: ADD} = add()

export default ({getState}) => (next) => (action) => {
  let {type, payload} = action

  // deduplicate tags

  if (type !== MODIFY || payload.tagAction.type !== ADD) {
    return next(action)
  }

  let {index, tagAction: {payload: {tag}}} = payload

  let {ui: {bookmarks: {items}}} = getState()

  return items[index].tags.includes(tag) ? null : next(action)
}
