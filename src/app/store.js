import data from './data.js'

function reducer(state, action) {
  if (action.type === 'setTopic') {
    return Object.assign(state, { selectedTopic: action.payload, selectedTask: action.payload.tasks[0] })
  } else if (action.type === 'setTask') {
    return Object.assign(state, { selectedTask: action.payload })
  }

  return state
}

function notifyListener(newState) {
  return function (listener) {
    listener(newState)
  }
}

function createStore(state) {
  var state = {
    topics: data,
    selectedTopic: data[0],
    selectedTask: data[0].tasks[0]
  }

  var listeners = []

  return {
    getState: function () {
      return state
    },
    dispatch: function (action) {
      state = reducer(state, action)

      listeners.forEach(notifyListener(state))
    },
    subscribe: function (listener) {
      var listenerIndex = listeners.push(listener) - 1

      return function () {
        listeners.splice(listenerIndex, 1)
      }
    }
  }
}

export default createStore()