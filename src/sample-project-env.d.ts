declare namespace Express {
	export interface Request {
		authorization?: {
			XSTSToken: string;
			userHash: string;
		};
	}
}
