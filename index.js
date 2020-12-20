var solutionForm = document.getElementById('solution')
var solutionTextarea = solutionForm.querySelector('textarea')
var solutionUl = solutionForm.querySelector('ul')
var solutionLi = document.createElement('li')

function test(solution) {
  return function ({ input, output }) {
    var solutionInfo = solutionLi.cloneNode(false)

    this.gets = function () {
      return input.shift()
    }

    this.print = function (result) {
      solutionInfo.textContent = result === output.pop() ? 'Success' : 'Fail'
      solutionUl.appendChild(solutionInfo)
    }

    eval(solution)
  }
}

function onSubmit(ev) {
  ev.preventDefault()

  solutionUl.innerHTML = ''

  var cases = [
    {
      input: ['John'],
      output: ['Hello, John']
    },
    {
      input: ['Jane'],
      output: ['Hello, Jane']
    }
  ]

  cases.forEach(test(solutionTextarea.value))

  solutionTextarea.value = ''
}

solutionForm.addEventListener('submit', onSubmit)
