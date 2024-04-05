import { nanoid } from 'nanoid';

const projects = [
    {
        id: nanoid(),
        name: '<a href="https://rst.sk" target=_blank>RST.sk</a>',
        description: 'Built in nuxt.js, this is a website for a company that provides hardware computer services.',
        image: require('@/assets/portfolio/rst.png'),
        link: 'https://github.com/diana2482/rst-nuxtjs'
    },
    {
        id: nanoid(),
        name: 'KPI Courses',
        description: 'KPI is <a href="https://kpi.fei.tuke.sk/en" target=_blank>Department of Computers and Informatics</a>. Together with my team we created a prototype in vue.js that shows all available course info.',
        image: require('@/assets/portfolio/kpistranky.png'),
        link: 'https://git.kpi.fei.tuke.sk/diana.orsolyova/kpistranky.git'
    },
    {
        id: nanoid(),
        name: 'Rock Paper Scissors Simulation',
        description: 'This is a simple rock paper scissors simulation game built in Unity.',
        image: require('@/assets/portfolio/rock_paper_scrissors_simulation.png'),
        link: 'https://github.com/diana2482/Rock-Paper-Scissors-Simulation.git'
    },
    {
        id: nanoid(),
        name: 'Java Tutoring',
        description: 'Here you can find some of the exercises I have done while tutoring Java basics.',
        image: require('@/assets/portfolio/doucovanie-java.png'),
        link: 'https://github.com/diana2482/doucovanie-java.git'
    },
];

export default projects;
