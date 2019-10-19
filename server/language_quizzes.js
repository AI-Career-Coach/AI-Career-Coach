function offerQuiz(language = 'JavaScript', percent = 100) {
  const offer = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: `Top language: ${language}`,
            subtitle: `About ${percent}% of your code is in ${language}. Review top ${language} questions to test your knowledge!`,
            buttons: [
              {
                type: 'postback',
                title: 'Sure!',
                payload: 'yes'
              },
              {
                type: 'postback',
                title: 'Not now.',
                payload: 'no'
              }
            ]
          }
        ]
      }
    }
  };
  return offer;
}

function sendQuiz(payload, language = 'JavaScript') {
  if (payload === 'no') {
    return 'No problem. You can take it later.';
  } else if (payload === 'yes') {
    const offer = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: "Here's the quiz:",
          buttons: [
            {
              type: 'web_url',
              title: `See questions`,
              url: quizzes[language]
            },
            {
              type: 'postback',
              title: 'Nevermind.',
              payload: 'no'
            }
          ]
        }
      }
    };
    return offer;
  }
}

const quizzes = {
  JavaScript:
    'https://coderbyte.com/algorithm/10-common-javascript-interview-questions',
  Ruby: 'https://www.upwork.com/i/interview-questions/ruby/',
  Python: 'https://www.techbeamers.com/10-python-interview-questions/'
};

module.exports = { offerQuiz, sendQuiz };
