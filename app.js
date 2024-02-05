const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let currentQuestion = 1; // Variable pour suivre la question actuelle

const questions = [
    {
        id: 1,
        question: 'Qui est le moins âgé ?',
        options: ['Un bébé', 'Un grand-père', 'Un jeune'],
        correctAnswer: 'Un bébé'
    },
    
    {
        id: 2,
        question: 'Combien font 1+1 ?',
        options: ['0', '1', '2'],
        correctAnswer: '2'
    },
    
    {
        id: 3,
        question: 'De quelle forme est la terre ?',
        options: ['Plate', 'Ronde', 'Cylindrique'],
        correctAnswer: 'Ronde'
    },
    
    {
        id: 4,
        question: 'Quel est le satellite de la terre ?',
        options: ['Lune', 'Pluton', 'Terre'],
        correctAnswer: 'Lune'
    },
    
    {
        id: 5,
        question: 'Qui est le plus riche ?',
        options: ['Elon Musk', 'Bill Gates', 'Rihanna'],
        correctAnswer: 'Elon Musk'
    },
];

// Affiche la question actuelle
app.get('/question/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id === currentQuestion) {
        res.render('question', { question: questions[id - 1] });
    } else {
        res.redirect(`/question/${currentQuestion}`);
    }
});

// Traitement du formulaire pour vérifier la réponse
app.post('/question/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userAnswer = req.body.answer;

    if (userAnswer === questions[id - 1].correctAnswer) {
        currentQuestion++; // Passer à la question suivante si la réponse est correcte
    
        if (currentQuestion > questions.length) {
            return res.send('Félicitations, vous avez réussi le test!'); // Afficher le message de réussite
        }
    }

    res.redirect(`/question/${currentQuestion}`);
});

app.get('/', (req, res) => {
    res.redirect('/question/1'); // Rediriger vers la première question initialement
});

module.exports = app;
