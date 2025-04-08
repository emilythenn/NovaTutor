# NovaTutor: AI-Powered Educational Chatbot for SDG 4

NovaTutor is an AI-driven educational chatbot designed to support **Sustainable Development Goal 4 (SDG 4)**: Quality Education. By leveraging Google technologies like Dialogflow and Firebase, NovaTutor provides an interactive platform to enhance learning experiences, answer educational queries, and make quality education more accessible to all.

## Features

- **Interactive Chatbot**: Engages users in real-time conversations to answer questions and provide educational resources.
- **Dialogflow Integration**: Uses Google Dialogflow for natural language understanding and intelligent responses.
- **Firebase Backend**: Stores and retrieves data securely for a seamless user experience.
- **Customizable Knowledge Base**: Easily extend the chatbot's knowledge to cover additional topics or subjects.
- **Scalable and Accessible**: Designed to be deployed on the web, making it accessible to users worldwide.

## Project Structure

```
educational-chatbot
├── public
│   ├── index.html          # Main HTML entry point
│   └── styles
│       └── main.css        # Global styles for the application
├── src
│   ├── components
│   │   ├── Chatbot.tsx     # Chatbot component
│   │   ├── Login.tsx       # Login component
│   │   ├── SignUp.tsx      # Sign-up component
│   │   └── History.tsx     # Chat history component
│   ├── firebase
│   │   └── firebaseConfig.ts # Firebase configuration
│   ├── services
│   │   └── dialogflowService.ts # Dialogflow service functions
│   ├── styles
│   │   └── main.css        # Component-specific styles
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point for the React application
├── proxyServer.js          # Proxy server for Dialogflow integration
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
├── vite.config.ts          # Vite configuration file
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd educational-chatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project and obtain your configuration details.
   - Update the `src/firebase/firebaseConfig.ts` file with your Firebase credentials.

4. **Configure Dialogflow:**
   - Create a Dialogflow agent and set up intents and responses.
   - Link the Dialogflow agent to your Firebase project if needed.

5. **Run the application:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Navigate to `http://localhost:3000` to interact with the chatbot.

## Usage

- **Ask Questions**: Type your educational queries into the chatbot interface.
- **Receive Answers**: Get intelligent responses powered by Dialogflow.
- **Expand Knowledge**: Add more intents and responses in Dialogflow to cover additional topics.

## Goals and Impact

NovaTutor aims to:
- **Enhance Learning**: Provide instant access to educational resources and answers.
- **Promote Accessibility**: Make quality education available to underserved communities.
- **Support Teachers**: Act as a supplementary tool for educators to assist students.

By addressing SDG 4, NovaTutor contributes to creating inclusive and equitable education opportunities for all.

## Contributing

Contributions are welcome! If you have ideas for improving NovaTutor or extending its functionality, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- **Google Dialogflow**: For enabling natural language understanding.
- **Firebase**: For providing a secure and scalable backend.
- **United Nations SDG 4**: For inspiring this project to promote quality education globally.