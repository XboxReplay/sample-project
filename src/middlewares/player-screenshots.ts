import * as express from 'express';
import * as XboxLiveAPI from '@xboxreplay/xboxlive-api';

export default () => (req: express.Request, res: express.Response) => {
	const gamertag = req.query.gamertag;
	const maxItems = req.query.count || 25;
	const continuationToken = req.query['continuation-token'];

	XboxLiveAPI.getPlayerScreenshots(
		gamertag,
		{
			userHash: (req as any).authorization.userHash,
			XSTSToken: (req as any).authorization.XSTSToken
		},
		{ maxItems, continuationToken }
	)
		.then(response => res.send(response))
		.catch(_ => res.sendStatus(400));
};
