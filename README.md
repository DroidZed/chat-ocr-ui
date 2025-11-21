# Chat OCR

A modern web application that combines OCR (Optical Character Recognition) capabilities with a chat interface, powered by n8n workflows, Ollama AI, and React.

## Features

- **OCR Processing**: Extract text from images using advanced OCR technology
- **AI-Powered Chat**: Interactive chat interface powered by Ollama
- **Workflow Automation**: Backend powered by n8n for flexible workflow management
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly across devices
- **Docker Support**: Production-ready containerization with nginx

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **bun**
- **Docker** and **Docker Compose**
- **Git**
- **n8n**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/DroidZed/chat-ocr-ui
cd chat-ocr-ui
```

### 2. Install Dependencies

```bash
bun i
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project (refer to [.env.example](./.env.example)):

```bash
# Backend API URL (n8n workflow endpoint)
VITE_BACKEND_URL=http://localhost:5678
```

**Important**: Environment variables are embedded during the build process. If you change the backend URL, you'll need to rebuild the application.

### 4. Setup Docker Services

```bash
# Option 1: If you've Make installed, proceed with this command:

make prod
```

```bash
# Option 2, do it manually:

# Create Docker volumes
docker volume create ollama_data
docker volume create n8n_data
docker volume create pg_data

# Start services
docker compose up -d
```

### 5. Verify Services are Running

Check that all services are up:

```bash
docker compose ps
```

You should see four containers running:
- `n8n-workflow`
- `ollama`
- `pg-db`
- `ocr_chat`

### 6. Setup Ollama Models

Pull the required models:

```bash
docker exec -it ollama ollama pull llama2
# Or any other model you prefer (e.g., llama3, mistral, etc.)
```

## Running the Application

### Development Mode

Start the Vite development server:

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

### Local Production Build

Build the application for production:

```bash
bun run build
```

Preview the production build locally:

```bash
bun preview
```

### Docker Production Deployment

The application uses a multi-stage Dockerfile that builds the React app and serves it with nginx for optimal performance.

#### Build the Docker Image

```bash
docker build -t droidzed/chat_ocr .
```

#### Run the Container

```bash
docker run -d -p 3000:80 --name chat_ocr -e VITE_BACKEND_URL=YOUR_N8N_URL droidzed/chat_ocr
```

Or through compose:

```bash
make prod

# ----- OR -----

docker compose up -d
```

The application will be available at `http://localhost:3000`.

#### Stop and Remove the Container

```bash
make down

# ----- OR -----

docker compose down
```

#### View Container Logs

```bash
docker logs droidzed/chat_ocr
```

## Accessing Services

- **Frontend (Development)**: http://localhost:3000
- **n8n Workflow Platform**: http://localhost:5678
- **Ollama API**: http://localhost:11434
- **PostgreSQL**: localhost:5432

### n8n Setup

1. Open http://localhost:5678 in your browser
2. Create an account (first-time setup)
3. Import or create your OCR workflows
4. Configure webhook endpoints for the frontend to call
5. Copy and paste the webhook url into the frontend then rebuild and rerun !

## Project Structure

```
ocr_project/
├── src/
│   ├── components/     # React components
│   ├── core/
│   │   ├── models/     # Data models
│   │   ├── network/    # API configuration (axios)
│   │   ├── schemas/    # Validation schemas
│   │   ├── store/      # State management (Jotai)
│   │   └── utils/      # Utility functions and constants
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   │   ├── LandingPage.tsx
│   │   ├── HomeScreen.tsx
│   │   └── AboutPage.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/             # Static assets
├── Dockerfile          # Multi-stage Docker build
├── nginx.conf          # Nginx configuration for production
├── compose.yml         # Docker Compose for backend services
├── vite.config.ts      # Vite configuration
├── package.json
└── README.md
```

## Stopping the Application

```bash
docker compose down
```
## Configuration

### Updating Backend URL

If your backend is hosted elsewhere, update the environment variable before building:

```bash
VITE_BACKEND_URL=https://your-backend-url.com
```

Then rebuild the application:

```bash
# For local development
bun run build

# For Docker deployment
docker build -t droidzed/chat_ocr .
```

### Customizing nginx Configuration

The `nginx.conf` file includes:
- React Router support (client-side routing)
- Gzip compression for better performance
- Security headers
- Static file caching with proper cache control
- Health check endpoint at `/health`

Edit `nginx.conf` to customize these settings.

### Customizing n8n Configuration

Edit `compose.yml` to modify n8n settings such as:
- Timezone
- Database configuration
- Port mappings
- Environment variables

## Available Scripts

- `bun dev` - Start development server
- `bun run build` - Build for production
- `bun preview` - Preview production build locally
- `bun lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [n8n](https://n8n.io/) - Workflow automation platform
- [Ollama](https://ollama.ai/) - Local AI models
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [nginx](https://nginx.org/) - High-performance web server
