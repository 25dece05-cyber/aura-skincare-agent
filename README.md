# Aura Skincare — AI Voice Support Agent

Aria is a browser-based AI voice support agent developed for Aura Skincare, a premium organic Indian skincare brand. It helps customers resolve common queries through natural voice conversations, retrieve mock order information, and understand the brand's customer support policies.

## Live Demo

* **Live Application:** https://auraskincare.netlify.app/
* **GitHub Repository:** https://github.com/25dece05-cyber/aura-skincare-agent

## Key Features

* **Voice-based conversations:** Interact with Aria using a browser microphone.
* **AI-powered responses:** Uses the Gemini Live API for real-time conversational interaction.
* **Order lookup:** Retrieves order details using supported mock order IDs.
* **Policy-aware assistance:** Answers questions about shipping, returns, damaged products, cancellations, and Cash on Delivery (COD).
* **Call transcript:** Displays the conversation transcript.
* **Call summary:** Produces a structured summary containing customer intent, order ID, resolution status, and call summary.
* **Graceful error handling:** Handles missing order IDs, unsupported requests, and service errors.

## Technology Stack

* **Frontend:** HTML, CSS, JavaScript
* **AI:** Google Gemini Live API
* **Backend:** Node.js, Express.js
* **Database:** SQLite using `better-sqlite3`
* **Deployment:** Netlify for the frontend and Render for the backend

## Architecture

```text
Customer
   |
   v
Browser UI (HTML, CSS, JavaScript)
   |
   +---- Microphone Audio
   |
   v
Gemini Live API
   |
   v
Aria Voice Responses
   |
   v
Customer Support Conversation

Order-related queries
   |
   v
Express Backend
   |
   v
SQLite Database
   |
   v
Order Details
```

The frontend handles the user interface and audio interaction. The backend provides order information and generates temporary credentials for connecting to the AI service. Order-related responses should rely on backend data rather than assumptions.

## Sample Orders

The application includes sample orders for testing:

| Order ID | Customer     | Product                     | Status           |
| -------- | ------------ | --------------------------- | ---------------- |
| ORD-101  | Priya Sharma | Vitamin C Serum 30ml        | Out for Delivery |
| ORD-102  | Rahul Verma  | Hydrating Sunscreen SPF 50  | Delivered        |
| ORD-103  | Ananya Patel | Green Tea Face Wash + Toner | Processing       |

These are demonstration records, not real customer orders.

## Brand Policies

| Policy            | Details                                                                       |
| ----------------- | ----------------------------------------------------------------------------- |
| Shipping          | Free above ₹499; ₹50 shipping below ₹499                                      |
| Standard delivery | 3–5 business days                                                             |
| Returns           | Within 7 days of delivery for unopened, unused products in original packaging |
| Damaged products  | Report within 48 hours with photos                                            |
| Cancellation      | Allowed while the order is Processing                                         |
| COD               | Available for orders up to ₹2,500                                             |

Aria should follow these rules when answering policy-related questions and avoid promising exceptions that are not supported by the brand policy.

## Local Setup

### Prerequisites

* Node.js and npm
* A Google Gemini API key
* Git

### 1. Clone the repository

```bash
git clone https://github.com/25dece05-cyber/aura-skincare-agent.git
cd aura-skincare-agent
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure the required environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

Use the exact environment variable names expected by `backend/server.js`. Never commit real API keys or secret credentials to GitHub.

### 4. Start the backend

From the `backend` directory, run:

```bash
node server.js
```

### 5. Open the frontend

Open `index.html` in a browser or use a local development server. Ensure the frontend's backend URL points to your local backend when testing locally.

## Environment Variables

| Variable         | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `GEMINI_API_KEY` | Authenticates requests to Google's Gemini API |
| `PORT`           | Configures the backend server port            |

Keep secrets in environment variables. For production, configure them in the backend hosting provider's environment settings.

## Testing

Test the following scenarios:

1. Start a voice conversation and verify that microphone permissions work.
2. Ask a general question, such as "What is your return policy?"
3. Look up `ORD-101`, `ORD-102`, and `ORD-103`.
4. Test a missing or invalid order ID.
5. Verify that cancellation eligibility follows the order status.
6. End the conversation and check the transcript and structured summary.
7. Test behavior when the backend or AI service is unavailable.

## Design Decisions

The project separates the browser interface from backend order services. This keeps the UI lightweight while allowing order information to be retrieved from a centralized data source.

The Gemini Live API supports conversational voice interaction, while Express provides a dedicated backend for order lookups and temporary AI credentials. SQLite keeps the mock order data simple and suitable for an assignment prototype.

## Challenges

One of the main engineering challenges is coordinating browser microphone input, real-time AI audio responses, and backend requests while keeping the interaction responsive. Handling asynchronous audio streams, service errors, and accurate policy-based responses requires careful state management.

## Future Improvements

* Replace the mock order database with a production order management system.
* Add automated tests for order eligibility and policy rules.
* Improve audio interruption handling and reconnect behavior.
* Add authentication, monitoring, and structured application logs.
* Introduce scalable infrastructure for concurrent customer calls.
* Add stronger privacy controls and configurable data-retention policies.

## Scalability: 1,000 Calls per Day

To support approximately 1,000 calls per day, I would use a scalable backend deployment, rate limiting, request timeouts, monitoring, and a managed database where appropriate. I would also evaluate Gemini API quotas, concurrent session limits, audio-processing costs, and average call duration before selecting the final infrastructure.

A queue can handle asynchronous follow-up tasks, while live conversations require responsive session handling. Load testing and monitoring would help identify bottlenecks before increasing traffic.

## Security and Privacy

* API keys must remain on the backend.
* Temporary credentials should have appropriate restrictions and short lifetimes.
* Order endpoints should validate user input.
* Production order access should include proper customer authentication and authorization.
* Logs and transcripts should avoid unnecessary sensitive information.

## Author

**Ayaan Khan**

AI automation, Python, and generative AI project development.

---

*This project was developed as part of the DataStraw AI Voice Agent assignment.*
