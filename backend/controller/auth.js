exports.getLogin = (req, res, next) => {
    console.log(req.headers.cookie);
}

exports.postLogin = (req, res, next) => {
    console.log('test');
    res.cookies('auth', 'true');
}