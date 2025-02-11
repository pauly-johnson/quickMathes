const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body);
    const filePath = path.join(__dirname, 'scores.json');

    let scores = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      scores = JSON.parse(fileData);
    }

    scores.push(data);

    fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Score saved successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};