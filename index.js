import express from 'express';
import mongoose from 'mongoose';
import users from './MOCK_DATA.json' with { type: 'json'};

const app = express();
const PORT = 8000;
const REQUIRED_FIELDS = [
    'first_name', 'last_name', 'email', 'gender', 'job_title'
];
mongoose.connect('mongodb://127.0.0.1:27017/users')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(`Error in connection: ${err}`));

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    }, email: {
        type: String,
    }, gender: {
        type: String,
    }, jobTitle: {
        type: String,
    }
}, {
    timestamps: true
});
const User = mongoose.model('user', userSchema);

// Middleware to parse the body
app.use(express.urlencoded({ extended: false }))

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const html = `
    <ul>
     ${users.map(user => 
        `<li>${user.first_name}</li>`
     ).join('')}
    </ul>
    `;
    return res.send(html);
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) return res.status(404).json('User not found!');
    return res.json(user);
})

app.post('/api/users', async (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body;
    if (!first_name || !last_name || !email || !gender || !job_title) {
        return res.status(400).json(`One or more required field is missing: ${REQUIRED_FIELDS}`);
    } else {
        // updateDB
        const result = await User.create({
            firstName: first_name,
            lastName: last_name,
            gender: gender,
            email: email,
            jobTitle: job_title
        });
        return res.status(201).json('A new user is added!');
    }
})

app.listen(PORT, ()=> console.log('Server started!'));