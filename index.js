/**
 * @param {Error} err
 */
const _onError = err => {
	console.error(err); // eslint-disable-line
	setTimeout(() => {
		process.exit(1);
	}, 500);
};

process.on('unhandledRejection', _onError);
process.on('uncaughtException', _onError);

require('./dist');
