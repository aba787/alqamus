
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
    
    // Load voices when available
    if ('speechSynthesis' in window) {
        speechSynthesis.addEventListener('voiceschanged', function() {
            console.log('Available voices loaded');
        });
    }
    
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
    
    // Add voice settings panel
    createVoiceSettings();
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

// Enhanced pronunciation feature with better voice settings and quality
function speakText(text, lang = 'ar') {
    if ('speechSynthesis' in window) {
        // Stop any current speech and clear queue
        speechSynthesis.cancel();
        
        // Wait a moment to ensure clean start
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Configure voice settings based on language for better clarity
            if (lang === 'ar') {
                utterance.lang = 'ar-SA';
                utterance.rate = 0.85; // Slower for better clarity in Arabic
                utterance.pitch = 1.0; // Natural pitch for clearer sound
                utterance.volume = 1.0; // Maximum volume for clarity
            } else {
                utterance.lang = 'en-US';
                utterance.rate = 0.75; // Slower English for better pronunciation
                utterance.pitch = 1.0; // Natural pitch
                utterance.volume = 1.0; // Maximum volume
            }
            
            // Enhanced voice selection for better quality
            const voices = speechSynthesis.getVoices();
            let selectedVoice = null;
            
            if (lang === 'ar') {
                // Priority order for Arabic voices
                selectedVoice = voices.find(voice => 
                    voice.lang.includes('ar-SA') || 
                    voice.lang.includes('ar-EG') || 
                    voice.lang.includes('ar')
                ) || voices.find(voice => voice.lang.startsWith('ar'));
            } else {
                // Priority order for English voices
                selectedVoice = voices.find(voice => 
                    voice.name.includes('Google') && voice.lang.includes('en-US')
                ) || voices.find(voice => 
                    voice.name.includes('Microsoft') && voice.lang.includes('en-US')
                ) || voices.find(voice => voice.lang.includes('en-US')) || 
                voices.find(voice => voice.lang.startsWith('en'));
            }
            
            if (selectedVoice) {
                utterance.voice = selectedVoice;
                console.log(`Using voice: ${selectedVoice.name} (${selectedVoice.lang})`);
            }
            
            // Enhanced event handlers for better experience
            utterance.onstart = function() {
                document.body.style.setProperty('--speech-active', '1');
                showSpeechIndicator();
                console.log(`Speaking: ${text}`);
            };
            
            utterance.onend = function() {
                document.body.style.setProperty('--speech-active', '0');
                hideSpeechIndicator();
                console.log('Speech ended successfully');
            };
            
            utterance.onerror = function(event) {
                console.error('Speech error:', event.error);
                hideSpeechIndicator();
                // Retry once if error occurs
                if (event.error === 'interrupted' || event.error === 'canceled') {
                    setTimeout(() => {
                        speechSynthesis.speak(utterance);
                    }, 100);
                }
            };
            
            utterance.onpause = function() {
                console.log('Speech paused');
            };
            
            utterance.onresume = function() {
                console.log('Speech resumed');
            };
            
            // Speak with enhanced settings
            speechSynthesis.speak(utterance);
            
        }, 50); // Small delay for clean speech start
        
    } else {
        alert('المتصفح لا يدعم ميزة النطق - Speech not supported in this browser');
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

// Show visual speech indicator
function showSpeechIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'speechIndicator';
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 30px;
        font-size: 14px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        animation: pulseIndicator 1.5s infinite;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    indicator.innerHTML = `
        <div style="width: 20px; height: 20px; background: white; border-radius: 50%; animation: bounce 1s infinite;"></div>
        جاري النطق... Speaking...
    `;
    
    document.body.appendChild(indicator);
}

// Hide speech indicator
function hideSpeechIndicator() {
    const indicator = document.getElementById('speechIndicator');
    if (indicator) {
        indicator.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => indicator.remove(), 500);
    }
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

// Create voice settings panel
function createVoiceSettings() {
    const settingsBtn = document.createElement('button');
    settingsBtn.innerHTML = '🎙️ إعدادات الصوت';
    settingsBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #8B1538, #722F37);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 20px;
        font-size: 14px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(139, 21, 56, 0.4);
    `;
    
    settingsBtn.onclick = function() {
        const panel = document.getElementById('voicePanel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        } else {
            createVoicePanel();
        }
    };
    
    document.body.appendChild(settingsBtn);
}

// Create voice control panel
function createVoicePanel() {
    const panel = document.createElement('div');
    panel.id = 'voicePanel';
    panel.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 20px;
        width: 300px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-size: 14px;
    `;
    
    panel.innerHTML = `
        <h4 style="margin-bottom: 15px; color: #667eea;">إعدادات النطق عالي الجودة</h4>
        <div style="margin-bottom: 10px;">
            <label>سرعة النطق العربي (للوضوح):</label>
            <input type="range" id="arabicSpeed" min="0.3" max="1.5" step="0.05" value="0.85">
            <span id="arabicSpeedValue">0.85</span>
        </div>
        <div style="margin-bottom: 10px;">
            <label>سرعة النطق الإنجليزي (للوضوح):</label>
            <input type="range" id="englishSpeed" min="0.3" max="1.5" step="0.05" value="0.75">
            <span id="englishSpeedValue">0.75</span>
        </div>
        <div style="margin-bottom: 10px;">
            <label>مستوى الصوت (أقصى وضوح):</label>
            <input type="range" id="volumeLevel" min="0.5" max="1" step="0.05" value="1.0">
            <span id="volumeValue">1.0</span>
        </div>
        <button onclick="testVoice()" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 8px 15px; border-radius: 10px; cursor: pointer;">🎵 اختبار الصوت</button>
    `;
    
    document.body.appendChild(panel);
    
    // Add event listeners for sliders
    document.getElementById('arabicSpeed').oninput = function() {
        document.getElementById('arabicSpeedValue').textContent = this.value;
    };
    
    document.getElementById('englishSpeed').oninput = function() {
        document.getElementById('englishSpeedValue').textContent = this.value;
    };
    
    document.getElementById('volumeLevel').oninput = function() {
        document.getElementById('volumeValue').textContent = this.value;
    };
}

