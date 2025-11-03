
// HR Terms Database
const hrTerms = [
    {
        arabic: "إدارة الموارد البشرية",
        english: "Human Resource Management",
        category: "noun",
        example: "إدارة الموارد البشرية مسؤولة عن تطوير الموظفين - Human Resource Management is responsible for employee development."
    },
    {
        arabic: "الموظفين",
        english: "Employees",
        category: "noun (plural)",
        example: "الموظفين يحتاجون إلى تدريب مستمر - Employees need continuous training."
    },
    {
        arabic: "الوظيفة",
        english: "Job / Position",
        category: "noun",
        example: "هذه الوظيفة تتطلب خبرة سابقة - This job requires previous experience."
    },
    {
        arabic: "الراتب",
        english: "Salary",
        category: "noun",
        example: "الراتب يحدد بناء على الخبرة والمهارات - Salary is determined based on experience and skills."
    },
    {
        arabic: "تقييم الأداء",
        english: "Performance Evaluation",
        category: "noun",
        example: "تقييم الأداء يتم سنوياً في الشركة - Performance evaluation is conducted annually in the company."
    },
    {
        arabic: "التطوير",
        english: "Development",
        category: "noun",
        example: "التطوير المهني مهم لكل موظف - Professional development is important for every employee."
    },
    {
        arabic: "التدريب",
        english: "Training",
        category: "noun",
        example: "التدريب يحسن من مهارات الموظفين - Training improves employees' skills."
    },
    {
        arabic: "المهارة",
        english: "Skill",
        category: "noun",
        example: "المهارة في التواصل ضرورية للعمل - Communication skill is essential for work."
    },
    {
        arabic: "الخبرة",
        english: "Experience",
        category: "noun",
        example: "الخبرة العملية مطلوبة للترقية - Practical experience is required for promotion."
    },
    {
        arabic: "المسمى الوظيفي",
        english: "Job Title",
        category: "noun",
        example: "المسمى الوظيفي يحدد المسؤوليات - Job title determines the responsibilities."
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayAllTerms();
    
    // Add enter key functionality to search
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchTerm();
        }
    });
});

// Display all terms in the dictionary tab
function displayAllTerms() {
    const termsList = document.getElementById('termsList');
    termsList.innerHTML = '';
    
    hrTerms.forEach(term => {
        const termCard = createTermCard(term);
        termsList.appendChild(termCard);
    });
}

// Create a term card element
function createTermCard(term, index = null) {
    const card = document.createElement('div');
    card.className = 'term-card';
    
    const termIndex = index !== null ? index : hrTerms.indexOf(term);
    const isFavorite = favoriteTerms.includes(termIndex);
    
    card.innerHTML = `
        <div class="term-header">
            <button class="speak-btn" onclick="speakText('${term.arabic}', 'ar')" title="استمع للنطق العربي">🔊</button>
            <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${termIndex})" title="إضافة للمفضلة">
                ${isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
        <div class="term-arabic" onclick="speakText('${term.arabic}', 'ar')">${term.arabic}</div>
        <div class="term-english" onclick="speakText('${term.english}', 'en')">${term.english}</div>
        <div class="term-category">${term.category}</div>
        <div class="term-example">${term.example}</div>
        <button class="speak-btn-en" onclick="speakText('${term.english}', 'en')" title="Listen to English pronunciation">🔊 EN</button>
    `;
    
    return card;
}

// Search functionality
function searchTerm() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        hideSearchResults();
        return;
    }
    
    const results = hrTerms.filter(term => 
        term.arabic.toLowerCase().includes(query) ||
        term.english.toLowerCase().includes(query)
    );
    
    displaySearchResults(results, query);
}

