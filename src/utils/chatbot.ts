// Simple pattern-based chatbot responses
export interface BotResponse {
  message: string;
  suggestions?: string[];
}

export function generateBotResponse(userMessage: string): BotResponse {
  const message = userMessage.toLowerCase();

  // Greetings
  if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return {
      message: "Hello! 👋 I'm delighted to connect with you today. I'm an AI assistant designed to provide helpful, informative, and engaging conversations on a wide variety of topics.\n\nWhether you're looking for advice, information, entertainment, or just someone to chat with, I'm here to assist you. I can help with career guidance, study tips, motivation, answer general questions, share interesting facts, or even lighten the mood with some humor.\n\nHow can I make your day better? What would you like to talk about?",
      suggestions: ["What can you do?", "Tell me about yourself", "Give me advice"],
    };
  }

  // Asking about capabilities
  if (message.includes('what can you') || message.includes('capabilities') || message.includes('what do you do')) {
    return {
      message: "I'm glad you asked! I have a diverse range of capabilities to assist you:\n\n🎯 **Information & Knowledge**\n• Answer questions on various topics\n• Explain complex concepts in simple terms\n• Provide detailed explanations and context\n\n💼 **Professional Support**\n• Career guidance and development advice\n• Interview preparation tips\n• Professional communication strategies\n\n📚 **Learning & Education**\n• Study techniques and learning strategies\n• Time management advice\n• Academic guidance\n\n💡 **Personal Development**\n• Motivation and encouragement\n• Goal-setting frameworks\n• Productivity tips\n\n😊 **Entertainment**\n• Tell jokes and amusing stories\n• Engage in interesting conversations\n• Share fascinating facts\n\nI'm here to have meaningful conversations and provide value in whatever way you need. What interests you most?",
      suggestions: ["Career advice", "Study tips", "Tell me something interesting"],
    };
  }

  // Asking about the bot
  if (message.includes('who are you') || message.includes('about yourself') || message.includes('introduce yourself')) {
    return {
      message: "Great question! Let me introduce myself properly.\n\nI'm an AI chatbot built to be your helpful digital companion. Think of me as a friendly assistant who's available 24/7 to chat, help, and support you.\n\n**What makes me unique:**\n• I'm patient and never judge\n• I can discuss a wide range of topics\n• I provide thoughtful, detailed responses\n• I'm always learning from our conversations\n• I aim to be helpful, informative, and engaging\n\n**My purpose:**\nI exist to make your life a little easier and more enjoyable. Whether you need practical advice, want to learn something new, need motivation, or just want someone to talk to, I'm here for you.\n\n**My limitations:**\nI don't have access to real-time data, personal information about you, or the ability to perform actions outside our conversation. But within our chat, I'll do my best to be as helpful as possible!\n\nWhat would you like to explore together?",
      suggestions: ["What can you do?", "Tell me a joke", "Give me advice"],
    };
  }

  // Jokes
  if (message.includes('joke') || message.includes('funny') || message.includes('laugh')) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything! 😄\n\nThis joke plays on the double meaning of 'make up' - atoms literally make up all matter in the universe, but 'make up' can also mean to fabricate or lie. It's a classic science pun!",
      "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾\n\nThis one's a play on words too - scarecrows literally stand out in fields, but 'outstanding in your field' is also an expression meaning to be excellent at what you do. The scarecrow really earned that award!",
      "What do you call a bear with no teeth? A gummy bear! 🐻\n\nA sweet play on words! Without teeth, a bear would have gums, making it a 'gummy' bear - just like the popular candy. Though I'm not sure the bear would find it as amusing!",
      "Why don't eggs tell jokes? They'd crack each other up! 🥚\n\nEggs are fragile and crack easily, but to 'crack up' also means to laugh hard. So eggs telling jokes would literally crack each other - a dangerous business for an egg!",
      "What do you call a fish wearing a bowtie? So-fish-ticated! 🐟\n\nA fish dressed formally would be sophisticated - or should I say 'so-fish-ticated'? It's a fin-tastic pun that really hooks you in!",
    ];
    return {
      message: jokes[Math.floor(Math.random() * jokes.length)],
      suggestions: ["Tell another joke", "That's hilarious!", "Tell me something interesting"],
    };
  }

  // Weather
  if (message.includes('weather') || message.includes('temperature') || message.includes('forecast')) {
    return {
      message: "I appreciate you asking, but I don't have access to real-time weather data or current conditions. ☀️🌧️\n\n**For accurate weather information, I recommend:**\n\n🌐 **Websites:**\n• Weather.com\n• AccuWeather\n• Weather Underground\n• Your local meteorological service\n\n📱 **Mobile Apps:**\n• Your phone's built-in weather app\n• Weather Channel app\n• Dark Sky (iOS)\n• Weather & Radar\n\n💡 **Pro Tips:**\n• Check multiple sources for important events\n• Look at hourly forecasts for detailed planning\n• Set up weather alerts for severe conditions\n• Check the radar map for real-time precipitation\n\nIs there anything else I can help you with today?",
      suggestions: ["Tell me a joke", "Give me advice", "What can you do?"],
    };
  }

  // Help/Advice
  if (message.includes('help') || (message.includes('advice') && !message.includes('career') && !message.includes('study'))) {
    return {
      message: "I'm absolutely here to help you! I believe that the right guidance can make all the difference.\n\n**I can provide assistance with:**\n\n💼 **Career & Professional Life**\n• Career planning and transitions\n• Job search strategies\n• Interview preparation\n• Workplace challenges\n• Professional development\n\n📚 **Education & Learning**\n• Study techniques and methods\n• Time management for students\n• Exam preparation strategies\n• Learning new skills effectively\n\n🎯 **Personal Development**\n• Goal setting and achievement\n• Building good habits\n• Overcoming procrastination\n• Staying motivated\n• Work-life balance\n\n🤝 **General Life Advice**\n• Decision-making strategies\n• Problem-solving approaches\n• Communication skills\n• Stress management\n\nTo give you the most helpful advice, could you tell me a bit more about what specific area you'd like guidance on? The more details you share, the better I can tailor my response to your situation.",
      suggestions: ["Career advice", "Study tips", "Motivation please"],
    };
  }

  // Career advice
  if (message.includes('career') || message.includes('job') || message.includes('work') || message.includes('professional')) {
    return {
      message: "Career development is one of the most important investments you can make in yourself. Let me share comprehensive guidance to help you succeed:\n\n🎯 **Goal Setting & Planning**\n• Define clear short-term (1 year) and long-term (5+ years) career goals\n• Create a roadmap with specific milestones\n• Regularly review and adjust your goals as you grow\n• Write down your goals and track your progress\n\n📈 **Continuous Learning**\n• Stay current with industry trends and developments\n• Invest in skills that complement your expertise\n• Take online courses, attend workshops, and earn certifications\n• Read industry publications and follow thought leaders\n• Learn both technical (hard) skills and interpersonal (soft) skills\n\n🤝 **Networking & Relationships**\n• Build genuine relationships, not just contacts\n• Attend industry events and conferences\n• Engage on professional platforms like LinkedIn\n• Find mentors who've achieved what you aspire to\n• Be generous with your own knowledge and help others\n\n💪 **Professional Brand**\n• Develop a unique value proposition\n• Maintain a strong online presence\n• Be known for specific expertise or qualities\n• Deliver consistently excellent work\n• Build a portfolio showcasing your achievements\n\n🔄 **Adaptability & Growth**\n• Embrace change and new opportunities\n• Be open to roles that stretch your abilities\n• Learn from failures and setbacks\n• Seek feedback and act on it\n• Stay curious and maintain a growth mindset\n\n⚖️ **Work-Life Integration**\n• Choose roles that align with your values\n• Set boundaries to prevent burnout\n• Find meaning and purpose in your work\n• Maintain relationships outside work\n• Take care of your physical and mental health\n\nRemember: A successful career is not just about climbing the ladder - it's about finding fulfillment, making an impact, and continuously growing. What specific aspect of your career would you like to explore further?",
      suggestions: ["Interview tips", "Study tips", "Motivation please"],
    };
  }

  // Study tips
  if (message.includes('study') || message.includes('learning') || message.includes('exam') || message.includes('education')) {
    return {
      message: "Effective learning is a skill that can be developed! Let me share evidence-based strategies that will transform how you study:\n\n📅 **Planning & Organization**\n• Create a realistic study schedule and stick to it\n• Break large subjects into manageable chunks\n• Use a planner or digital tool to track assignments and deadlines\n• Prioritize topics based on difficulty and importance\n• Plan study sessions when your energy is highest\n\n🧠 **Active Learning Techniques**\n• **Active Recall**: Test yourself instead of just re-reading\n• **Spaced Repetition**: Review material at increasing intervals\n• **Feynman Technique**: Explain concepts in simple terms as if teaching someone\n• **Mind Mapping**: Create visual connections between ideas\n• **Practice Problems**: Apply knowledge through exercises and questions\n\n⏰ **Time Management**\n• Use the Pomodoro Technique (25 min focus, 5 min break)\n• Take longer breaks (15-30 min) after 4 Pomodoros\n• Avoid multitasking - focus on one subject at a time\n• Start with the most challenging material when fresh\n• Set specific goals for each study session\n\n📝 **Note-Taking Strategies**\n• Use the Cornell Method for organized notes\n• Write in your own words to ensure understanding\n• Include examples and applications\n• Review and refine notes within 24 hours\n• Use colors and highlighting strategically\n\n🎯 **Memory Enhancement**\n• Create mnemonics and acronyms for complex information\n• Use visualization and mental imagery\n• Connect new information to what you already know\n• Study in varied locations (changes in context aid memory)\n• Get enough sleep - it's crucial for memory consolidation\n\n👥 **Collaborative Learning**\n• Form study groups with motivated peers\n• Teach others what you've learned\n• Discuss difficult concepts together\n• Quiz each other\n• Share resources and strategies\n\n🚫 **Avoiding Common Pitfalls**\n• Minimize distractions (phone, social media, TV)\n• Don't cram - consistent studying beats last-minute marathons\n• Take care of your physical health (exercise, nutrition, sleep)\n• Manage stress through relaxation techniques\n• Ask for help when you're stuck\n\n✅ **Exam Preparation**\n• Start reviewing well in advance\n• Practice with past papers and sample questions\n• Understand the exam format and requirements\n• Focus on understanding, not just memorization\n• Get adequate rest before the exam\n\nRemember: Effective studying is about quality, not just quantity. Working smarter beats working harder. What subject or topic are you currently working on?",
      suggestions: ["Career advice", "Time management tips", "Motivation please"],
    };
  }

  // Motivation
  if (message.includes('motivat') || message.includes('inspire') || message.includes('encourage')) {
    return {
      message: "I'm so glad you reached out! Everyone needs a boost of motivation sometimes, and I'm here to provide it. 💪✨\n\n**Remember These Truths:**\n\n🌱 **Growth Takes Time**\nEvery expert was once a beginner. Every master was once a student. The person you admire most struggled just like you're struggling now. Progress isn't always visible day-to-day, but if you compare where you are now to where you were months or years ago, you'll see how far you've come.\n\n🎯 **Progress Over Perfection**\nDon't wait for the perfect moment - it doesn't exist. Don't aim for perfect execution - it's unattainable. Instead, focus on consistent progress. Small steps every day compound into remarkable achievements. 1% better each day means you're 37 times better in a year!\n\n💎 **Your Unique Journey**\nStop comparing your chapter 1 to someone else's chapter 20. Your path is unique, and that's your strength. What matters isn't how fast others are moving, but that you're moving forward at your own pace.\n\n🔥 **Embrace the Challenge**\nThe difficulty you're facing isn't a sign you should quit - it's a sign you're growing. Muscles grow under resistance. Skills develop through practice. Character forms through adversity. You're not stuck; you're evolving.\n\n⭐ **Celebrate Small Wins**\nDid you start today when you didn't feel like it? That's a win.\nDid you try despite fear of failure? That's courage.\nDid you keep going when it got hard? That's resilience.\nAcknowledge these victories - they matter.\n\n🌟 **You're Capable of More Than You Think**\nYour current limitations are often self-imposed. When you push through discomfort, you discover reserves of strength you didn't know existed. Trust in your ability to figure things out. You've overcome every challenge you've faced so far - you have a 100% success rate at getting through tough times.\n\n💫 **Take Action Today**\nMotivation follows action, not the other way around. Don't wait to feel motivated - start, and motivation will come. Do just five minutes. Often, starting is the hardest part, and you'll find yourself continuing once you begin.\n\n**Your next step:** Identify one small action you can take right now toward your goal. Just one. Then do it. Build momentum.\n\nYou've got this! I believe in you. What goal are you working toward right now?",
      suggestions: ["Thanks!", "Career advice", "Study tips"],
    };
  }

  // Time management
  if (message.includes('time management') || message.includes('productivity') || message.includes('procrastination')) {
    return {
      message: "Time management is one of the most valuable skills you can develop! Let me share comprehensive strategies to help you master your time:\n\n⏰ **Time Management Frameworks**\n\n**The Eisenhower Matrix:**\nCategorize tasks into four quadrants:\n• Urgent & Important: Do immediately\n• Important but Not Urgent: Schedule time for these\n• Urgent but Not Important: Delegate if possible\n• Neither: Eliminate or minimize\n\n**Time Blocking:**\n• Assign specific time blocks to specific tasks\n• Treat these blocks as unmovable appointments\n• Include blocks for deep work, admin tasks, breaks, and personal time\n• Protect your most productive hours for your most important work\n\n📋 **Practical Strategies**\n\n**Daily Planning:**\n• Plan tomorrow before today ends\n• Identify your top 3 priorities (MIT - Most Important Tasks)\n• Schedule difficult tasks for your peak energy times\n• Be realistic about how long tasks take\n\n**Overcoming Procrastination:**\n• Use the 2-minute rule: If it takes less than 2 minutes, do it now\n• Break overwhelming tasks into tiny first steps\n• Set a timer for just 5 minutes to get started\n• Remove distractions before beginning\n• Understand your procrastination triggers\n\n**Maintaining Focus:**\n• Single-task instead of multitasking\n• Use website blockers during focus time\n• Put phone in another room or use app limits\n• Work in 25-50 minute focused sprints\n• Take regular breaks to maintain energy\n\n**Energy Management:**\n• Track when you have most energy and schedule accordingly\n• Take breaks before you feel exhausted\n• Exercise regularly to boost overall energy\n• Eat well and stay hydrated\n• Get 7-9 hours of quality sleep\n\n🎯 **Advanced Tips**\n\n• Learn to say no to commitments that don't align with your goals\n• Batch similar tasks together (emails, calls, errands)\n• Set artificial deadlines earlier than actual ones\n• Review your week every Sunday to plan ahead\n• Track your time for a week to identify time wasters\n• Create routines to reduce decision fatigue\n• Use the \"touch it once\" rule for small decisions\n\nRemember: Time management isn't about filling every minute with work. It's about making time for what matters most - including rest, relationships, and joy!\n\nWhat specific time management challenge are you facing?",
      suggestions: ["Study tips", "Career advice", "Motivation please"],
    };
  }

  // Thanks
  if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
    return {
      message: "You're very welcome! 😊 It's genuinely my pleasure to help you.\n\nI'm always here whenever you need assistance, advice, information, or just someone to chat with. Every conversation is an opportunity to provide value, and I'm glad I could be helpful to you today.\n\nDon't hesitate to come back anytime - whether it's five minutes from now or five days from now. I'll be here, ready to assist with whatever you need.\n\nIs there anything else on your mind that I can help you with? I'm here for you!",
      suggestions: ["Tell me a joke", "Give me more advice", "Goodbye"],
    };
  }

  // Goodbye
  if (message.match(/^(bye|goodbye|see you|exit|quit|take care|later)/)) {
    return {
      message: "Goodbye! 👋 It's been wonderful chatting with you today. I hope our conversation was helpful and valuable.\n\nRemember, I'm always here whenever you need me - 24/7, no appointment necessary! Whether you want to learn something new, need advice, or just want to chat, I'll be right here waiting.\n\nTake care of yourself, and I look forward to our next conversation. Until then, wishing you all the best! ✨",
      suggestions: [],
    };
  }

  // Interesting facts
  if (message.includes('interesting') || message.includes('fact') || message.includes('tell me something')) {
    const facts = [
      "Here's a fascinating fact about space! 🌌\n\nIf you could drive a car straight up at highway speed (65 mph), you'd reach outer space in just about an hour. The official boundary of space (the Kármán line) is only 62 miles (100 km) above Earth's surface. However, it would take you much longer to reach the Moon - about 6 months of continuous driving!\n\nSpace is actually much closer than we think, but the challenge isn't the distance - it's fighting gravity and achieving the necessary speed (about 17,500 mph) to stay in orbit.",
      "Here's something mind-blowing about your brain! 🧠\n\nYour brain uses about 20% of your body's total energy despite being only 2% of your body weight. Even more amazing: the human brain can process images in as little as 13 milliseconds - faster than the blink of an eye!\n\nEvery time you learn something new, your brain forms new neural connections. This means you're literally changing the physical structure of your brain right now as you read this. Neuroplasticity continues throughout your entire life, so it's never too late to learn!",
      "Here's an incredible fact about honey! 🍯\n\nHoney is the only food that never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible! This is because honey has several unique properties: it's extremely low in moisture, highly acidic, and contains hydrogen peroxide (produced by bees), all of which prevent bacterial growth.\n\nBees are truly remarkable creatures - a single bee produces only about 1/12 of a teaspoon of honey in its entire lifetime, yet a colony can produce 60-100 pounds of honey per year!",
      "Here's a fascinating fact about time! ⏰\n\nTime moves slower for you than for astronauts in space! This is due to Einstein's theory of relativity. Astronauts on the International Space Station age slightly slower than people on Earth - about 0.007 seconds less per 6 months in space.\n\nSimilarly, GPS satellites have to account for relativity because time moves differently at their altitude and speed. Without these adjustments, GPS would be off by miles within just a day!",
    ];
    return {
      message: facts[Math.floor(Math.random() * facts.length)],
      suggestions: ["Tell me more", "That's amazing!", "Help me with something"],
    };
  }

  // Coding related queries
  if (message.includes('code') || message.includes('programming') || message.includes('debug') || 
      message.includes('javascript') || message.includes('python') || message.includes('html') || 
      message.includes('css') || message.includes('react') || message.includes('function') ||
      message.includes('algorithm') || message.includes('bug')) {
    return {
      message: "I'd be happy to help with coding! 💻\n\n**I can assist you with:**\n\n🔧 **Code Help**\n• Debug errors and fix issues\n• Explain code concepts\n• Write code examples\n• Review and optimize code\n\n💡 **Programming Languages**\n• JavaScript/TypeScript\n• Python\n• HTML/CSS\n• React and other frameworks\n• And many more!\n\n📚 **Learning Support**\n• Explain programming concepts\n• Best practices and patterns\n• Algorithm explanations\n• Code structure advice\n\n**How to get help:**\nShare your code using triple backticks:\n```javascript\n// Your code here\n```\n\nOr describe your problem, and I'll provide code examples and solutions!\n\nWhat coding challenge can I help you with?",
      suggestions: ["Show me a React example", "Explain async/await", "Debug my code"],
    };
  }

  // Default response - encourage more details
  const defaultResponses = [
    "That's an interesting topic! I'd love to discuss this with you in more depth.\n\nCould you tell me a bit more about what specifically interests you or what you'd like to know? The more details you share, the better I can tailor my response to give you the most helpful and relevant information.\n\nI'm here to provide thorough, thoughtful answers to whatever you're curious about!",
    "I appreciate you sharing that with me! To give you the most helpful and detailed response possible, could you elaborate a bit more on what you're thinking?\n\nHere are some questions that might help:\n• What aspect of this topic interests you most?\n• Are you looking for practical advice or general information?\n• Is there a specific situation or question you have in mind?\n\nI'm ready to dive deep into this conversation with you!",
    "Interesting perspective! I'd like to give you a comprehensive and thoughtful response.\n\nTo ensure I address exactly what you're looking for, could you provide a bit more context or detail about your question or thought?\n\nI'm here to provide detailed, helpful information on virtually any topic you're curious about. What would you like to explore?",
    "Thank you for bringing this up! I'm ready to provide you with detailed information and insights.\n\nTo give you the most valuable response, it would help if you could share:\n• What prompted this question or thought?\n• What would be most helpful for you to know?\n• Are you looking for advice, information, or just a discussion?\n\nI'm all ears and ready to help in whatever way serves you best!",
  ];

  return {
    message: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
    suggestions: ["Tell me a joke", "Give me advice", "Tell me something interesting"],
  };
}

