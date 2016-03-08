import * as BookmarksActions from '../bookmarks/actions.js'
import * as TagsActions from '../tags/reduxModule.js'

const MODIFY = BookmarksActions.modifyTags().type
const ADD = TagsActions.add().type

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
