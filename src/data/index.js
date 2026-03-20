export const myProjects = [
  {
    id: '1',
    name: 'Neural Nexus',
    description: 'A decentralized AI processing network built on Ethereum, enabling peer-to-peer model training.',
    techStack: ['React', 'Solidity', 'TensorFlow.js', 'Web3'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
    image: 'https://picsum.photos/seed/neural/1200/800',
    category: 'AI',
    sizeType: 'featured',
    projectType: 'Open Source',
    status: 'Completed',
    complexity: 'Advanced',
    year: 2024,
    problemStatement: 'Centralized AI training is expensive and often lacks privacy. Small developers struggle to access high-performance computing resources without massive cloud bills.',
    solutionApproach: 'Neural Nexus leverages blockchain to create a distributed network where users can contribute idle GPU power. Smart contracts handle task distribution and rewards, while TensorFlow.js enables in-browser processing.',
    features: [
      'Decentralized Task Scheduling',
      'P2P Model Weight Synchronization',
      'In-browser GPU Processing',
      'Transparent Reward System'
    ],
    architecture: 'A hybrid architecture combining an Ethereum-based control plane with a libp2p-powered data layer for efficient model distribution.',
    challenges: 'Ensuring data integrity across untrusted nodes and managing high-latency connections during weight updates.',
    learnings: 'Deepened understanding of distributed systems, Web3 integration, and browser-based machine learning optimization.',
    media: [
      { type: 'image', url: 'https://picsum.photos/seed/nn1/1200/800', caption: 'Dashboard Overview' },
      { type: 'image', url: 'https://picsum.photos/seed/nn2/1200/800', caption: 'Network Visualization' },
      { type: 'image', url: 'https://picsum.photos/seed/nn3/1200/800', caption: 'Node Performance Metrics' }
    ],
    timeline: [
      { stage: 'Ideation', description: 'Conceptualized P2P training protocol.' },
      { stage: 'Prototyping', description: 'Built a basic Web3 interface for task submission.' },
      { stage: 'Development', description: 'Implemented TensorFlow.js processing engine.' },
      { stage: 'Beta Launch', description: 'Deployed to Sepolia testnet for community testing.' }
    ],
    metrics: [
      { label: 'Cost Reduction', value: '65', suffix: '%' },
      { label: 'Active Nodes', value: '1.2', suffix: 'k' },
      { label: 'Models Trained', value: '450', suffix: '+' }
    ]
  },
  {
    id: '2',
    name: 'Chaos Tracker',
    description: 'A personal productivity app to track daily progress, journal entries, and habits using charts and organized sections.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Harman8815/chaos-tracker',
    demoUrl: 'https://chaos-tracker-demo.com',
    image: 'https://picsum.photos/seed/chaos/1200/800',
    category: 'Productivity',
    sizeType: 'medium',
    projectType: 'Full Stack',
    status: 'Production',
    complexity: 'Intermediate',
    year: 2024,
    problemStatement: 'Users struggle to maintain consistent productivity habits and track progress across multiple life areas.',
    solutionApproach: 'Built a comprehensive dashboard with visual analytics, habit tracking, and journaling capabilities using modern web technologies.',
    features: [
      'Visual Progress Analytics',
      'Habit Tracking System',
      'Journal with Markdown Support',
      'Responsive Design'
    ],
    architecture: 'MERN stack with RESTful API architecture and real-time data synchronization.',
    challenges: 'Implementing complex chart visualizations and ensuring data privacy.',
    learnings: 'Advanced state management, chart library integration, and MongoDB optimization.',
    media: [
      { type: 'image', url: 'https://picsum.photos/seed/chaos1/1200/800', caption: 'Dashboard View' },
      { type: 'image', url: 'https://picsum.photos/seed/chaos2/1200/800', caption: 'Analytics Dashboard' }
    ],
    timeline: [
      { stage: 'Planning', description: 'Designed UX/UI wireframes and database schema.' },
      { stage: 'Development', description: 'Built frontend and backend with real-time features.' },
      { stage: 'Testing', description: 'Conducted user testing and performance optimization.' },
      { stage: 'Launch', description: 'Deployed to production with monitoring setup.' }
    ],
    metrics: [
      { label: 'Daily Active Users', value: '2.5', suffix: 'k' },
      { label: 'Tasks Completed', value: '15', suffix: 'k' },
      { label: 'User Retention', value: '78', suffix: '%' }
    ]
  },
  {
    id: '3',
    name: 'Gmail Clone',
    description: 'A fully functional Gmail clone built with MERN stack. Supports inbox, sent, bin, drafts, and starring emails.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Harman8815/Gmail-Clone',
    demoUrl: 'https://gmail-clone-demo.com',
    image: 'https://picsum.photos/seed/gmail/1200/800',
    category: 'Communication',
    sizeType: 'medium',
    projectType: 'Full Stack',
    status: 'Production',
    complexity: 'Intermediate',
    year: 2024,
    problemStatement: 'Email clients often lack modern UI/UX and real-time collaboration features.',
    solutionApproach: 'Recreated Gmail experience with enhanced performance and additional features using modern web stack.',
    features: [
      'Real-time Email Sync',
      'Advanced Search',
      'Email Categorization',
      'Responsive Design'
    ],
    architecture: 'RESTful API with WebSocket support for real-time updates and MongoDB for data persistence.',
    challenges: 'Implementing efficient email search and handling large email datasets.',
    learnings: 'Advanced React patterns, API design, and performance optimization.',
    media: [
      { type: 'image', url: 'https://picsum.photos/seed/gmail1/1200/800', caption: 'Inbox Interface' },
      { type: 'image', url: 'https://picsum.photos/seed/gmail2/1200/800', caption: 'Email Compose' }
    ],
    timeline: [
      { stage: 'Research', description: 'Analyzed Gmail UX patterns and email protocols.' },
      { stage: 'Development', description: 'Built core email functionality and API endpoints.' },
      { stage: 'Features', description: 'Added advanced features like search and categorization.' },
      { stage: 'Deployment', description: 'Deployed with proper email security measures.' }
    ],
    metrics: [
      { label: 'Emails Processed', value: '100', suffix: 'k+' },
      { label: 'Response Time', value: '<100', suffix: 'ms' },
      { label: 'Uptime', value: '99.9', suffix: '%' }
    ]
  }
];
