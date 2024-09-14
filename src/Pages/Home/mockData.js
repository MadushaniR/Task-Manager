import { v4 as uuidv4 } from 'uuid';

const mockData = [
    {
        id: uuidv4(),
        title: ' 📃 To Do',
        tasks: [
            {
                id: uuidv4(),
                title: 'Frontend UI Design',
                description: 'Design the user interface for the application.',
                priority: 'high'
            },
            {
                id: uuidv4(),
                title: 'Backend API Development',
                description: 'Develop the backend APIs for the application.',
                priority: 'medium'
            },
            {
                id: uuidv4(),
                title: 'Bug Fix: CSS Layout',
                description: 'Fix layout issues in the CSS styles.',
                priority: 'low'
            },
        ]
    },
    {
        id: uuidv4(),
        title: ' ✏️ In Progress',
        tasks: [
            {
                id: uuidv4(),
                title: 'Frontend Responsive Design',
                description: 'Implement responsive design for mobile and tablet views.',
                priority: 'medium'
            },
            {
                id: uuidv4(),
                title: 'Backend Database Integration',
                description: 'Integrate the application with the database.',
                priority: 'high'
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ⭐ Review',
        tasks: [
            {
                id: uuidv4(),
                title: 'Code Review: Authentication Module',
                description: 'Review the code for the authentication module.',
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
                title: 'Frontend Form Validation',
                description: 'Implement form validation on the frontend.',
                priority: 'low'
            }
        ]
    }
];

export default mockData;
