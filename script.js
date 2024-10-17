const startGameButton = document.getElementById('start-game');
const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option');
const fiftyFiftyButton = document.getElementById('fifty-fifty');
const callFriendButton = document.getElementById('call-friend');
const audiencePollButton = document.getElementById('ask-audience');
const audiencePollContainer = document.getElementById('audience-poll');
const shareButton = document.getElementById('share-button');
const shareContainer = document.getElementById('share-container');
let currentQuestion = 0;

// Get modal elements
const shareModal = document.getElementById('share-modal');
const closeShareModal = document.getElementById('close-share-modal');
const twitterShareButton = document.getElementById('twitter-share');
const facebookShareButton = document.getElementById('facebook-share');
const linkedinShareButton = document.getElementById('linkedin-share');
const copyLinkButton = document.getElementById('copy-link');

// Event listener for closing the share modal
closeShareModal.addEventListener('click', () => {
    shareModal.style.display = 'none';
});

// Close the start modal when the close button is clicked
document.getElementById('close-start-modal').addEventListener('click', () => {
    const startModal = document.getElementById('start-modal');
    startModal.style.display = 'none';
});

// Share on Twitter
twitterShareButton.addEventListener('click', () => {

    gtag('event', 'click', {
        'event_category': 'Button',
        'event_label': 'Twitter Share',
        'value': 1
    });

    const shareUrl = window.location.href;
    const shareText = "I just completed the 'Test Your Prompting Skills' game! Play now: ";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
});

// Share on Facebook
facebookShareButton.addEventListener('click', () => {

    gtag('event', 'click', {
        'event_category': 'Button',
        'event_label': 'Facebook Share',
        'value': 1
    });

    const shareUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
});