// Enhanced coding response with code examples
export function generateCodingResponse(query: string): BotResponse {
  const lowerQuery = query.toLowerCase();
  
  // React examples
  if (lowerQuery.includes('react')) {
    return {
      message: "Here's a practical React example:\n\n```javascript\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <h1>Count: {count}</h1>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n      <button onClick={() => setCount(count - 1)}>\n        Decrement\n      </button>\n    </div>\n  );\n}\n\nexport default Counter;\n```\n\n**Key concepts:**\n• `useState` manages component state\n• State updates trigger re-renders\n• Event handlers update state\n\nWhat would you like to know more about?",
      suggestions: ["Explain useEffect", "Show async example", "More React tips"],
    };
  }

  // Async/await example
  if (lowerQuery.includes('async') || lowerQuery.includes('await')) {
    return {
      message: "Here's how async/await works:\n\n```javascript\n// Async function example\nasync function fetchUserData(userId) {\n  try {\n    // Wait for the API call to complete\n    const response = await fetch(`/api/users/${userId}`);\n    \n    // Wait for JSON parsing\n    const data = await response.json();\n    \n    return data;\n  } catch (error) {\n    console.error('Error fetching user:', error);\n    throw error;\n  }\n}\n\n// Using the function\nfetchUserData(123)\n  .then(user => console.log(user))\n  .catch(err => console.error(err));\n```\n\n**Key points:**\n• `async` declares an asynchronous function\n• `await` pauses execution until promise resolves\n• Always use try/catch for error handling\n• Cleaner than promise chains\n\nNeed more examples?",
      suggestions: ["Show Promise example", "Error handling tips", "More coding help"],
    };
  }

  return {
    message: "I'm ready to help with your coding question! Could you provide:\n\n• The programming language you're using\n• Your specific question or problem\n• Any code you'd like me to review (use ```language syntax)\n• What you're trying to achieve\n\nI'll provide detailed explanations and working code examples!",
    suggestions: ["React example", "JavaScript help", "Python code"],
  };
}
