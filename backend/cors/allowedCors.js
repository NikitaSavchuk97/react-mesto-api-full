const allowedCors = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://snv-project-mesto.ru',
    'https://api-snv-project-mesto.ru',
    'http://api-snv-project-mesto.ru',
    'https://api-snv-project-mesto.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'cookies'],
  credentials: true,
};

module.exports = allowedCors;
