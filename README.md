# MythicSelf

**Discover your personal mythology through dream archetypes powered by Gemini 3 Flash**

## 🌟 Overview

MythicSelf is an AI-powered dream analysis application that helps you uncover recurring archetypal patterns in your dreams. By leveraging Google's Gemini 3 Flash, it identifies five core Jungian archetypes in your dreams and builds a personal mythological profile over time.

## 🎭 The Five Archetypes

- **🌑 The Shadow**: Hidden fears, rejected parts, unconscious patterns
- **⚔️ The Hero**: Courage, challenges, growth, transformation
- **🧙 The Wise Guide**: Inner wisdom, guidance, insight, mentorship
- **💝 The Lover**: Connection, passion, intimacy, relationships
- **🌟 The Child**: Innocence, playfulness, wonder, new beginnings

## ✨ Key Features

### 🌟 Three Unique Gemini 3 Features

#### 1. **Personal Mythology Narrative** - Hero's Journey AI Storytelling
Gemini 3 analyzes multiple dreams chronologically and weaves them into a compelling mythological narrative using Joseph Campbell's Hero's Journey framework. It identifies which stage you're in (e.g., "The Ordeal", "Meeting the Mentor"), traces archetype evolution, and predicts what comes next in your psychological journey.

**Why this showcases Gemini 3**:
- Long context understanding across multiple dreams
- Enhanced reasoning to map psychological patterns to mythological stages
- Creative storytelling with psychological depth
- Predictive insights about future development

#### 2. **Archetype Evolution Timeline** - Visual Journey Tracking
An interactive timeline that displays how your dominant archetypes shift over time. See your psychological transformation visualized with color-coded transitions, frequency statistics, and AI-generated insights about your journey.

**Why this showcases Gemini 3**:
- Pattern recognition across dream sequences
- Temporal analysis of archetypal shifts
- Statistical reasoning about personality evolution
- Visual data synthesis

#### 3. **Interactive Archetype Dialogue** - Conversation with Your Psyche
Talk directly with your archetypes in a conversational AI experience. Each archetype speaks with its unique voice, personality, and wisdom. Ask your Shadow about hidden fears, consult your Wise Guide for insight, or play with your Child archetype.

**Why this showcases Gemini 3**:
- Advanced role-playing with psychological accuracy
- Conversational context awareness
- Nuanced personality simulation for each archetype
- Therapeutically insightful responses

### Core Functionality
- 📝 Record dreams with simple text input
- 🤖 AI-powered archetype extraction (0-100% scores with reasoning)
- 📊 Visual dashboard of your mythological profile
- 💾 Client-side storage (no login required)
- 📈 Track archetype patterns across multiple dreams

## 🚀 How It Works

1. **Record Your Dream**: Enter a dream description (minimum 10 characters)
2. **AI Analysis**: Gemini 3 Flash analyzes the dream and scores each archetype
3. **View Results**: See which archetypes are most present in your dream
4. **Track Patterns**: Build your personal mythology over time

## 🛠️ Technical Stack

- **Framework**: Next.js 16 (App Router)
- **AI Model**: Google Gemini 3 Flash
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

```bash
# Clone the repository
git clone https://github.com/Novah-code/mysthicself.git

# Install dependencies
cd mysthicself
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start recording dreams.

## 🔑 Environment Variables

Create a `.env.local` file with:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🎯 Gemini 3 Integration

MythicSelf leverages Gemini 3 Flash's capabilities:

- **Advanced Reasoning**: Understands nuanced psychological concepts
- **Pattern Recognition**: Identifies archetypal themes across dream narratives
- **Structured Output**: Generates consistent JSON responses for archetype scores
- **Natural Language Understanding**: Processes both detailed dreams and keyword-based input

### Example Prompt Structure

```typescript
const prompt = `Analyze this dream and score archetype presence (0-100):
Dream: "${dreamContent}"

Archetypes:
- Shadow: Hidden fears, rejected parts
- Hero: Courage, challenges, growth
- Wise Guide: Inner wisdom, guidance
- Lover: Connection, passion, intimacy
- Child: Innocence, playfulness, wonder

Return JSON with scores and reasoning.`;
```

## 🎨 Design Philosophy

- **No Login Required**: Start exploring immediately with localStorage
- **Privacy First**: All data stays in your browser
- **Beautiful UI**: Gradient-rich, modern design
- **Mobile Friendly**: Responsive across all devices

## 🧠 Inspired by Jungian Psychology

Based on Carl Jung's archetypal theory and depth psychology. The app translates complex psychological concepts into accessible language, helping users discover patterns in their unconscious mind.

**Disclaimer**: This app is for educational and reflective purposes. It is not a substitute for professional psychological counseling.

## 📝 License

MIT License - feel free to use and modify for your own projects.

## 🙏 Acknowledgments

- Built for the **Gemini 3 Global Hackathon**
- Powered by **Google Gemini 3 Flash**
- Inspired by **Carl Jung's archetypal psychology**

---

**Made with ❤️ for dreamers and seekers**