// Display search results
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    const resultsContainer = document.getElementById('resultsContainer');
    
    searchResults.style.display = 'block';
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                لم يتم العثور على نتائج لـ "${query}"<br>
                No results found for "${query}"
            </div>
        `;
        return;
    }
    
    results.forEach(term => {
        const termCard = createTermCard(term);
        resultsContainer.appendChild(termCard);
    });
    
    // Scroll to results
    searchResults.scrollIntoView({ behavior: 'smooth' });
}

// Hide search results
function hideSearchResults() {
    document.getElementById('searchResults').style.display = 'none';
}

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Hide search results when switching tabs
    hideSearchResults();
    
    // Clear search input
    document.getElementById('searchInput').value = '';
}

// Clear search functionality
function clearSearch() {
    document.getElementById('searchInput').value = '';
    hideSearchResults();
}

// Add pronunciation feature
function speakText(text, lang = 'ar') {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Add favorite terms functionality
let favoriteTerms = JSON.parse(localStorage.getItem('favoriteTerms')) || [];

function toggleFavorite(index) {
    if (favoriteTerms.includes(index)) {
        favoriteTerms = favoriteTerms.filter(i => i !== index);
    } else {
        favoriteTerms.push(index);
    }
    localStorage.setItem('favoriteTerms', JSON.stringify(favoriteTerms));
    displayAllTerms(); // Refresh display
}

// Show favorites only
function showFavorites() {
    const termsList = document.getElementById('termsList');
    termsList.innerHTML = '';
    
    if (favoriteTerms.length === 0) {
        termsList.innerHTML = '<div class="no-results">لا توجد مصطلحات مفضلة بعد<br>No favorite terms yet</div>';
        return;
    }
    
    favoriteTerms.forEach(index => {
        if (hrTerms[index]) {
            const termCard = createTermCard(hrTerms[index], index);
            termsList.appendChild(termCard);
        }
    });
}

// Add quiz functionality
let currentQuizTerm = null;
let quizScore = 0;
let quizTotal = 0;

function startQuiz() {
    const randomIndex = Math.floor(Math.random() * hrTerms.length);
    currentQuizTerm = hrTerms[randomIndex];
    
    const quizContainer = document.getElementById('quizContainer');
    const isArabicToEnglish = Math.random() > 0.5;
    
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <h4>ترجم المصطلح التالي:</h4>
            <div class="quiz-term">${isArabicToEnglish ? currentQuizTerm.arabic : currentQuizTerm.english}</div>
            <input type="text" id="quizAnswer" placeholder="اكتب الترجمة هنا...">
            <button onclick="checkQuizAnswer(${isArabicToEnglish})">تحقق من الإجابة</button>
            <div id="quizResult"></div>
            <div class="quiz-score">النتيجة: ${quizScore}/${quizTotal}</div>
        </div>
    `;
    
    // Focus on input
    setTimeout(() => document.getElementById('quizAnswer').focus(), 100);
}

function checkQuizAnswer(isArabicToEnglish) {
    const userAnswer = document.getElementById('quizAnswer').value.trim().toLowerCase();
    const correctAnswer = isArabicToEnglish ? currentQuizTerm.english.toLowerCase() : currentQuizTerm.arabic;
    const resultDiv = document.getElementById('quizResult');
    
    quizTotal++;
    
    if (userAnswer === correctAnswer.toLowerCase() || userAnswer.includes(correctAnswer.toLowerCase().split(' ')[0])) {
        quizScore++;
        resultDiv.innerHTML = `<div class="correct">✅ صحيح! Correct!</div>`;
        resultDiv.className = 'quiz-result correct';
    } else {
        resultDiv.innerHTML = `<div class="incorrect">❌ خطأ! الإجابة الصحيحة: ${correctAnswer}</div>`;
        resultDiv.className = 'quiz-result incorrect';
    }
    
    // Update score display
    document.querySelector('.quiz-score').textContent = `النتيجة: ${quizScore}/${quizTotal}`;
    
    // Show next question button
    setTimeout(() => {
        resultDiv.innerHTML += '<button onclick="startQuiz()">سؤال آخر</button>';
    }, 2000);
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add click to copy functionality for terms
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('term-english') || e.target.classList.contains('term-arabic')) {
            const text = e.target.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary feedback
                const originalText = e.target.textContent;
                e.target.textContent = 'تم النسخ! / Copied!';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 1000);
            });
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    });
});
