import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

let Number  =  [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express();
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.get('/api/persons', (req, res) => {
    res.json(Number);
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${Number.length} people</p>
    <p>${new Date()}</p>`);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = Number.find(person => person.id === id);
    if(person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Number = Number.filter(person => person.id !== id);
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number missing'
        })
    }
    if (Number.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000)
    }
    Number = Number.concat(person);
    res.json(person);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})