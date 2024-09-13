import { v4 as uuidv4 } from 'uuid'

const mockData = [
    {
        id: uuidv4(),
        title: ' 📃 To Do',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn JavaScript',
                description: 'Learn JavaScript to build interactive websites.',
                priority: 'High'

            },
            {
                id: uuidv4(),
                title: 'Learn Git',
                description: 'Learn Git to manage your codebase.',
                priority: 'Low'
            },
            {
                id: uuidv4(),
                title: 'Learn Python',
                description: 'Learn Python to build web applications.',
                priority: 'Medium'
            },
        ]
    },
    {
        id: uuidv4(),
        title: ' ✏️ In Progress',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn CSS',
                description: 'Learn CSS to style your websites.',
                priority: 'Low'
            },
            {
                id: uuidv4(),
                title: 'Learn Golang',
                description: 'Learn Golang to build scalable applications.',
                priority: 'Medium'
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ⭐ Review',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn GIT',
                description: 'Learn GIT to manage your codebase.',
                priority: 'High'
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Completed',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML',
                description: 'Learn HTML to create web pages.',
                priority: 'Low'
            }
        ]
    }
]

export default mockData