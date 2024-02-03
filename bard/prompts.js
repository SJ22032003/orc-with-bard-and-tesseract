const inputPrompt = `input: Given an input image of a form, please extract information accurately. The form includes checkboxes. Some questions may have sub-questions denoted with bullet points, be extremely sure to check for sub-questions in that will be shown as bullet points, always. 
There can be fill in the blanks with handwritten text, make sure to extract that also. The checkboxes are marked with a pen, and certain fields are filled manually with handwriting. Note that the form contains a mix of handwritten and printed text.
Ensure precision in reading both handwritten text and checkboxes. Carefully identify the marked checkboxes and record the answers accordingly. Additionally, some checkboxes may have different options; make sure to capture the answers from those options accurately.
The goal is to achieve the highest level of accuracy without errors in the results. Provide detailed information on the content of the checkboxes and any handwritten text. If a question has sub-questions, include responses for each sub-question.
Attention to detail is crucial, and extra caution is needed when dealing with handwritten text. The final output should accurately reflect the information present on the form.
`;

const outputPrompt = `output:
Extract questions, sub-questions, and answers from checkboxes and handwritten text in the input image. Convert the information into a well-structured JSON format. The JSON object should include the following fields: 'question_no', 'question', 'answer'. If there are sub-questions, which will be in bullet points, include a field 'sub_questions' following the same format. If a question is unanswered, set the 'answer' field to null.
Ensure the accuracy of checkbox selections and save the chosen option in the "answer" key. Given that most checkboxes are handwritten, exercise extra caution when interpreting them. Be careful to not confuse the checkboxes with the bullet points for sub-questions. check for sub-questions in that will be shown as bullet points, always.
output should be an array of objects. 
Each object should contain the following fields:
The output should be in the following format:
{
  "question_no": 1,
  "question": "Main question here",
  "answer": "Selected option",
  "sub_questions": [
    {
      "question": "Sub-question 1",
      "answer": "Answer for sub-question 1"
    },
    {
      "question": "Sub-question 2",
      "answer": null
    }
  ]
}
`;
module.exports = { inputPrompt, outputPrompt };