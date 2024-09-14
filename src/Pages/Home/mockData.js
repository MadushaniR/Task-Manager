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
                priority: 'high' 

            },
            {
                id: uuidv4(),
                title: 'Learn Git',
                description: 'Learn Git to manage your codebase.',
                priority: 'low' 
            },
            {
                id: uuidv4(),
                title: 'Learn Python',
                description: 'Learn Python to build web applications.',
                priority: 'medium' 
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
                priority: 'low' 
            },
            {
                id: uuidv4(),
                title: 'Learn Golang',
                description: 'Learn Golang to build scalable applications.',
                priority: 'medium' 
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ⭐ Review',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn CSS',
                description: 'Learn CSS to style your websites.',
                priority: 'high' 
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
                priority: 'low'
            }
        ]
    }
];

export default mockData;