// Enhanced test voice function with improved clarity
function testVoice() {
    const arabicSpeed = document.getElementById('arabicSpeed').value;
    const englishSpeed = document.getElementById('englishSpeed').value;
    const volume = document.getElementById('volumeLevel').value;
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    // Test Arabic with enhanced settings
    setTimeout(() => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('مرحباً، هذا اختبار للصوت العربي الواضح بدون تقطع');
            utterance.lang = 'ar-SA';
            utterance.rate = parseFloat(arabicSpeed);
            utterance.volume = parseFloat(volume);
            utterance.pitch = 1.0;
            
            // Find best Arabic voice
            const voices = speechSynthesis.getVoices();
            const arabicVoice = voices.find(voice => 
                voice.lang.includes('ar-SA') || voice.lang.includes('ar')
            );
            if (arabicVoice) {
                utterance.voice = arabicVoice;
            }
            
            utterance.onend = function() {
                // Test English after Arabic completes
                setTimeout(() => {
                    if ('speechSynthesis' in window) {
                        const englishUtterance = new SpeechSynthesisUtterance('Hello, this is a clear English voice test without interruption');
                        englishUtterance.lang = 'en-US';
                        englishUtterance.rate = parseFloat(englishSpeed);
                        englishUtterance.volume = parseFloat(volume);
                        englishUtterance.pitch = 1.0;
                        
                        // Find best English voice
                        const englishVoice = voices.find(voice => 
                            voice.lang.includes('en-US') && 
                            (voice.name.includes('Google') || voice.name.includes('Microsoft'))
                        ) || voices.find(voice => voice.lang.includes('en-US'));
                        
                        if (englishVoice) {
                            englishUtterance.voice = englishVoice;
                        }
                        
                        speechSynthesis.speak(englishUtterance);
                    }
                }, 200);
            };
            
            speechSynthesis.speak(utterance);
        }
    }, 200);
}

// Update speakText to use enhanced custom settings for clarity
const originalSpeakText = speakText;
speakText = function(text, lang = 'ar') {
    const arabicSpeed = document.getElementById('arabicSpeed')?.value || 0.85;
    const englishSpeed = document.getElementById('englishSpeed')?.value || 0.75;
    const volume = document.getElementById('volumeLevel')?.value || 1.0;
    
    if ('speechSynthesis' in window) {
        // Enhanced stopping and clearing for better audio quality
        speechSynthesis.cancel();
        
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);
            
            if (lang === 'ar') {
                utterance.lang = 'ar-SA';
                utterance.rate = parseFloat(arabicSpeed);
                utterance.pitch = 1.0; // Natural pitch for clarity
                utterance.volume = parseFloat(volume);
            } else {
                utterance.lang = 'en-US';
                utterance.rate = parseFloat(englishSpeed);
                utterance.pitch = 1.0; // Natural pitch for clarity
                utterance.volume = parseFloat(volume);
            }
            
            // Enhanced voice selection
            const voices = speechSynthesis.getVoices();
            let selectedVoice = null;
            
            if (lang === 'ar') {
                selectedVoice = voices.find(voice => 
                    voice.lang.includes('ar-SA') || voice.lang.includes('ar')
                );
            } else {
                selectedVoice = voices.find(voice => 
                    voice.lang.includes('en-US') && 
                    (voice.name.includes('Google') || voice.name.includes('Microsoft'))
                ) || voices.find(voice => voice.lang.includes('en-US'));
            }
            
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            
            utterance.onstart = function() {
                showSpeechIndicator();
            };
            
            utterance.onend = function() {
                hideSpeechIndicator();
            };
            
            utterance.onerror = function(event) {
                console.error('Speech error:', event.error);
                hideSpeechIndicator();
            };
            
            speechSynthesis.speak(utterance);
        }, 50); // Small delay for cleaner audio
    }
};

// تم نقل جميع الـ CSS animations إلى ملف style.css لتحسين التنظيم
console.log('جميع الـ CSS animations موجودة الآن في style.css');
