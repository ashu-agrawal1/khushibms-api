const authenticateUser = (req, res, next) => {
	console.log('cookies------', req.cookies);
	if (req.session && req.session.user) {
		console.log('authenticated----------------------------');
		next();
	} else {
		console.log('not authenticated------------------------');
		return res.status(401).send('Unauthorized, Please Login');
	}
};

module.exports = authenticateUser;