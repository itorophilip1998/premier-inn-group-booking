# Premier Inn Group Booking System

A modern, responsive web application for managing group bookings at Premier Inn hotels. Built with Next.js, React, and TypeScript.

## 🚀 Features

- 🌐 Internationalization support (English and German)
- 🌓 Dark/Light theme support
- 📱 Responsive design
- ✨ Modern animations with Framer Motion
- 📝 Form validation with Zod
- 🎨 Styled with Tailwind CSS
- 🧪 Comprehensive test coverage
- 🔍 Accessibility features

## 📋 Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/premier-inn-group-booking.git
cd premier-inn-group-booking
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## 🏗️ Building for Production

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
premier-inn-group-booking/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── [locale]/       # Internationalized routes
│   │   └── api/            # API routes
│   ├── components/         # React components
│   ├── context/           # React context providers
│   ├── lib/               # Utility functions
│   ├── messages/          # Translation files
│   └── styles/            # Global styles
├── public/                # Static assets
├── tests/                 # Test files
└── types/                 # TypeScript type definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **Testing**: Jest + React Testing Library
- **Animation**: Framer Motion
- **Internationalization**: next-intl
- **Theme**: next-themes

## 📚 Documentation

For detailed documentation about the system architecture, components, and APIs, please refer to the [System Documentation](./SYSTEM_DOCUMENTATION.md).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Premier Inn for the inspiration
- Next.js team for the amazing framework
- All contributors who have helped shape this project
