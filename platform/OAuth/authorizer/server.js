const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const { proposeControl } = require('./device'); 
const Forseti = require('./../../Philips/main')

let fakeDatabase = {
    clients: {
        'client_id_123': {
            clientSecret: 'client_secret_abc',
            redirectUris: ['http://localhost:3000/callback'],
            grants: ['authorization_code']
        }
    },
    authorizationCodes: {},
    tokens: {}
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/oauth/authorize', (req, res) => {
    const { client_id, redirect_uri, scope, response_type } = req.query;
    const client = fakeDatabase.clients[client_id];
    if (!client) {
        return res.status(400).send('Invalid client_id');
    }
    if (!client.redirectUris.includes(redirect_uri)) {
        return res.status(400).send('Invalid redirect_uri');
    }

    res.send(`
        <h1>Authorize Access</h1>
        <p>Do you authorize the app to access your data?</p>
        <form method="post" action="/oauth/authorize">
            <input type="hidden" name="client_id" value="${client_id}" />
            <input type="hidden" name="redirect_uri" value="${redirect_uri}" />
            <input type="hidden" name="scope" value="${scope}" />
            <input type="hidden" name="response_type" value="${response_type}" />
            <button type="submit" name="approve" value="yes">Approve</button>
            <button type="submit" name="approve" value="no">Deny</button>
        </form>
    `);
});

app.post('/oauth/authorize', (req, res) => {
    const { client_id, redirect_uri, approve } = req.body;
    
    if (approve === 'no') {
        return res.redirect(`${redirect_uri}?error=access_denied`);
    }

    const authorizationCode = Math.random().toString(36).substring(2, 15);
    fakeDatabase.authorizationCodes[authorizationCode] = { client_id, redirect_uri };

    res.redirect(`${redirect_uri}?code=${authorizationCode}`);
});

app.post('/oauth/token', (req, res) => {
    const { code, client_id, client_secret, redirect_uri } = req.body;
    const authorizationCode = fakeDatabase.authorizationCodes[code];

    if (!authorizationCode) {
        return res.status(400).json({ error: 'Invalid authorization code' });
    }

    const client = fakeDatabase.clients[client_id];
    if (!client || client.clientSecret !== client_secret || authorizationCode.redirect_uri !== redirect_uri) {
        return res.status(400).json({ error: 'Invalid client credentials or redirect URI' });
    }

    const accessToken = Math.random().toString(36).substring(2, 15);
    fakeDatabase.tokens[accessToken] = { client_id, scope: 'read_profile' };

    res.json({ access_token: accessToken, token_type: 'Bearer' });
});

app.get('/api/userinfo', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token || !fakeDatabase.tokens[token]) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json({ id: 'user_123', name: 'John Doe' });
});


app.post('/api/propose-control', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token || !fakeDatabase.tokens[token]) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const action = req.body.action;
    //const result = proposeControl(action);
    const result = Forseti.controlDevice(true);
    res.json(result);
});


app.listen(PORT, () => {
    console.log(`OAuth Server running at http://localhost:${PORT}`);
});

