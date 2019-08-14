import * as XboxLiveAuth from '@xboxreplay/xboxlive-auth';
import { getFromStore, setToStore } from '../modules/memory-store';
import credentials from '../config/credentials';

// **** TYPINGS **** //

type StoreResponse = XboxLiveAuth.AuthUserResponse | undefined;

// **** PUBLIC METHODS **** //

export const getOrResolveXBLAuthorization = async () => {
	const authorization = getFromStore<StoreResponse>('xboxlive-authorization');

	if (authorization !== void 0) {
		const hasExpired =
			authorization.expiresOn !== null &&
			new Date(authorization.expiresOn) <= new Date();

		if (hasExpired === false) {
			return {
				userHash: authorization.userHash,
				XSTSToken: authorization.XSTSToken
			};
		}
	}

	const authenticate = await XboxLiveAuth.authenticate(
		credentials.email,
		credentials.password
	);

	setToStore('xboxlive-authorization', authenticate);

	return {
		userHash: authenticate.userHash,
		XSTSToken: authenticate.XSTSToken
	};
};
