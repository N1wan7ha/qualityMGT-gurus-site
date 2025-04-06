document.addEventListener('DOMContentLoaded', function() {
    // Quiz questions data
    const quizQuestions = [
      {
        question: "Who is known for introducing the 14 Points for Management?",
        options: [
          { text: "Philip Crosby", value: "A" },
          { text: "Joseph Juran", value: "B" },
          { text: "W. Edwards Deming", value: "C" },
          { text: "Kaoru Ishikawa", value: "D" }
        ],
        answer: "C",
        explanation: "W. Edwards Deming introduced the influential 14 Points for Management as part of his philosophy for transforming business effectiveness."
      },
      {
        question: "Which Quality Guru is associated with the concept of \"Zero Defects\"?",
        options: [
          { text: "Genichi Taguchi", value: "A" },
          { text: "Shigeo Shingo", value: "B" },
          { text: "Philip Crosby", value: "C" },
          { text: "Joseph Juran", value: "D" }
        ],
        answer: "C",
        explanation: "Philip Crosby championed the concept of \"Zero Defects\" and emphasized that quality is free when done right the first time."
      },
      {
        question: "Who developed the \"Quality Trilogy\" consisting of Quality Planning, Quality Control, and Quality Improvement?",
        options: [
          { text: "W. Edwards Deming", value: "A" },
          { text: "Philip Crosby", value: "B" },
          { text: "Genichi Taguchi", value: "C" },
          { text: "Joseph Juran", value: "D" }
        ],
        answer: "D",
        explanation: "Joseph Juran developed the Quality Trilogy framework that divides quality management into three interconnected processes."
      },
      {
        question: "Who is credited with developing the \"Theory of Constraints\"?",
        options: [
          { text: "Eliyahu Goldratt", value: "A" },
          { text: "Kaoru Ishikawa", value: "B" },
          { text: "Shigeo Shingo", value: "C" },
          { text: "Philip Crosby", value: "D" }
        ],
        answer: "A",
        explanation: "Eliyahu Goldratt developed the Theory of Constraints, which focuses on identifying and managing the bottlenecks in a system."
      },
      {
        question: "Which Quality Guru emphasized the importance of statistical process control (SPC)?",
        options: [
          { text: "Kaoru Ishikawa", value: "A" },
          { text: "Genichi Taguchi", value: "B" },
          { text: "W. Edwards Deming", value: "C" },
          { text: "Joseph Juran", value: "D" }
        ],
        answer: "C",
        explanation: "W. Edwards Deming strongly emphasized the use of statistical process control to improve quality and reduce variation."
      },
      {
        question: "Who is known for developing the Fishbone Diagram (also called the Cause-and-Effect Diagram)?",
        options: [
          { text: "Philip Crosby", value: "A" },
          { text: "Kaoru Ishikawa", value: "B" },
          { text: "Joseph Juran", value: "C" },
          { text: "Genichi Taguchi", value: "D" }
        ],
        answer: "B",
        explanation: "Kaoru Ishikawa developed the Cause-and-Effect (Fishbone) Diagram to help identify potential causes of quality problems."
      },
      {
        question: "Which Quality Guru introduced the concept of Cost of Quality (COQ)?",
        options: [
          { text: "W. Edwards Deming", value: "A" },
          { text: "Philip Crosby", value: "B" },
          { text: "Kaoru Ishikawa", value: "C" },
          { text: "Shigeo Shingo", value: "D" }
        ],
        answer: "B",
        explanation: "Philip Crosby introduced the Cost of Quality concept, categorizing quality costs into prevention, appraisal, and failure costs."
      },
      {
        question: "Which of the following is associated with Taguchi's approach to quality?",
        options: [
          { text: "Total Quality Management", value: "A" },
          { text: "Six Sigma", value: "B" },
          { text: "Loss Function", value: "C" },
          { text: "5S System", value: "D" }
        ],
        answer: "C",
        explanation: "Genichi Taguchi is known for the Loss Function, which quantifies the cost of deviation from target specifications."
      },
      {
        question: "Who is considered the father of Total Quality Control (TQC) in Japan?",
        options: [
          { text: "W. Edwards Deming", value: "A" },
          { text: "Kaoru Ishikawa", value: "B" },
          { text: "Joseph Juran", value: "C" },
          { text: "Genichi Taguchi", value: "D" }
        ],
        answer: "B",
        explanation: "Kaoru Ishikawa is considered the father of Total Quality Control in Japan and promoted company-wide quality management."
      },
      {
        question: "Which Quality Guru emphasized \"Fitness for Use\" as a definition of quality?",
        options: [
          { text: "Philip Crosby", value: "A" },
          { text: "Genichi Taguchi", value: "B" },
          { text: "Joseph Juran", value: "C" },
          { text: "Kaoru Ishikawa", value: "D" }
        ],
        answer: "C",
        explanation: "Joseph Juran defined quality as \"Fitness for Use,\" emphasizing that quality is judged by the user based on intended purpose."
      }
    ];
  
    // Quiz state variables
    let currentQuestion = 0;
    let userAnswers = Array(quizQuestions.length).fill(null);
    let startTime;
    let timerInterval;
  
    // DOM elements
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizIntro = document.getElementById('quizIntro');
    const quizContainer = document.getElementById('quizContainer');
    const questionContainer = document.getElementById('questionContainer');
    const questionIndicator = document.getElementById('questionIndicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const quizResult = document.getElementById('quizResult');
    const reviewContainer = document.getElementById('reviewContainer');
    const reviewContent = document.getElementById('reviewContent');
    const reviewBtn = document.getElementById('reviewBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const backToResultsBtn = document.getElementById('backToResultsBtn');
    const quizProgress = document.getElementById('quizProgress');
    const quizTimer = document.getElementById('quizTimer');
    
    // Initialize back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });
      
      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    // Start quiz
    startQuizBtn.addEventListener('click', function() {
      quizIntro.classList.add('d-none');
      quizContainer.classList.remove('d-none');
      startTimer();
      displayQuestion();
    });
  
    // Previous question
    prevBtn.addEventListener('click', function() {
      if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
      }
    });
  
    // Next question
    nextBtn.addEventListener('click', function() {
      saveAnswer();
      
      if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
      } else {
        finishQuiz();
      }
    });
  
    // Review answers
    reviewBtn.addEventListener('click', function() {
      quizResult.classList.add('d-none');
      reviewContainer.classList.remove('d-none');
      showReview();
    });
  
    // Back to results
    backToResultsBtn.addEventListener('click', function() {
      reviewContainer.classList.add('d-none');
      quizResult.classList.remove('d-none');
    });
  
    // Retake quiz
    retakeBtn.addEventListener('click', function() {
      resetQuiz();
      quizResult.classList.add('d-none');
      quizIntro.classList.remove('d-none');
    });
  
    // Display current question
    function displayQuestion() {
      const question = quizQuestions[currentQuestion];
      
      // Update question indicator
      questionIndicator.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
      
      // Update progress bar
      updateProgress();
      
      // Enable/disable navigation buttons
      prevBtn.disabled = currentQuestion === 0;
      nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next';
      nextBtn.innerHTML = currentQuestion === quizQuestions.length - 1 ? 
        'Finish Quiz<i class="fas fa-check ms-2"></i>' : 
        'Next<i class="fas fa-arrow-right ms-2"></i>';
      
      // Create question HTML
      let html = `
        <div class="question-card">
          <h4 class="mb-4">${currentQuestion + 1}. ${question.question}</h4>
          <div class="options-container">
      `;
      
      // Add options
      question.options.forEach((option, index) => {
        const isChecked = userAnswers[currentQuestion] === option.value;
        html += `
          <div class="form-check option-item mb-3">
            <input class="form-check-input" type="radio" name="q${currentQuestion}" 
              id="q${currentQuestion}o${index}" value="${option.value}" ${isChecked ? 'checked' : ''}>
            <label class="form-check-label d-block" for="q${currentQuestion}o${index}">
              <span class="option-label">${option.value}</span>
              <span class="option-text">${option.text}</span>
            </label>
          </div>
        `;
      });
      
      html += `</div></div>`;
      questionContainer.innerHTML = html;
      
      // Add event listeners to radio buttons for automatic saving
      document.querySelectorAll(`input[name="q${currentQuestion}"]`).forEach(radio => {
        radio.addEventListener('change', function() {
          userAnswers[currentQuestion] = this.value;
          updateProgress();
        });
      });
    }
  
    // Save current answer
    function saveAnswer() {
      const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
      if (selectedOption) {
        userAnswers[currentQuestion] = selectedOption.value;
      }
    }
  
    // Update progress bar
    function updateProgress() {
      const answeredCount = userAnswers.filter(answer => answer !== null).length;
      const progressPercentage = (answeredCount / quizQuestions.length) * 100;
      quizProgress.style.width = `${progressPercentage}%`;
    }
  
    // Start timer
    function startTimer() {
      startTime = new Date();
      timerInterval = setInterval(updateTimer, 1000);
      updateTimer();
    }
  
    // Update timer display
    function updateTimer() {
      const now = new Date();
      const elapsedTime = Math.floor((now - startTime) / 1000); // in seconds
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      quizTimer.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  
    // Finish quiz and show results
    function finishQuiz() {
      saveAnswer();
      clearInterval(timerInterval);
      
      const score = calculateScore();
      const percentage = (score / quizQuestions.length) * 100;
      const elapsedTime = Math.floor((new Date() - startTime) / 1000);
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      
      // Set result content
      document.getElementById('scoreValue').textContent = `${score}/${quizQuestions.length}`;
      document.getElementById('percentValue').textContent = `${percentage}%`;
      document.getElementById('timeValue').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      // Set result message based on score
      const resultIcon = document.getElementById('resultIcon');
      const resultHeading = document.getElementById('resultHeading');
      const resultMessage = document.getElementById('resultMessage');
      
      if (percentage >= 90) {
        resultIcon.innerHTML = '<i class="fas fa-award text-warning"></i>';
        resultHeading.textContent = 'Excellent!';
        resultMessage.textContent = 'You have an outstanding knowledge of Quality Management pioneers!';
      } else if (percentage >= 70) {
        resultIcon.innerHTML = '<i class="fas fa-thumbs-up text-success"></i>';
        resultHeading.textContent = 'Good Job!';
        resultMessage.textContent = 'You have a solid understanding of Quality Management concepts.';
      } else if (percentage >= 50) {
        resultIcon.innerHTML = '<i class="fas fa-check-circle text-primary"></i>';
        resultHeading.textContent = 'Not Bad!';
        resultMessage.textContent = 'You have a basic grasp of Quality Management principles.';
      } else {
        resultIcon.innerHTML = '<i class="fas fa-book text-info"></i>';
        resultHeading.textContent = 'Keep Learning!';
        resultMessage.textContent = 'There\'s room for improvement in your Quality Management knowledge.';
      }
      
      // Show results
      quizContainer.classList.add('d-none');
      quizResult.classList.remove('d-none');
    }
  
    // Calculate score
    function calculateScore() {
      let score = 0;
      for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === quizQuestions[i].answer) {
          score++;
        }
      }
      return score;
    }
  
    // Show review of answers
    function showReview() {
      let html = '';
      
      for (let i = 0; i < quizQuestions.length; i++) {
        const question = quizQuestions[i];
        const userAnswer = userAnswers[i];
        const isCorrect = userAnswer === question.answer;
        
        html += `
          <div class="review-item mb-4 p-3 border rounded ${isCorrect ? 'border-success bg-success bg-opacity-10' : 'border-danger bg-danger bg-opacity-10'}">
            <h5 class="mb-3">Question ${i + 1}: ${question.question}</h5>
            <div class="mb-3">
              <p class="mb-1"><strong>Your answer:</strong> 
                <span class="${isCorrect ? 'text-success' : 'text-danger'}">
                  ${userAnswer ? `${userAnswer}) ${question.options.find(o => o.value === userAnswer).text}` : 'Not answered'}
                </span>
              </p>
              <p class="mb-1"><strong>Correct answer:</strong> 
                <span class="text-success">${question.answer}) ${question.options.find(o => o.value === question.answer).text}</span>
              </p>
            </div>
            <div class="explanation p-2 bg-light rounded">
              <p class="mb-0"><i class="fas fa-info-circle me-2 text-primary"></i>${question.explanation}</p>
            </div>
          </div>
        `;
      }
      
      reviewContent.innerHTML = html;
    }
  
    // Reset quiz
    function resetQuiz() {
      currentQuestion = 0;
      userAnswers = Array(quizQuestions.length).fill(null);
      clearInterval(timerInterval);
    }
  });
  
  // Additional app.js features for general site functionality
  
  // Enable tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  if (tooltipTriggerList.length > 0) {
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== "#") {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });