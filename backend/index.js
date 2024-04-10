const express = require('express');
const app = express();
const router = require('./routes/routes.js');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const cors = require('cors');

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', router);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3005;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
