document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "How are you currently managing your property?",
            options: ["Myself", "Through a property management company", "Not currently being managed"],
            name: "managementStatus",
            multiple: false
        },
        {
            question: "If you are using a management service, how satisfied are you with their performance?",
            options: ["Very satisfied", "Somewhat satisfied", "Neutral", "Somewhat dissatisfied", "Very dissatisfied"],
            name: "satisfaction",
            multiple: false
        },
        {
            question: "What is your biggest challenge in managing your property?",
            options: ["Finding reliable tenants", "Handling maintenance and repairs", "Dealing with legal and compliance issues", "Managing property finances", "Vacancies", "All of the above", "None"],
            name: "biggestChallenge",
            multiple: true
        },
        {
            question: "What aspect of property management would you most like to improve?",
            options: ["Efficiency of operations", "Cost management", "Tenant satisfaction", "Response time to issues", "Technology integration", "All of the above", "None"],
            name: "improvementAspect",
            multiple: true
        },
        {
            question: "How do you handle tenant screening and leasing?",
            options: ["I do it myself", "I use a property management service", "I need help with this"],
            name: "tenantScreening",
            multiple: false
        },
        {
            question: "What is your biggest legal concern with property management?",
            options: ["Lease agreements", "Eviction processes", "Local regulations compliance", "All of the above", "None"],
            name: "legalConcerns",
            multiple: true
        },
        {
            question: "What financial aspect of property management would you like to improve?",
            options: ["Reducing costs", "Streamlining rent collection", "Budget forecasting", "Improving ROI", "All of the above", "None"],
            name: "financialImprovement",
            multiple: true
        },
        {
            question: "How important is technology in managing your property?",
            options: ["Very important", "Somewhat important", "Not important", "Interested in learning more"],
            name: "techImportance",
            multiple: false
        },
        {
            question: "Would you be interested in learning more about our property management services?",
            options: ["Yes, please contact me with more information.", "Maybe, I need more details.", "No, I'm not interested at this time."],
            name: "interestInServices",
            multiple: false
        }
    ];
    let currentQuestionIndex = 0;
    const questionContainer = document.getElementById('questionContainer');

    function displayQuestion() {
        questionContainer.innerHTML = ''; // Clear previous contents
        const questionData = questions[currentQuestionIndex];
        const questionElem = document.createElement('div');
        questionElem.classList.add('question');
        questionElem.textContent = questionData.question;
        questionContainer.appendChild(questionElem);

        questionData.options.forEach((option, index) => {
            const answerElem = document.createElement('label');
            answerElem.classList.add('answer');
            const input = document.createElement('input');
            input.type = questionData.multiple ? 'checkbox' : 'radio';
            input.name = questionData.name;
            input.value = option;
            input.id = "option" + index; // Unique ID for the label 'for' attribute

            const description = document.createTextNode(option);
            answerElem.appendChild(input);
            answerElem.appendChild(description);

            questionContainer.appendChild(answerElem);

            input.addEventListener('change', selectAnswer); // Add change listener directly to the input
        });

        if (questionData.multiple) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', nextQuestion); // Handles moving to the next question
            questionContainer.appendChild(nextButton);
        }
    }

    function selectAnswer() {
        if (!questions[currentQuestionIndex].multiple) {
            let selectedOption = document.querySelector(`input[name="${questions[currentQuestionIndex].name}"]:checked`).value;
            questions[currentQuestionIndex].selectedAnswer = selectedOption;
            nextQuestion();
        }
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        questionContainer.innerHTML = '<h2>Thank you for completing the assessment!</h2><p>Enter your email to receive more information:</p>';
        const emailForm = document.createElement('form');
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.placeholder = 'Your email address';
        emailForm.appendChild(emailInput);
    
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        emailForm.appendChild(submitButton);
    
        emailForm.onsubmit = function(e) {
            e.preventDefault();
            collectEmail(emailInput.value);
        };
    
        questionContainer.appendChild(emailForm);
    }
    
    function collectEmail(email) {
        console.log("Email collected:", email);
        // Additional code to handle the email (e.g., send it to a server)
        questionContainer.innerHTML = '<h2>Thank you for your interest!</h2>';
    }
    
   

    displayQuestion(); // Initially display the first question
});
