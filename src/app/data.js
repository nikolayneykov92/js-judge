export default [
  {
    name: 'Operators',
    tasks: [
      {
        name: '01. Sum',
        description: 'Write a program that takes 2 numbers  as input and prints their sum as output.',
        io: [
          { input: ['4', '2'], output: '6' },
          { input: ['4', '-2'], output: '2' },
          { input: ['-4', '2'], output: '-2' },
        ],
      },
      {
        name: '02. Subtract',
        description: 'Write a program that reads 2 numbers and prints as result their subtraction.',
        io: [
          { input: ['3', '5'], output: '-2' },
          { input: ['-3', '5'], output: '-8' },
          { input: ['-5', '3'], output: '-8' },
        ]
      },
      {
        name: '03. Multiply',
        description: 'Write a program that reads 2 numbers and prints their product.',
        io: [
          { input: ['2', '3'], output: '6' },
        ]
      },
      {
        name: '04. Divide',
        description: 'Write a program that takes 2 numbers as input and prints their division as output.',
        io: [
          { input: ['6', '2'], output: '3' },
        ]
      },
    ]
  },
  {
    name: 'Conditionals',
    tasks: [
      {
        name: '01. Bigger Number',
        description: 'Write a program that takes two numbers as input and prints the bigger one as output',
        io: [
          { input: ['2', '5'], output: '5' },
          { input: ['-1', '8'], output: '8' },
          { input: ['3', '0'], output: '3' },
        ],
      },
    ]
  },
  {
    name: 'Loops',
    tasks: [
      {
        name: '01. Numbers from 1 to 10',
        description: 'Write a program that prints the numbers from one to N joined with a white space as output',
        io: [
          { input: ['5'], output: '1 2 3 4 5' },
        ],
      },
    ]
  },
  {
    name: 'Arrays',
    tasks: [
      {
        name: '01. Test',
        description: 'Test',
        io: [
          { input: ['test'], output: 'test' },
        ],
      },
    ]
  }
].map(function (topic, topicIndex) {
  return Object.assign(topic, {
    id: topicIndex,
    tasks: topic.tasks.map(function (task, taskIndex) {
      return Object.assign(task, {
        id: taskIndex,
        info: {
          passed: 0,
          failed: 0,
          total: task.io.length
        }
      })
    })
  })
})
