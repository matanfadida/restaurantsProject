exports.getLogin = (req, res, next) => {
    console.log(req.headers.cookie);
}

exports.postLogin = (req, res, next) => {
    res.cookie('auth', 'true');
    res.json('ok');
}