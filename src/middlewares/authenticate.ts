import * as express from 'express';
import XBLAuthenticateMethod from '../modules/authenticate';

export default () => (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) =>
	XBLAuthenticateMethod()
		.then(response => {
			req.authorization = response;
			return next();
		})
		.catch(err => {
			console.error(err);
			return res.sendStatus(401);
		});
