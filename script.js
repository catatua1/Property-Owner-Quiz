import { submitQuizData } from './data-collector-script.js';
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

    function collectAnswersFromForm() {
        const answers = {};
        questions.forEach(question => {
            const inputs = document.querySelectorAll(`input[name="${question.name}"]`);
            if (question.multiple) {
                answers[question.name] = Array.from(inputs)
                                              .filter(input => input.checked)
                                              .map(input => input.value);
            } else {
                const checkedInput = Array.from(inputs).find(input => input.checked);
                answers[question.name] = checkedInput ? checkedInput.value : null;
            }
        });
        return answers;
    }    

    function displayQuestion() {
        console.log('Displaying question:', currentQuestionIndex);
        questionContainer.innerHTML = ''; // Clear previous contents
        const questionData = questions[currentQuestionIndex];
        console.log('Current question data:', questionData);
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
        emailForm.id = 'emailForm';
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.placeholder = 'Your email address';
        emailInput.id = 'emailInput';
        emailForm.appendChild(emailInput);
    
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        emailForm.appendChild(submitButton);
    
        emailForm.onsubmit = async function(e) {
            e.preventDefault();
            const email = emailInput.value;
            const answers = collectAnswersFromForm(); // Collect all answers
            await submitQuizData(email, answers); // Submit data to Firebase
            questionContainer.innerHTML = '<h2>Thank you for your interest!</h2>';
        };
    
        questionContainer.appendChild(emailForm);
    }

    displayQuestion(); // Initially display the first question
});

document.querySelector('#quizForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.querySelector('#emailInput').value; // Ensure you have an input field with id 'emailInput' for collecting emails
    const answers = collectAnswersFromForm(); // This function needs to be defined to collect answers from your form

    try {
        await submitQuizData(email, answers); // Ensure 'submitQuizData' is properly defined or imported if it's in another script
        console.log("Data submitted");
    } catch (error) {
        console.error("Failed to submit data:", error);
    }
});
