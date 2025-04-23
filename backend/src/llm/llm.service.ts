import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);

  async summarizeText(text: string): Promise<string> {
    try {
      await new Promise((res) => setTimeout(res, 1500));

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Você é um assistente que resume e explica documentos OCR.',
            },
            {
              role: 'user',
              content: `Texto extraído do documento:\n${text}\n\nGere um resumo explicativo.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        this.logger.warn('❗ Limite da OpenAI atingido (429).');
        return '⚠️ Você atingiu o limite de uso gratuito da OpenAI. Tente novamente mais tarde.';
      }

      this.logger.error('Erro ao chamar o GPT:', error.message);
      return '❌ Erro ao gerar explicação com a LLM.';
    }
  }
}
