import { v4 as uuidv4 } from 'uuid'

const mockData = [
    {
        id: uuidv4(),
        title: ' 📃 To do',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn JavaScript',
                description: 'Learn JavaScript to build interactive websites.'
            },
            {
                id: uuidv4(),
                title: 'Learn Git',
                description: 'Learn Git to manage your codebase.'
            },
            {
                id: uuidv4(),
                title: 'Learn Python',
                description: 'Learn Python to build web applications.'
            },
        ]
    },
    {
        id: uuidv4(),
        title: ' ✏️ In progress',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn CSS',
                description: 'Learn CSS to style your websites.'
            },
            {
                id: uuidv4(),
                title: 'Learn Golang',
                description: 'Learn Golang to build scalable applications.'
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
                description: 'Learn HTML to create web pages.'
            }
        ]
    }
]

export default mockData