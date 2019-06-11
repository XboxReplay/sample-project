import * as express from 'express';

export default () => (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const gamertag = (req.query || {}).gamertag;

	if (typeof gamertag !== 'string' || gamertag.length === 0) {
		return res.sendStatus(400);
	} else return next();
};
