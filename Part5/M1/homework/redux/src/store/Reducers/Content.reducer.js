import {ADDCONTENT} from '../Action_types/content_action_type'

// 定义初始 store 数据
const initialState = {
  content: ['默认数据']
}

// 2.创建 reducer
function reducer (state = initialState, action) {
  // state: reducer  当中处理完数据返回给 store 进行存储的数据
  // action: store 传递给 reducer 的具体指令
  switch(action.type) {
    case ADDCONTENT:
      return {
        content: [
          ...state.content,
          action.payload
        ]
      }
    default:
      return state
  }
}

export default reducer