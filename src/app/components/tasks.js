import utils from './utils.js'
import navbar from './navbar.js'
import store from '../store.js'
var state = store.getState()

function createExampleItem(task) {
  return utils.li({
    children: [
      utils.h5({ children: 'Input:' }),
      utils.p({ children: task.input.join(', ') }),
      utils.h5({ children: 'Output:' }),
      utils.p({ children: task.output })
    ],
    className: 'example'
  })
}

var title = utils.h3({ children: state.selectedTask.name })
var description = utils.p({ children: state.selectedTask.description })
var io = utils.ul({ children: state.selectedTask.io.map(createExampleItem) })
var task = utils.article({ children: [title, description, io], className: 'task' })


var solutionTextarea = utils.textarea({ children: '' })

var resetBtn = utils.button({ children: 'Reset', className: 'btn-secondary' })
resetBtn.onclick = function (ev) {
  ev.preventDefault()
  solutionTextarea.value = ''
  var selectedTask = store.getState().selectedTask
  store.dispatch({ type: 'setTask', payload: Object.assign(selectedTask, { info: { passed: 0, failed: 0, total: selectedTask.info.total } }) })
}

var submitBtn = utils.button({ children: 'Submit', className: 'btn-primary' })

submitBtn.onclick = function (ev) {
  ev.preventDefault()

  var selectedTask = store.getState().selectedTask
  var io = store.getState().selectedTask.io

  var info = {
    passed: 0,
    failed: 0,
    total: selectedTask.info.total
  }


  function test({ input, output }) {
    var index = 0

    this.gets = function () {
      return input[index++]
    }

    this.print = function (result) {
      if (String(result).trim() === output) {
        info.passed++
      } else {
        info.failed++
      }
    }

    eval(solutionTextarea.value)
  }

  for (let index = 0; index < io.length; index++) {
    test.call(this, io[index])
  }

  if (info.passed === 0) {
    info.failed = info.total
  }

  solutionTextarea.value = ''
  store.dispatch({ type: 'setTask', payload: Object.assign(selectedTask, { info }) })
}

var solutionForm = utils.form({
  children: [
    solutionTextarea,
    resetBtn,
    submitBtn
  ]
})

var passed = utils.span({ children: state.selectedTask.info.passed + ' passed', className: 'passed' })
var failed = utils.span({ children: state.selectedTask.info.failed + ' failed', className: 'failed' })
var total = utils.span({ children: state.selectedTask.info.total + ' total' })

var solutionInfo = utils.header({
  children: [
    utils.h3({ children: 'Tests: ' }),
    passed,
    failed,
    total
  ]
})

var solution = utils.section({ children: [solutionInfo, solutionForm], className: 'solution' })

store.subscribe(function (newState) {
  title.textContent = newState.selectedTask.name
  description.textContent = newState.selectedTask.description
  passed.textContent = newState.selectedTask.info.passed + ' passed'
  failed.textContent = newState.selectedTask.info.failed + ' failed'
  total.textContent = newState.selectedTask.info.total + ' total'
  task.removeChild(io)
  io = utils.ul({ children: state.selectedTask.io.map(createExampleItem) })
  task.appendChild(io)
})

export default utils.main({ children: [navbar, task, solution], className: 'tasks' })