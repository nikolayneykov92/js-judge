import utils from './utils.js'
import store from '../store.js'
var state = store.getState()

function createNavItem(task) {
  var navItem = utils.li({
    children: [
      utils.span({ children: task.name })
    ]
  })

  navItem.onclick = function () {
    store.dispatch({ type: 'setTask', payload: task })
  }

  if (task.id === state.selectedTask.id) {
    navItem.classList.add('active')
  }

  if (task.info.passed === task.info.total) {
    navItem.classList.add('solved')
  }

  store.subscribe(function (newState) {
    if (task.id === newState.selectedTask.id) {
      navItem.classList.add('active')
    } else {
      navItem.classList.remove('active')
    }

    if (task.info.passed === task.info.total) {
      navItem.classList.add('solved')
    } else {
      navItem.classList.remove('solved')
    }
  })

  return navItem
}

var navList = utils.ul({ children: state.selectedTopic.tasks.map(createNavItem) })

store.subscribe(function (newState) {
  while (navList.children.length > 0) {
    navList.removeChild(navList.children[navList.children.length - 1])
  }

  navList.append.apply(navList, newState.selectedTopic.tasks.map(createNavItem))
})

export default utils.nav({ children: [navList], className: 'navbar' })

