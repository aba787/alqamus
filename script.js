
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
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Add loading animation
    addLoadingAnimations();
    
    // Initialize particles background
    initParticles();
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
                // Show beautiful notification
                showCopyNotification(e.target, text);
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

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.add('ripple');
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add loading animations
function addLoadingAnimations() {
    const cards = document.querySelectorAll('.term-card, .rule-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Beautiful copy notification
function showCopyNotification(element, text) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 1000;
        opacity: 0;
        animation: copyNotification 2s ease;
        pointer-events: none;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    notification.textContent = '✓ تم النسخ!';
    
    const parent = element.parentElement;
    parent.style.position = 'relative';
    parent.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize particles background
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

// Create floating particles
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: float ${Math.random() * 20 + 10}s infinite linear;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (Math.random() * 20 + 10) * 1000);
}

// Enhanced search with visual feedback
function searchTerm() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    // Add searching animation
    searchInput.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
    
    setTimeout(() => {
        searchInput.style.background = 'rgba(255, 255, 255, 0.9)';
    }, 300);
    
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes copyNotification {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
    
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
    }
`;
document.head.appendChild(style);
