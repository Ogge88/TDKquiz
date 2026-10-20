'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, CheckCircle2, XCircle, ... } from 'lucide-react';

export default function Home() {
  
}import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  PlusCircle, 
  BookOpen, 
  Brain, 
  Film, 
  Cpu, 
  Dumbbell, 
  History,
  ChevronRight,
  BarChart2,
  Trash2,
  Lightbulb
} from 'lucide-react';

// Start-frågebank på svenska med kategorier och svårighetsgrader
const INITIAL_QUESTIONS = [
  // Allmänbildning
  {
    id: 1,
    category: 'Allmänbildning',
    difficulty: 'Lätt',
    question: 'Vilken är Sveriges huvudstad?',
    options: ['Göteborg', 'Stockholm', 'Malmö', 'Uppsala'],
    correct: 1,
    explanation: 'Stockholm har varit Sveriges officiella huvudstad sedan 1634.'
  },
  {
    id: 2,
    category: 'Allmänbildning',
    difficulty: 'Medel',
    question: 'Vilket grundämne har den kemiska beteckningen Au?',
    options: ['Silver', 'Aluminium', 'Guld', 'Koppar'],
    correct: 2,
    explanation: 'Au kommer från det latinska ordet för guld, "Aurum".'
  },
  {
    id: 3,
    category: 'Allmänbildning',
    difficulty: 'Svår',
    question: 'Vilket är världens största land till ytan?',
    options: ['Kanada', 'Kina', 'USA', 'Ryssland'],
    correct: 3,
    explanation: 'Ryssland täcker över 17 miljoner kvadratkilometer.'
  },
  
  // Popkultur
  {
    id: 4,
    category: 'Popkultur',
    difficulty: 'Lätt',
    question: 'Vilket svenskt band vann Eurovision Song Contest 1974 med låten "Waterloo"?',
    options: ['Roxette', 'ABBA', 'Ace of Base', 'Europe'],
    correct: 1,
    explanation: 'ABBA vann i Brighton 1974 och fick sitt stora internationella genombrott.'
  },
  {
    id: 5,
    category: 'Popkultur',
    difficulty: 'Medel',
    question: 'Vem spelade huvudrollen som Jack Dawson i filmen Titanic (1997)?',
    options: ['Brad Pitt', 'Tom Cruise', 'Leonardo DiCaprio', 'Matt Damon'],
    correct: 2,
    explanation: 'Leonardo DiCaprio spelade Jack mot Kate Winslet som spela Rose.'
  },
  {
    id: 6,
    category: 'Popkultur',
    difficulty: 'Svår',
    question: 'Vilket år släpptes det första Harry Potter-spelet/boken på engelska?',
    options: ['1995', '1997', '1999', '2001'],
    correct: 1,
    explanation: 'Harry Potter and the Philosopher\'s Stone publicerades i Storbritannien juni 1997.'
  },

  // Teknik
  {
    id: 7,
    category: 'Teknik',
    difficulty: 'Lätt',
    question: 'Vad står "WWW" för i en webbadress?',
    options: ['World Wide Web', 'Web World Wide', 'World Wide Wifi', 'Wide World Web'],
    correct: 0,
    explanation: 'World Wide Web skapades av Tim Berners-Lee år 1989.'
  },
  {
    id: 8,
    category: 'Teknik',
    difficulty: 'Medel',
    question: 'Vilket programmeringsspråk används främst för att göra webbsidor interaktiva i webbläsaren?',
    options: ['Python', 'C++', 'JavaScript', 'SQL'],
    correct: 2,
    explanation: 'JavaScript skapades 1995 och körs direkt i webbläsaren.'
  },
  {
    id: 9,
    category: 'Teknik',
    difficulty: 'Svår',
    question: 'Vilket år lanserades den allra första iPhonen av Steve Jobs?',
    options: ['2005', '2007', '2008', '2010'],
    correct: 1,
    explanation: 'Steve Jobs presenterade den första iPhonen den 9 januari 2007.'
  },

  // Sport
  {
    id: 10,
    category: 'Sport',
    difficulty: 'Lätt',
    question: 'Hur många spelare har ett fotbollslag på planen samtidigt?',
    options: ['9', '10', '11', '12'],
    correct: 2,
    explanation: 'Varje lag har 11 spelare på planen, inklusive målvakten.'
  },
  {
    id: 11,
    category: 'Sport',
    difficulty: 'Medel',
    question: 'Vilken idrott förknippas Armand Duplantis med?',
    options: ['Höjdhopp', 'Stavhopp', 'Längdhopp', 'Tresteg'],
    correct: 1,
    explanation: 'Mondo Duplantis har slagit världsrekordet i stavhopp flera gånger.'
  },

  // Historia
  {
    id: 12,
    category: 'Historia',
    difficulty: 'Medel',
    question: 'Vilket år slutade det andra världskriget?',
    options: ['1943', '1944', '1945', '1950'],
    correct: 2,
    explanation: 'Andra världskriget avslutades år 1945 efter Tysklands och Japans kapitulation.'
  }
];

