import * as express from 'express';
import { getOrResolveXBLAuthorization } from '../modules/xbl-authorization';

export default () => (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) =>
	getOrResolveXBLAuthorization()
		.then(response => {
			req.authorization = response;
			return next();
		})
		.catch(err => {
			console.error(err);
			return res.sendStatus(401);
		});
