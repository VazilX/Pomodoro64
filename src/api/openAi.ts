import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '',
  baseURL: 'https://api.pawan.krd/cosmosrp/v1/chat/completions',
  dangerouslyAllowBrowser: true,
});

export const getQuotation = () => {
  return openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content:
          'Hi, could you help me? Could you create short motivation fraise (just 1 short sentons. Do not add smileys at the end)? Give me only 1 frays', // eslint-disable-line
      },
      {
        role: 'user',
        content: '',
      },
    ],
    model: 'gpt-3.5-turbo',
  });
};