const CATEGORIES = [
  { name: 'Alla', icon: Brain, color: 'from-purple-500 to-indigo-500' },
  { name: 'Allmänbildning', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
  { name: 'Popkultur', icon: Film, color: 'from-pink-500 to-rose-500' },
  { name: 'Teknik', icon: Cpu, color: 'from-emerald-500 to-teal-500' },
  { name: 'Sport', icon: Dumbbell, color: 'from-orange-500 to-amber-500' },
  { name: 'Historia', icon: History, color: 'from-yellow-500 to-orange-600' }
];

const DIFFICULTIES = ['Alla', 'Lätt', 'Medel', 'Svår'];

export default function App() {
  // Tillståndshantering
  const [screen, setScreen] = useState('start'); // 'start', 'quiz', 'results', 'create'
  const [allQuestions, setAllQuestions] = useState(() => {
    const saved = localStorage.getItem('quiz_custom_questions');
    return saved ? [...INITIAL_QUESTIONS, ...JSON.parse(saved)] : INITIAL_QUESTIONS;
  });

  // Inställningar för Quiz
  const [selectedCategory, setSelectedCategory] = useState('Alla');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Alla');
  const [questionCount, setQuestionCount] = useState(5);

  // Aktuellt spel-tillstånd
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState([]);

  // Ny fråga formulär
  const [newQuestion, setNewQuestion] = useState({
    category: 'Allmänbildning',
    difficulty: 'Medel',
    question: '',
    options: ['', '', '', ''],
    correct: 0,
    explanation: ''
  });

  // Timer-effekt
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning && !isAnswered) {
      handleAnswerSelect(-1); // Tiden gick ut
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, isAnswered]);

  // Starta Quiz
  const startQuiz = () => {
    let filtered = allQuestions.filter((q) => {
      const matchCat = selectedCategory === 'Alla' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'Alla' || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });

    if (filtered.length === 0) {
      alert('Det finns inga frågor som matchar dina val. Prova att ändra kategori eller svårighetsgrad!');
      return;
    }

    // Slumpa och välj antal
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setQuizQuestions(selected);
    setCurrentIdx(0);
    setScore(0);
    setUserAnswersHistory([]);
    setScreen('quiz');
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimer(15);
    setIsTimerRunning(true);
  };

  const handleAnswerSelect = (index) => {
    if (isAnswered) return;

    setIsTimerRunning(false);
    setSelectedAnswer(index);
    setIsAnswered(true);

    const currentQ = quizQuestions[currentIdx];
    const isCorrect = index === currentQ.correct;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswersHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        userAnswer: index,
        isCorrect
      }
    ]);
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      resetQuestionState();
    } else {
      setScreen('results');
    }
  };

  // Spara ny egen fråga
  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question || newQuestion.options.some((o) => !o.trim())) {
      alert('Vänligen fyll i frågan och alla 4 svarsalternativ!');
      return;
    }

    const created = {
      ...newQuestion,
      id: Date.now()
    };

    const existingCustom = JSON.parse(localStorage.getItem('quiz_custom_questions') || '[]');
    const updatedCustom = [...existingCustom, created];
    localStorage.setItem('quiz_custom_questions', JSON.stringify(updatedCustom));

    setAllQuestions((prev) => [...prev, created]);
    setNewQuestion({
      category: 'Allmänbildning',
      difficulty: 'Medel',
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      explanation: ''
    });

    alert('Din fråga har sparats!');
    setScreen('start');
  };

  // Hjälpfunktion för betyg/sammanfattning
  const getFeedback = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    if (percentage === 100) return { title: 'Mästarklass! 🏆', text: 'Perfekt resultat! Du kan verkligen dina grejer.', color: 'text-yellow-400' };
    if (percentage >= 80) return { title: 'Grymt jobbat! 🌟', text: 'Imponerande kunskaper!', color: 'text-emerald-400' };
    if (percentage >= 50) return { title: 'Bra försök! 👍', text: 'Du klarade mer än hälften. Fortsätt öva!', color: 'text-blue-400' };
    return { title: 'Kämpa på! 💪', text: 'Bara att ta nya tag och försöka igen!', color: 'text-pink-400' };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white font-sans relative overflow-hidden">
      {/* Bakgrundsdekorationer med gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-4xl mx-auto p-4 md:p-6 flex justify-between items-center z-10">
        <div 
          onClick={() => setScreen('start')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-gradient-to-tr from-purple-500 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
            QuizMaster
          </span>
        </div>

        {screen !== 'create' && (
          <button
            onClick={() => setScreen('create')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 text-sm font-medium transition-all backdrop-blur-md"
          >
            <PlusCircle className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Skapa egen fråga</span>
          </button>
        )}
      </header>

      {/* Huvudinnehåll */}
      <main className="w-full max-w-3xl mx-auto px-4 py-6 flex-1 flex flex-col justify-center z-10">
        {/* STARTSKÄRM */}
        {screen === 'start' && (
          <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Redo för utmaningen?
              </h1>
              <p className="text-slate-400 text-sm md:text-base">
                Välj inställningar nedan och testa dina kunskaper!
              </p>
            </div>

            {/* Kategori-val */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 block">Välj kategori</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                          : 'bg-slate-800/40 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <div className={`p-2 rounded-xl bg-gradient-to-tr ${cat.color} text-white`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Svårighetsgrad & Antal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-300 block">Svårighetsgrad</label>
                <div className="grid grid-cols-4 gap-2 bg-slate-950/50 p-1.5 rounded-2xl border border-slate-800">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                        selectedDifficulty === diff
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-300 block">
                  Antal frågor: <span className="text-purple-400">{questionCount}</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 px-1">
                  <span>3</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Starta-knapp */}
            <button
              onClick={startQuiz}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg shadow-xl shadow-purple-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>Starta Quiz</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* QUIZ-SKÄRM */}
        {screen === 'quiz' && quizQuestions.length > 0 && (
          <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 animate-in fade-in duration-200">
            {/* Header: Framsteg & Timer */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">
                  Fråga <span className="text-white font-bold">{currentIdx + 1}</span> av {quizQuestions.length}
                </span>
                <div className={`flex items-center gap-1.5 font-mono text-sm px-3 py-1 rounded-full border ${
                  timer <= 5 
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse' 
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{timer}s</span>
                </div>
              </div>

              {/* Progresstråd */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Kategori-tagg & Fråga */}
            <div className="space-y-3 py-2">
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                  {quizQuestions[currentIdx].category}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-400 font-medium">
                  {quizQuestions[currentIdx].difficulty}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                {quizQuestions[currentIdx].question}
              </h2>
            </div>

            {/* Svarsalternativ */}
            <div className="grid grid-cols-1 gap-3">
              {quizQuestions[currentIdx].options.map((option, idx) => {
                const isCorrectIndex = idx === quizQuestions[currentIdx].correct;
                const isUserSelected = selectedAnswer === idx;

                let btnStyle = 'bg-slate-800/40 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
                
                if (isAnswered) {
                  if (isCorrectIndex) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold shadow-lg shadow-emerald-500/10';
                  } else if (isUserSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold';
                  } else {
                    btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <span className="text-sm md:text-base font-medium">{option}</span>
                    {isAnswered && (
                      <div>
                        {isCorrectIndex && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                        {isUserSelected && !isCorrectIndex && <XCircle className="w-5 h-5 text-rose-400" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Förklaring efter svar */}
            {isAnswered && (
              <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {quizQuestions[currentIdx].explanation && (
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3 text-indigo-200 text-sm">
                    <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-indigo-300 mb-0.5">Förklaring:</span>
                      {quizQuestions[currentIdx].explanation}
                    </div>
                  </div>
                )}

                <button
                  onClick={nextQuestion}
                  className="w-full py-3.5 rounded-2xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>{currentIdx + 1 === quizQuestions.length ? 'Se resultat' : 'Nästa fråga'}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* RESULTATSKÄRM */}
        {screen === 'results' && (
          <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-3">
              <div className="inline-flex p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-2">
                <Trophy className="w-12 h-12" />
              </div>
              <h1 className={`text-3xl font-black ${getFeedback().color}`}>
                {getFeedback().title}
              </h1>
              <p className="text-slate-300 max-w-md mx-auto text-sm md:text-base">
                {getFeedback().text}
              </p>
            </div>

            {/* Poängruta */}
            <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl flex justify-around items-center text-center">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Rätta svar</span>
                <span className="text-3xl font-black text-white">{score} / {quizQuestions.length}</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-800" />
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Procent</span>
                <span className="text-3xl font-black text-purple-400">
                  {Math.round((score / quizQuestions.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Detaljerad frågor-genomgång */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-purple-400" />
                <span>Frågesammanfattning</span>
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {userAnswersHistory.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl border text-sm flex items-start justify-between gap-3 ${
                      item.isCorrect 
                        ? 'bg-emerald-950/20 border-emerald-900/50 text-slate-300' 
                        : 'bg-rose-950/20 border-rose-900/50 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-slate-200">{idx + 1}. {item.question.question}</p>
                      <p className="text-xs text-slate-400">
                        Ditt svar: <span className={item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                          {item.userAnswer === -1 ? 'Tiden gick ut' : item.question.options[item.userAnswer]}
                        </span>
                      </p>
                    </div>
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Knappar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={startQuiz}
                className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Spela igen</span>
              </button>
              <button
                onClick={() => setScreen('start')}
                className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all"
              >
                Ändra inställningar
              </button>
            </div>
          </div>
        )}

        {/* SKAPA EGNA FRÅGOR */}
        {screen === 'create' && (
          <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-purple-400" />
                <span>Skapa din egen fråga</span>
              </h2>
              <button
                onClick={() => setScreen('start')}
                className="text-slate-400 hover:text-white text-sm font-medium"
              >
                Avbryt
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4">
              {/* Kategori & Svårighetsgrad */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Kategori</label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    {CATEGORIES.filter((c) => c.name !== 'Alla').map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Svårighetsgrad</label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    {DIFFICULTIES.filter((d) => d !== 'Alla').map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Frågetext */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Fråga</label>
                <input
                  type="text"
                  placeholder="T.ex. Vad heter Sveriges största sjö?"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Svarsalternativ */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Svarsalternativ (Markera det rätta svaret)</label>
                {newQuestion.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={newQuestion.correct === idx}
                      onChange={() => setNewQuestion({ ...newQuestion, correct: idx })}
                      className="accent-purple-500 w-4 h-4 cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder={`Alternativ ${idx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const updated = [...newQuestion.options];
                        updated[idx] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: updated });
                      }}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>

              {/* Förklaring */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Förklaring (valfritt)</label>
                <input
                  type="text"
                  placeholder="Kort förklaring till varför svaret är rätt..."
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-600/20"
              >
                Spara fråga
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto p-4 text-center text-xs text-slate-600 z-10">
        Byggd för Vercel & GitHub • Svensk Quiz-app
      </footer>
    </div>
  );
}
