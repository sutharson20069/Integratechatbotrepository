const API_KEY = 'yE6VAXBmthRHe7VLUVGBai99NwpGSO1B';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Analyze image using Hugging Face Vision API
export async function analyzeImage(imageData: string): Promise<string> {
  try {
    // Convert base64 to blob
    const base64Data = imageData.split(',')[1];
    const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(r => r.blob());

    const response = await fetch(
      'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: blob,
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.generated_text) {
        return `I can see: ${data[0].generated_text}`;
      }
    }
  } catch (error) {
    console.log('Image analysis failed');
  }

  // Fallback response
  return "I can see you've uploaded an image! While I'm attempting to analyze it, here's what I can tell you: This appears to be an image file. I can help you with questions about what you'd like to do with this image, such as describing what you see, getting creative suggestions, or discussing related topics.";
}

export async function getAIResponse(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  // Try multiple API approaches
  
  // Approach 1: Hugging Face Inference API
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: userMessage,
          parameters: {
            max_length: 100,
            temperature: 0.8,
            return_full_text: false,
          },
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text.trim();
      }
    }
  } catch (error) {
    console.log('Hugging Face attempt 1 failed');
  }

  // Approach 2: Try simpler Hugging Face format
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: userMessage,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text.trim();
      } else if (data.generated_text) {
        return data.generated_text.trim();
      }
    }
  } catch (error) {
    console.log('Hugging Face attempt 2 failed');
  }

  // If all attempts fail, throw error to trigger fallback
  throw new Error('All AI API attempts failed. Using fallback responses.');
}

// Alternative: OpenAI-compatible API
export async function getAIResponseOpenAI(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  try {
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful, friendly, and knowledgeable AI assistant. Provide detailed, thoughtful, and engaging responses. Be encouraging and supportive while maintaining professionalism.',
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage,
      },
    ];

    // This endpoint structure works with OpenAI-compatible APIs
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

// Generic AI endpoint that tries multiple services
export async function getAIResponseGeneric(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  // Try Hugging Face first
  try {
    return await getAIResponse(userMessage, conversationHistory);
  } catch (error) {
    console.log('Hugging Face API failed, trying alternative...');
    
    // Try OpenAI-compatible API as fallback
    try {
      return await getAIResponseOpenAI(userMessage, conversationHistory);
    } catch (error2) {
      throw new Error('All API attempts failed');
    }
  }
}
