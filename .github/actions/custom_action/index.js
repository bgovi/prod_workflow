// .github/actions/custom-action/index.js
const core = require('@actions/core');

try {
  // Get input values from the action's inputs
  const message = core.getInput('message');
  
  // Log the message
  console.log(message);

  // Set output variable
  core.setOutput('result', message);
} catch (error) {
  core.setFailed(`Action failed with error: ${error.message}`);
}