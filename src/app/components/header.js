import utils from './utils.js'
import store from '../store.js'
var state = store.getState()

var stats = state.topics.reduce(function (currentStats, topic) {
  currentStats.total += topic.tasks.length
  currentStats.solved += topic.tasks.filter(function (task) {
    return task.info.passed === task.info.total
  }).length

  return currentStats
}, { total: 0, solved: 0 })

var title = utils.h1({ children: 'JS Judge' })
var time = utils.p({ children: 'Time 00:00:00' })
var solved = utils.p({ children: 'Solved ' + stats.solved + '/' + stats.total })
var info = utils.p({ children: [time, solved] })

var timestamp = 0

setInterval(function () {
  var hours = String(Math.floor((timestamp / 3600) % 24)).padStart(2, '0')
  var minutes = String(Math.floor((timestamp / 60) % 60)).padStart(2, '0')
  var seconds = String(Math.floor(timestamp % 60)).padStart(2, '0')
  timestamp++

  time.textContent = 'Time ' + hours + ':' + minutes + ':' + seconds
}, 1000)

store.subscribe(function (newState) {
  stats = newState.topics.reduce(function (currentStats, topic) {
    currentStats.total += topic.tasks.length
    currentStats.solved += topic.tasks.filter(function (task) {
      return task.info.passed === task.info.total
    }).length

    return currentStats
  }, { total: 0, solved: 0 })

  solved.textContent = 'Solved ' + stats.solved + '/' + stats.total
})

export default utils.header({ children: [title, info], className: 'header' })
