import {
  MODIFY_TAGS
} from '../bookmarks/actions.js'
import {
  ADD
} from '../tags/reduxModule.js'

export default ({getState}) => (next) => (action) => {
  let {type, payload} = action

  // deduplicate tags

  if (type !== MODIFY_TAGS || payload.tagAction.type !== ADD) {
    return next(action)
  }

  let {index, tagAction: {payload: {tag}}} = payload

  let {ui: {bookmarks: {items}}} = getState()

  return items[index].tags.includes(tag) ? null : next(action)
}
