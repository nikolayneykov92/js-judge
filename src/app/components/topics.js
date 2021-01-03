import utils from './utils.js'
import store from '../store.js'
var state = store.getState()

function createTopicItem(topic) {
  var topicItem = utils.li({ children: topic.name, className: topic.id === state.selectedTopic.id ? 'active' : '' })

  topicItem.onclick = function () {
    store.dispatch({ type: 'setTopic', payload: topic })
  }

  store.subscribe(function (newState) {
    if (topic.id === newState.selectedTopic.id) {
      topicItem.classList.add('active')
    } else {
      topicItem.classList.remove('active')
    }
  })

  return topicItem
}

var title = utils.h4({ children: 'Topics' })
var topicList = utils.ul({ children: state.topics.map(createTopicItem) })

export default utils.aside({ children: [title, topicList], className: 'topics' })