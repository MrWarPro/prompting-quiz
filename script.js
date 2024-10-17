const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option');
let currentQuestion = 0;

let moneyLadder = [
    {
        question: 'What is a prompt in the context of AI (for example ChatGPT)?',
        options: ['A: A command that tells an AI to stop its operation.', 'B: A set of instructions or a question given to an AI to generate a response.', 'C: A technical error message displayed by the AI system.', 'D: A type of data used to train an AI model.'],
        correct: 1
    },
    {
        question: 'Which of the following is an example of a prompt?',
        options: ['A: Explain the water cycle.', 'B: The water cycle is important.', 'C: Water evaporates into clouds.', 'D: Clouds are white and fluffy.'],
        correct: 0
    },
    {
        question: 'Which of the following prompts is better for generating a specific and detailed response from an AI?',
        options: ['A: Tell me about climate change.', 'B: Describe how human activities contribute to climate change through carbon emissions and how it impacts global temperatures.', 'C: What do you know about the weather?', 'D: Write something about the environment.'],
        correct: 1
    },
    {
        question: "In which year was OpenAI's ChatGPT first released to the public?",
        options: ['A: 2019', 'B: 2020', 'C: 2021', 'D: 2022'],
        correct: 3
    },
    {
        question: 'What is iterative prompting?',
        options: ['A: Repeatedly asking the same question until the AI gives the correct answer.', 'B: A method where prompts are refined and repeated using previous responses to ask follow-up questions for more detailed or accurate results.', 'C: Asking multiple questions in a single prompt to get a longer response.', 'D: Using random prompts to test AI\'s flexibility.'],
        correct: 1
    },
    {
        question: 'Which of the following is an advanced prompting technique designed to improve reliability and performance of LLMs?',
        options: ['A: Zero-shot Prompting', 'B: Random Prompting', 'C: Passive Prompting', 'D: Disconnected Prompting'],
        correct: 0
    },
    {
        question: 'Which technique is used to improve a model\'s performance by providing demonstrations or examples in the prompt to guide the model?',
        options: ['A: Zero-shot Prompting', 'B: Few-shot Prompting', 'C: Chain-of-Thought Prompting', 'D: Random Labeling'],
        correct: 1
    },
    {
        question: 'What is the key feature of Automatic Reasoning and Tool-use (ART) when applied to large language models?',
        options: ['A: It requires no demonstrations for multi-step reasoning.', 'B: It integrates external tool outputs during task generation.', 'C: It performs tasks without any pauses or tool use.', 'D: It is designed specifically for single-step tasks only.'],
        correct: 1
    },
    {
        question: 'What is the main purpose of Directional Stimulus Prompting (DSP) in large language models (LLMs)?',
        options: ['A: To simplify the model\'s architecture by removing hints.', 'B: To optimize model outputs through random stimuli.', 'C: To guide a frozen LLM using hints generated by a smaller policy model.', 'D: To improve zero-shot learning without any external input.'],
        correct: 2
    },
    {
        question: 'What is the key advancement of Multimodal CoT Prompting compared to traditional chain-of-thought (CoT) prompting?',
        options: ['A: It eliminates the need for rationale generation.', 'B: It incorporates both text and vision modalities in reasoning.', 'C: It reduces the number of reasoning steps required.', 'D: It focuses exclusively on language processing.'],
        correct: 1
    },
    {
        question: 'What is a key feature of the Reflexion framework in language-based agents?',
        options: ['A: It eliminates the need for memory in decision-making.', 'B: It provides verbal feedback to help agents learn from prior mistakes.', 'C: It relies on traditional reinforcement learning methods for improvement.', 'D: It requires extensive model fine-tuning to enhance performance.'],
        correct: 1
    },
    {
        question: 'What is the key difference between Program-Aided Language Models (PAL) and traditional chain-of-thought (CoT) prompting?',
        options: ['A: PAL generates solutions using free-form text.', 'B: PAL offloads the solution step to a programmatic runtime.', 'C: PAL focuses only on language-based reasoning.', 'D: PAL requires no external tools for task execution.'],
        correct: 1
    },
    {
        question: 'What is the main goal of the Active-Prompt approach in adapting LLMs to specific tasks?',
        options: ['A: To remove the need for any human-annotated examples.', 'B: To select the most effective human-annotated examples based on uncertainty metrics.', 'C: To generate answers without any exemplars.', 'D: To simplify tasks by using only pre-defined examples.'],
        correct: 1
    },
    {
        question: 'What is a primary advantage of the Tree of Thoughts (ToT) framework compared to traditional chain-of-thought prompting?',
        options: ['A: It eliminates the need for intermediate steps in problem-solving.', 'B: It encourages exploration and strategic lookahead through tree-based reasoning.', 'C: It requires fewer steps to reach a solution.', 'D: It replaces search algorithms with a single-step process.'],
        correct: 1
    },
    {
        question: 'What is the primary benefit of Prompt Chaining in the context of large language models (LLMs)?',
        options: ['A: It simplifies tasks by using only one complex prompt.', 'B: It allows LLMs to perform multiple subtasks in sequence, increasing reliability and transparency.', 'C: It eliminates the need for human-designed prompts.', 'D: It focuses exclusively on reducing the size of the language model.'],
        correct: 1
    },
    {
        question: 'What is a key characteristic of Meta Prompting compared to traditional content-centric prompting techniques?',
        options: ['A: It focuses on solving problems by providing detailed content examples.', 'B: It emphasizes the structure and syntax of problems over specific content.', 'C: It eliminates the need for problem-solving patterns and logic.', 'D: It is limited to specific domains like coding and mathematics.'],
        correct: 1
    }
];

function loadQuestion() {
    let questionData = moneyLadder[currentQuestion];
    questionElement.textContent = questionData.question;

    options.forEach((option, index) => {
        option.textContent = questionData.options[index];
        option.dataset.answer = index === questionData.correct ? 'correct' : 'wrong';
    });
}

options.forEach(option => {
    option.addEventListener('click', (event) => {
        if (event.target.dataset.answer === 'correct') {
            event.target.classList.add('correct-animation');
            setTimeout(() => {
                event.target.classList.remove('correct-animation');

                // Move to the next question
                currentQuestion++;
                if (currentQuestion < moneyLadder.length) {
                    loadQuestion();
                    document.querySelector('.money-ladder ul').children[14 - currentQuestion].classList.add('highlight');
                } else {
                    alert('Congratulations! You completed the quiz.');
                    resetGame();
                }
            }, 1000);
        } else {
            event.target.classList.add('wrong-animation');
            setTimeout(() => {
                event.target.classList.remove('wrong-animation');
            }, 1000);
        }
    });
});

function resetGame() {
    currentQuestion = 0;
    loadQuestion();
    document.querySelectorAll('.money-ladder ul li').forEach((li, index) => {
        li.classList.remove('highlight');
    });
    document.querySelector('.money-ladder ul').children[14].classList.add('highlight');
}

loadQuestion();
document.querySelector('.money-ladder ul').children[14].classList.add('highlight');
