const allowedCors = {
	origin: [
		'http://localhost:3000',
		'https://localhost:3000',
		'http://localhost:3001',
		'https://localhost:3001',
		'http://snv.mesto.nomoredomains.club',
		'https://snv.mesto.nomoredomains.club',
		'http://api.snv.mesto.nomoredomains.club',
		'https://api.snv.mesto.nomoredomains.club',
	],
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	preflightContinue: false,
	optionsSuccessStatus: 204,
	allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'cookies'],
	credentials: true,
};

module.exports = allowedCors;
