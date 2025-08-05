# ADmyBRAND Insights: AI-Powered Analytics Dashboard

This is an advanced, AI-powered analytics dashboard for a fictional digital marketing agency, "ADmyBRAND". The application provides a comprehensive suite of tools for visualizing, analyzing, and interpreting marketing data, with a strong emphasis on a clean user interface and intelligent, AI-driven features.

## Core Features

The application is structured into several key sections:

1.  **Dashboard (Home):**
    *   Provides an at-a-glance overview of the most critical Key Performance Indicators (KPIs) such as Total Revenue, Active Users, Conversions, and Growth Rate.
    *   Features a "Revenue Over Time" chart to visualize trends.
    *   Includes a "Sales by Category" chart to break down revenue streams.
    *   Displays a paginated and sortable table of "Recent Transactions".

2.  **AI Insights:**
    *   A powerful feature that leverages a Generative AI model (Google's Gemini) to analyze the current marketing metrics.
    *   With a single click, it generates a high-level summary and a list of actionable recommendations to help improve performance.

3.  **AI Chat:**
    *   A conversational AI interface, also powered by Gemini.
    *   Users can ask natural language questions about their marketing data, and the AI assistant provides context-aware answers based on the latest metrics.
    *   The chat interface supports streaming for real-time responses.

4.  **Data Input:**
    *   An intuitive form that allows users to manually input their latest marketing statistics.
    *   The form is organized into collapsible accordion sections for Revenue, User Engagement, and Conversions, ensuring a clean and user-friendly experience.

5.  **Analytics:**
    *   A dedicated page for a deeper dive into performance metrics.
    *   Features KPI cards for Click-Through Rate (CTR), Cost Per Click (CPC), and Return on Ad Spend (ROAS).
    *   Includes detailed charts for "User Growth Over Time" and "Conversion Rate Trend".

6.  **Settings:**
    *   A page allowing users to manage their account.
    *   Includes forms to update profile information and configure notification preferences for weekly/monthly reports and KPI alerts.

## Technology Stack

This project is built with a modern, production-ready technology stack:

*   **Framework:** **Next.js 15** (using the App Router paradigm).
*   **Language:** **TypeScript** for type safety and improved developer experience.
*   **Styling:** **Tailwind CSS** for a utility-first styling approach.
*   **UI Components:** **ShadCN UI**, a collection of beautifully designed and accessible components built on Radix UI and Tailwind CSS. This is used for all UI elements, including the collapsible sidebar, cards, forms, charts, and dialogs.
*   **Generative AI:** **Genkit (with Google's Gemini Models)** is used to power the AI features.
    *   `ai.defineFlow` is used to create robust AI-driven workflows.
    *   The "Insights" and "Chat" features are implemented as Genkit flows, demonstrating how to integrate sophisticated AI logic into a Next.js application.
*   **Charting:** **Recharts** is used for creating the interactive and responsive charts on the Dashboard and Analytics pages.
*   **Forms:** **React Hook Form** for managing form state and **Zod** for schema validation.
*   **Icons:** **Lucide React** for a clean and consistent icon set.

## Project Structure

The codebase is organized following Next.js best practices:

*   `src/app/`: Contains all the application's pages and routes. Each folder represents a URL segment.
*   `src/components/`: Houses all reusable React components, categorized by feature (e.g., `dashboard`, `analytics`) and UI elements (`ui`). The `ui` directory contains the ShadCN components.
*   `src/ai/`: This directory contains all the Genkit-related code.
    *   `flows/`: Each file defines a specific AI workflow (e.g., `generate-insights-flow.ts`, `chat-flow.ts`).
    *   `genkit.ts`: Configures and initializes the Genkit AI instance.
*   `src/lib/`: Includes utility functions (`utils.ts`) and mock data simulation (`data.ts`).
*   `src/hooks/`: Contains custom React hooks, such as `use-toast.ts`.
*   `public/`: For static assets.
*   `globals.css`: Defines the global styles and Tailwind CSS theme, including the application's color palette using CSS variables.
