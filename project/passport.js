const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/listings");

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (email, password, done) {
        console.log("Here", email, password);
        try {
            let user = await User.findOne({ username: email });
            if (!user) { return done(null, false); }
            bcrypt.compare(password, user.password).then(function (result) {
                if (result == false) return done(null, false);
                return done(null, user);
            });

        }
        catch (err) {
            if (err) { return done(err); }
        }
    }
));


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
