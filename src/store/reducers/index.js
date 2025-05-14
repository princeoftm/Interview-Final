// import { combineReducers } from 'redux'
// import init from './init'

// export default combineReducers({
//     initData: init
// })
import { combineReducers } from 'redux'

import user from './user'
import init from './init'

const rootReducer = combineReducers({
  user,
  init
})

export default rootReducer