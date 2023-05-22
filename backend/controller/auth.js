const bcrypt = require('bcryptjs');

const Admin = require("../models/Admin");

exports.getLogin = (req, res, next) => {
    console.log(req.headers.cookie);
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findByEmail(email).then(admin => {
        if(!admin){
            return res.json('not found');
        }
        bcrypt.compare(password, admin.password).then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = admin;
                return req.session.save(err => {
                    res.json('succeeded');
                });
            }
            return res.json('not succeeded');
        }).catch(err => { console.log('bcrypt error', err); console.log('password error'); res.json('password error');
    });
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
    });
    res.json('ok');
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashPassword => {
        const admin = new Admin(email, hashPassword);
        admin
        .save()
        .then((result) => {console.log(result); res.json('ok');})
        .catch((err) => {console.log(err); res.json('error');});
    }).catch(err => {console.log(err); res.json('error');});
}

exports.IsLogin = (req, res, next) => {
    if(req.session.isLoggedIn == undefined){
        res.json(false);
    }else{
        res.json(true);
    }
}