// Share on LinkedIn
linkedinShareButton.addEventListener('click', () => {

    gtag('event', 'click', {
        'event_category': 'Button',
        'event_label': 'LinkedIn Share',
        'value': 1
    });

    const shareUrl = window.location.href;
    const shareText = "I just completed the 'Test Your Prompting Skills' game! Play now: ";
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('Test Your Prompting Skills')}&summary=${encodeURIComponent(shareText)}`;
    window.open(linkedinUrl, '_blank');
});

// Copy link to clipboard
copyLinkButton.addEventListener('click', () => {

    gtag('event', 'click', {
        'event_category': 'Button',
        'event_label': 'Copy Link',
        'value': 1
    });

    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard!");
    }).catch(err => {
        console.error('Could not copy link: ', err);
    });
});

// Close the modal if the user clicks outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === shareModal) {
        shareModal.style.display = 'none';
    }

    const startModal = document.getElementById('start-modal');
    if (event.target === startModal) {
        startModal.style.display = 'none';
    }
});

let moneyLadder = [
    {
        "question": "Which prompt would be most effective for generating a marketing slogan for an eco-friendly product?",
        "options": [
            "A: Write a slogan that is catchy.",
            "B: Describe the benefits of an eco-friendly product.",
            "C: Create a slogan that emphasizes sustainability.",
            "D: Suggest a marketing idea for a new product."
        ],
        "correct": 2
    },
    {
        "question": "Which prompt is best for generating a step-by-step workout plan for strength training?",
        "options": [
            "A: Suggest a few strength exercises.",
            "B: Create a plan with exercises, sets, and reps for beginners.",
            "C: List some workouts for advanced athletes.",
            "D: Write general tips for staying active."
        ],
        "correct": 1
    },
    {
        "question": "How would you prompt an AI to write a technical bug report?",
        "options": [
            "A: Generate a bug report including steps to reproduce and the expected outcome.",
            "B: Write a summary about a software bug.",
            "C: Describe the software error in detail.",
            "D: Write a brief note about an issue."
        ],
        "correct": 0
    },
    {
        "question": "What is the key benefit of using chain-of-thought prompting with LLMs?",
        "options": [
            "A: It forces the AI to generate concise answers.",
            "B: It allows the AI to break down reasoning into intermediate steps.",
            "C: It asks for only one-word responses.",
            "D: It makes the response more random."
        ],
        "correct": 1
    },
    {
        "question": "What is the best way to get a balanced and informative response on a controversial topic from an AI?",
        "options": [
            "A: Ask for a summary of arguments.",
            "B: Provide both sides of the argument and ask the AI to summarize perspectives.",
            "C: Ignore context and ask a general question.",
            "D: Request only the pros of one side."
        ],
        "correct": 1
    }
];

function loadQuestion() {
    let questionData = moneyLadder[currentQuestion];
    questionElement.textContent = questionData.question;

    options.forEach((option, index) => {
        option.textContent = questionData.options[index];
        option.dataset.answer = index === questionData.correct ? 'correct' : 'wrong';
        option.style.display = 'block';
    });

    audiencePollContainer.style.display = 'none'; // Hide audience poll when loading a new question
}

options.forEach(option => {
    option.addEventListener('click', (event) => {
        if (event.target.disabled) return; // Prevent clicking disabled options

        if (event.target.dataset.answer === 'correct') {
            event.target.classList.add('correct-animation');
            setTimeout(() => {
                event.target.classList.remove('correct-animation');

                // Move to the next question
                currentQuestion++;
                if (currentQuestion < moneyLadder.length) {
                    loadQuestion();
                    document.querySelector('.money-ladder ul').children[4 - currentQuestion].classList.add('highlight');
                } else {
                    showCompletionMessage(); // Show the completion message
                }
            }, 1000);
        } else {
            event.target.classList.add('wrong-animation');
            setTimeout(() => {
                event.target.classList.remove('wrong-animation');
                // resetGame(); // Reset the game on wrong answer
            }, 1000);
        }
    });
});

// Show completion message
// Show completion message
function showCompletionMessage() {
    // Get references to the elements
    const mainContent = document.getElementById("main-content");
    const completionMessage = document.getElementById("completion-message");

    // Clone the completionMessage element to make it ready for replacement
    const newCompletionMessage = completionMessage.cloneNode(true);
    newCompletionMessage.style.display = "block"; // Make sure it is visible

    // Replace the main-content with the cloned completion-message
    mainContent.replaceWith(newCompletionMessage);

    // Adding an event listener to the "Learn More" button
    document.getElementById('learn-more-button').addEventListener('click', () => {
        gtag('event', 'click', {
            'event_category': 'Button',
            'event_label': 'Learn More',
            'value': 1
        });

        // Show the start modal
        const startModal = document.getElementById('start-modal');
        startModal.style.display = 'block';

        // window.open('https://forms.gle/Tm2jtogT1PWZE7BF7', '_blank'); // Replace with the actual URL
    });

    // Adding event listener for share button
    const newShareButton = document.getElementById('share-button');
    newShareButton.addEventListener('click', () => {

        shareModal.style.display = 'block';
        // const shareUrl = window.location.href;
        // const shareText = "I just completed the 'Test Your Prompting Skills' game! Play now: ";

        // // Check if Web Share API is supported
        // if (navigator.share) {
        //     navigator.share({
        //         title: 'Test Your Prompting Skills',
        //         text: shareText,
        //         url: shareUrl,
        //     })
        //         .then(() => console.log('Thanks for sharing!'))
        //         .catch((error) => console.error('Error sharing:', error));
        // } else {
        //     // Fallback for non-supporting browsers
        //     const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        //     window.open(twitterUrl, '_blank');
        // }
    });
}

// function replaceMainContent() {
//     // Get references to the elements
//     const mainContent = document.getElementById("main-content");
//     const completionMessage = document.getElementById("completion-message");

//     // Clone the completionMessage element to make it ready for replacement
//     const newCompletionMessage = completionMessage.cloneNode(true);
//     newCompletionMessage.style.display = "block"; // Make sure it is visible

//     // Replace the main-content with the cloned completion-message
//     mainContent.replaceWith(newCompletionMessage);
// }

// Implementing 50:50 Lifeline
fiftyFiftyButton.addEventListener('click', () => {
    if (fiftyFiftyButton.disabled) return;

    let incorrectOptions = Array.from(options).filter(option => option.dataset.answer === 'wrong');
    let optionsToRemove = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);

    optionsToRemove.forEach(option => {
        option.style.display = 'none';
    });

    fiftyFiftyButton.disabled = true; // Disable the button after use
    fiftyFiftyButton.classList.add('disabled');
});

// Implementing Call a Friend Lifeline
callFriendButton.addEventListener('click', () => {
    if (callFriendButton.disabled) return;

    let correctIndex = moneyLadder[currentQuestion].correct;
    let friendResponse = `I think the answer is ${String.fromCharCode(65 + correctIndex)}.`;

    alert(friendResponse);

    callFriendButton.disabled = true; // Disable the button after use
    callFriendButton.classList.add('disabled');
});

// Implementing Ask the Audience Lifeline
audiencePollButton.addEventListener('click', () => {
    if (audiencePollButton.disabled) return;

    let percentages = [0, 0, 0, 0];
    let correctIndex = moneyLadder[currentQuestion].correct;

    // Assign a higher percentage to the correct answer
    percentages[correctIndex] = Math.floor(Math.random() * 30) + 50;

    // Distribute remaining percentage to other options
    let remainingPercentage = 100 - percentages[correctIndex];
    let incorrectIndices = [0, 1, 2, 3].filter(index => index !== correctIndex);

    incorrectIndices.forEach((index, i) => {
        if (i === incorrectIndices.length - 1) {
            percentages[index] = remainingPercentage;
        } else {
            let value = Math.floor(Math.random() * remainingPercentage);
            percentages[index] = value;
            remainingPercentage -= value;
        }
    });

    // Display the audience poll as a bar chart
    audiencePollContainer.style.display = 'block';
    const pollBars = document.querySelectorAll('.poll-bar');
    pollBars.forEach((pollBar, index) => {
        let bar = pollBar.querySelector('.bar');
        let percentageLabel = pollBar.querySelector('.percentage');

        bar.style.height = `${percentages[index] * 2}px`; // Adjust height multiplier as needed
        percentageLabel.textContent = `${percentages[index]}%`;
    });

    audiencePollButton.disabled = true; // Disable the button after use
    audiencePollButton.classList.add('disabled');
});

startGameButton.addEventListener('click', () => {
    startGameButton.style.display = 'none'; // Hide the start game button

    const audio = document.getElementById('background-music');
    audio.play();

    // Enable lifeline buttons
    fiftyFiftyButton.disabled = false;
    callFriendButton.disabled = false;
    audiencePollButton.disabled = false;
    document.querySelectorAll('.lifeline').forEach(button => {
        button.classList.remove('disabled');
    });

    // Enable answer options
    document.querySelectorAll('.option').forEach(option => {
        option.disabled = false;
        option.classList.remove('disabled');
    });

    // Show the #question
    document.getElementById('question').style.display = 'block';

    // Show the .options
    document.querySelectorAll('.options').forEach(option => {
        option.style.display = 'grid';
    });
});

function resetGame() {
    currentQuestion = 0;
    loadQuestion();
    document.querySelectorAll('.money-ladder ul li').forEach((li, index) => {
        li.classList.remove('highlight');
    });
    document.querySelector('.money-ladder ul').children[4].classList.add('highlight');

    // Reset lifelines
    fiftyFiftyButton.disabled = false; // Enable 50:50 button
    callFriendButton.disabled = false; // Enable call a friend button
    audiencePollButton.disabled = false; // Enable audience poll button

    fiftyFiftyButton.classList.remove('disabled'); // Remove disabled class from 50:50 button
    audiencePollButton.classList.remove('disabled'); // Remove disabled class from audience poll button

    // Reset options display
    options.forEach(option => {
        option.style.display = 'inline-block';
        option.disabled = false;
    });
}

loadQuestion();
document.querySelector('.money-ladder ul').children[4].classList.add('highlight');