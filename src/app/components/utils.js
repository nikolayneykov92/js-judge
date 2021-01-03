function createElement(tagName) {
  var element = document.createElement(tagName)

  return function (params) {
    var clonedElement = element.cloneNode(false)

    if (params.className) {
      clonedElement.className = params.className
    }

    if (Array.isArray(params.children)) {
      clonedElement.append.apply(clonedElement, params.children)
    } else if (typeof params.children === 'string') {
      clonedElement.textContent = params.children
    }

    return clonedElement
  }
}

export default {
  textarea: createElement('textarea'),
  article: createElement('article'),
  section: createElement('section'),
  header: createElement('header'),
  button: createElement('button'),
  aside: createElement('aside'),
  main: createElement('main'),
  form: createElement('form'),
  span: createElement('span'),
  nav: createElement('nav'),
  h1: createElement('h1'),
  h2: createElement('h2'),
  h3: createElement('h3'),
  h4: createElement('h4'),
  h5: createElement('h5'),
  h6: createElement('h6'),
  ul: createElement('ul'),
  li: createElement('li'),
  p: createElement('p'),
}
