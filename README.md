# React Learning Path Website

A modern, interactive website built with React that showcases various learning paths and interactive demos. The website features a recipe learning application, to-do list manager, Pokemon tracker, image gallery, and API fetch demonstrations.

## 🌟 Features

- **Recipe Learning Path**: Interactive cooking tutorials with difficulty levels and skill progression
- **To-Do Application**: Task management with CRUD operations
- **Pokemon Tracker**: Track and level up Pokemon
- **Image Gallery**: Dynamic image showcase with transitions
- **API Fetch Demos**: 
  - Simple fetch demo using JSONPlaceholder API
  - Local fetch demo connecting to a custom Express API

### Accessibility Features
- Full keyboard navigation support
- ARIA labels and roles
- Screen reader friendly
- Clear focus indicators
- Semantic HTML structure

## 🚀 Getting Started as a Developer

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-learning-path.git
cd react-learning-path
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Project Structure
```
├── src/
│   ├── components/
│   │   ├── TodoApp.jsx
│   │   ├── Gallery.jsx
│   │   ├── PokemonTracker.jsx
│   │   ├── Contact.jsx
│   │   ├── RecipeApp.jsx
│   │   ├── SimpleFetchDemo.jsx
│   │   └── LocalFetchDemo.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│       └── RecipeApp.css
├── public/
│   └── assets/
├── index.html
└── package.json
```

### Development Guidelines

#### Code Style
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Include JSDoc comments for complex functions
- Use meaningful variable names

#### Git Workflow
1. Create a feature branch from main
2. Make your changes
3. Submit a pull request
4. Wait for code review

## 📘 Getting Started as a User

### Navigation
- Use the navigation bar at the top to switch between different applications
- Each application has its own unique features and interactions

### Recipe Learning Path
1. Select your preferred difficulty level (Beginner/Intermediate/Advanced)
2. Choose a cooking method
3. Browse through available recipes
4. Click on a recipe to view detailed instructions
5. Use keyboard navigation:
   - Arrow keys to move between recipes
   - Enter/Space to view recipe details
   - Escape to close recipe details

### To-Do Application
1. Add new tasks using the input field
2. Mark tasks as complete by clicking the checkbox
3. Delete tasks using the delete button
4. Edit tasks by clicking on the task text

### Pokemon Tracker
1. View your Pokemon collection
2. Level up Pokemon by clicking the "Level Up!" button
3. Track progress of each Pokemon

### Gallery
1. Browse through the image collection
2. Click the "Change Image" button to view different images
3. Enjoy smooth transitions between images

### API Fetch Demos
#### Simple Fetch Demo
- View posts fetched from JSONPlaceholder API
- Click "Refresh Posts" to fetch new data
- Observe loading states and error handling

#### Local Fetch Demo
1. Set up the local Express API:
   ```bash
   git clone https://github.com/cpainter7362/random-number-express-app
   cd random-number-express-app
   docker-compose up
   ```
2. Generate random numbers by clicking the button
3. View real-time API responses

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap for the UI components
- JSONPlaceholder for the demo API
- All contributors who have helped improve this project 