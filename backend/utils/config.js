module.exports = {
    'facebookAuth' : {
        'clientID'      : '2390717211250496',
        'clientSecret'  : 'a2555f7c0cca5ab621b514697c55dbbe',
        'callbackURL'     : 'http://localhost:3001/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'Q8ZsAPm0aouep5xrIHFIPs6dX',
        'consumerSecret'     : 'a2555f7c0cca5ab621b514697c55dbbe',
        'callbackURL'        : 'http://localhost:3001/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '234413930002-ill9463dgka0tgb87suhjtv8mbdap2dq.apps.googleusercontent.com',
        'clientSecret'     : '5KBTkK7GkTCGzZsmMxac3cRG',
        'callbackURL'      : 'http://localhost:3001/auth/google/callback'
    }
};