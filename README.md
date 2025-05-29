# Text to UI - Table Generator

This is a POC for a text-to-UI tool. It generates tables from text prompts. You input a description, and it uses an LLM to create the corresponding table structure and content.

It uses Langchain for the LLM client, Elysia is the framework, Bun is the env. React with shadcn and tw on the frontend.

## How to run

1. `cp apps/schema-service/.env.example apps/schema-service/.env`
2. Add your `GEMINI_API_KEY` to the `apps/schema-service/.env` file
3. `cd infra/docker && docker-compose up`
4. `http://localhost:8080`
