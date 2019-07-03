import * as express from 'express';
import * as XboxLiveAuth from '@xboxreplay/xboxlive-auth';
import { getFromStore, setToStore } from '../modules/memory-store';
import credentials from '../config/credentials';

// **** TYPINGS **** //

type StoreResponse = XboxLiveAuth.AuthUserResponse | undefined;

// **** PUBLIC METHODS **** //

export default () => (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const authorization = getFromStore<StoreResponse>('xboxlive-authorization');

	if (authorization !== void 0) {
		const hasExpired =
			authorization.expiresOn !== null &&
			new Date(authorization.expiresOn) <= new Date();

		if (hasExpired === false) {
			(req as any).authorization = authorization;
			return next();
		}
	}

	return XboxLiveAuth.authenticate(credentials.email, credentials.password)
		.then(response => {
			setToStore('xboxlive-authorization', response);
			(req as any).authorization = response;
			return next();
		})
		.catch(_ => res.sendStatus(401));
};
