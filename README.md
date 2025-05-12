# Birds Application

A web application for browsing and documenting bird sightings.

## Development Setup

### Prerequisites

- Node.js 20 or higher
- npm 10 or higher

### Environment Variables

Create an environment file to create your local configuration:

```bash
cp .env.example .env
```

Adjust the values in `.env` as needed for your development environment.

### Installation

Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Testing

This project uses Playwright for end-to-end testing.

### Running Tests

Run all tests:

```bash
npm test
```

Run tests with UI mode (for debugging and development):

```bash
npm run test:ui
```
