import * as express from 'express';
import * as XboxLiveAPI from '@xboxreplay/xboxlive-api';

export default () => (req: express.Request, res: express.Response) => {
	const gamertag = req.query.gamertag;

	XboxLiveAPI.getPlayerSettings(
		gamertag,
		{
			userHash: (req as any).authorization.userHash,
			XSTSToken: (req as any).authorization.XSTSToken
		},
		['GameDisplayPicRaw', 'Gamerscore', 'Gamertag']
	)
		.then(response => res.send(response))
		.catch(_ => res.sendStatus(400));
};
