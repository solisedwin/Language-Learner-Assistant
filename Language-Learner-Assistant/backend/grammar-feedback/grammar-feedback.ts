const GRAMMAR_FEEDBACK__PROMPT: string = `

Give grammar feedback to the user response as if you were a helpful language tutor assistant
Based on the context of the roleplay scenario, language being spoken, and user response 

Use the following guidelines below to help give feedback. You are not limited to the guidelines below as it serves a foundation 

- Grammar accuracy and sentence structure 
- Clarity and comprehensibility
- Complexity and range 

Always give feedback in a friendly helpful tone while also being detailed. 
Keep the response to less than 55 characters.
`;
export default class GrammarFeedback {
  GRAMMAR_FEEDBACK__PROMPT: string = GRAMMAR_FEEDBACK__PROMPT;
  constructor() {}
}
