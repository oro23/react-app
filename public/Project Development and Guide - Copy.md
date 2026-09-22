Yes. For an **ASP.NET Core + LLM project**, you can use Claude Code/Cowork as a kind of **AI QA engineer + technical writer + documentation photographer**.

The workflow I recommend is:

**Build → Run → Test → Capture screenshots → Organize screenshots → Write guide/article → Review**

Claude can now use your local files, browser, and computer, and Claude Code + Claude in Chrome can support a build/test/verify workflow.  Claude Help Center+1 

## 1. What you want Claude to do

Imagine your finished project looks like this:

```
MyLlmApp/
├── MyLlmApp.sln
├── src/
│   ├── MyLlmApp.Api/
│   ├── MyLlmApp.Web/
│   └── MyLlmApp.Core/
├── README.md
└── ...
```

You can give Claude a task like:

> Take my completed ASP.NET Core + LLM project, run it locally, verify the major user workflows in the browser, capture clean screenshots, and create a professional user guide and technical article explaining the project.

Claude can then work through the project rather than you manually explaining every screen.

------

# 2. Give Claude a dedicated documentation task

I would **not** simply say:

> "Document my project."

Instead, give it a structured assignment.

For example, in Claude Code:

```
I have completed this ASP.NET Core + LLM application.

Your task is to create complete documentation for the project.

First:
1. Inspect the repository.
2. Understand the architecture.
3. Identify how the application is started.
4. Identify the main user workflows.
5. Identify the LLM-related functionality.
6. Identify important configuration and environment variables.

Then:
7. Run the application locally.
8. Verify that it builds successfully.
9. Open the application in a browser.
10. Test the major user workflows.
11. If you find errors, diagnose them and report them before making changes.

After the application is working:
12. Capture clean screenshots of the important screens.
13. Store screenshots under /docs/images/.
14. Use meaningful filenames.

Finally:
15. Create /docs/USER-GUIDE.md.
16. Create /docs/TECHNICAL-ARTICLE.md.
17. Create /docs/SCREENSHOTS.md containing a screenshot inventory.

Do not expose API keys, connection strings, tokens, passwords, or other secrets in screenshots or documentation.

Do not modify application functionality unless I explicitly ask you to fix something.
```

That's a much better starting point.

------

# 3. Let Claude actually run your application

This is where Claude Code/Cowork becomes particularly useful.

Claude's current computer-use capability can open files, use the browser, run development tools, and interact with your screen.  Claude Help Center 

For your ASP.NET Core application, you could ask:

```
Start the ASP.NET Core application using the project's normal development procedure.

Determine:
- the correct startup project
- the URL
- HTTP/HTTPS ports
- whether a database is required
- whether an LLM API key is required

Do not guess credentials.

Start the application and verify that the home page loads successfully.
```

Claude should then be able to determine things such as:

```
https://localhost:7042
```

and open it in the browser.

------

# 4. Have it test the application like a real user

This is probably the most valuable part.

Don't just ask Claude to take screenshots.

Ask it to **discover and execute user journeys**.

For example:

```
Identify the 5 most important user workflows in this application.

For each workflow:

1. Start from the appropriate entry page.
2. Perform the workflow as a normal user.
3. Verify the expected result.
4. Record any errors.
5. Capture a screenshot at the most useful point.
6. Give the screenshot a meaningful filename.

Do not take screenshots of:
- browser developer tools
- terminal windows
- API keys
- credentials
- unnecessary UI
- broken/intermediate states

Prefer screenshots that would be useful in a professional user guide.
```

If your application is an LLM chat application, Claude might discover workflows such as:

```
01 - Home page
02 - Login
03 - New conversation
04 - Enter prompt
05 - LLM response
06 - Conversation history
07 - Document upload
08 - RAG/search result
09 - Settings
10 - Error handling
```

Obviously, the actual list should come from your application rather than being assumed.

------

# 5. Use browser automation for better screenshots

For a web application, I'd strongly consider using **Playwright** rather than relying entirely on raw desktop screenshots.

Claude Code can work with Claude in Chrome for a build → test → verify workflow, including reading browser state and debugging web applications.  Claude Help Center 

There is also an official Playwright integration documented for Claude Code that supports browser automation and screenshots.  Claude Cowork Guide 

That gives you a workflow more like:

```
Claude Code
    │
    ├── inspect ASP.NET Core project
    │
    ├── dotnet build
    │
    ├── dotnet run
    │
    ▼
Browser / Playwright
    │
    ├── open application
    ├── login
    ├── create conversation
    ├── send prompt
    ├── verify response
    └── screenshot
    │
    ▼
docs/images/
```

This is much better than taking random desktop screenshots.

------

# 6. Create a screenshot directory

I'd establish a convention such as:

```
docs/
├── USER-GUIDE.md
├── TECHNICAL-ARTICLE.md
├── SCREENSHOTS.md
└── images/
    ├── 01-home.png
    ├── 02-login.png
    ├── 03-dashboard.png
    ├── 04-new-chat.png
    ├── 05-llm-response.png
    ├── 06-document-upload.png
    ├── 07-rag-results.png
    └── 08-settings.png
```

Tell Claude:

```
All documentation screenshots must go into:

docs/images/

Use this naming convention:

NN-short-description.png

Example:

01-home.png
02-login.png
03-dashboard.png
04-llm-chat.png

Keep screenshots consistent in browser size and zoom level.
```

------

# 7. Ask Claude to make the screenshots "article quality"

This is important.

You don't want:

```
Screenshot 1:
Claude's entire desktop
Visual Studio
Terminal
Spotify
Slack
20 browser tabs
```

😂

Instead:

```
Browser
┌───────────────────────────────────────┐
│ My ASP.NET Core LLM Application       │
├───────────────────────────────────────┤
│                                       │
│       Chat with your documents        │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ Ask something about the project │  │
│  └─────────────────────────────────┘  │
│                                       │
│             [ Send ]                  │
│                                       │
└───────────────────────────────────────┘
```

Prompt Claude with:

```
Before taking screenshots:

- maximize the application/browser
- use a consistent viewport
- remove unnecessary browser tabs
- ensure the application is in a clean state
- avoid personal information
- avoid secrets
- avoid development/debugging UI
- make sure important UI elements are visible
- wait until asynchronous LLM responses have completed
- use the same viewport dimensions for all screenshots

Screenshots should be suitable for publication in a technical article.
```

------

# 8. Then have Claude write the User Guide

Once the screenshots exist, don't ask Claude to write the guide from memory.

Tell it to **inspect the screenshots and application**.

For example:

```
Now create docs/USER-GUIDE.md.

The guide should be written for a developer or technical user who has never used this application.

Include:

1. Overview
2. Prerequisites
3. Installation
4. Configuration
5. Starting the application
6. First-time usage
7. Main features
8. Step-by-step workflows
9. LLM functionality
10. Troubleshooting
11. FAQ

For each important workflow:

- explain what the user is trying to accomplish
- provide numbered steps
- include the relevant screenshot
- explain what the user should see
- explain the expected result

Use the screenshots from docs/images/.

Do not invent functionality.
Only document functionality you verified in the application or repository.
```

That last sentence is **very important**.

AI-generated documentation often invents features that don't exist.

------

# 9. Then create the technical article separately

I'd actually create **two documents**, because a user guide and an article serve different purposes.

### User guide

Audience:

> Someone who wants to use the application.

### Technical article

Audience:

> A developer who wants to understand how you built it.

Ask Claude:

```
Now create docs/TECHNICAL-ARTICLE.md.

Write this as a publishable technical article explaining how this ASP.NET Core + LLM application works.

Structure it as:

# Building an ASP.NET Core Application with LLM Integration

## Introduction

## What We Are Building

## Architecture

## Technology Stack

## ASP.NET Core Application Structure

## LLM Integration

## Request/Response Flow

## Prompt Processing

## Data Flow

## Error Handling

## Configuration

## Security Considerations

## Running the Application

## Testing the Application

## Screenshots

## Lessons Learned

## Future Improvements

The article should explain the actual implementation found in the repository.

Do not invent architecture or implementation details.

When discussing code, reference the actual project files and classes.

Use Mermaid diagrams where useful.

Use screenshots from docs/images/ where they help explain the system.
```

------

# 10. The really nice part: have Claude create the architecture diagram

For an ASP.NET Core + LLM project, you could ask it to generate something like:

Mermaid flowchart: User, WebApp, Api, LLMService, LLMProvider, Database, DocumentStore

But tell Claude:

```
Inspect the actual source code first.

Create a Mermaid architecture diagram representing the real application architecture.

Do not create a generic ASP.NET Core architecture diagram.
```

Then your article can contain:

```
User
  │
  ▼
ASP.NET Core UI
  │
  ▼
Application/API Layer
  │
  ├───────────────┐
  ▼               ▼
LLM Service     Database
  │
  ▼
LLM Provider
```

This makes the article substantially more useful.

------

# 11. Have Claude create a "documentation manifest"

I'd add one more file:

```
docs/SCREENSHOTS.md
```

For example:

```
# Screenshot Inventory

| File | Screen | Purpose |
|---|---|---|
| 01-home.png | Home | Application landing page |
| 02-login.png | Login | Authentication |
| 03-dashboard.png | Dashboard | Main application |
| 04-new-chat.png | New Chat | Creating a conversation |
| 05-llm-response.png | LLM Response | AI response |
| 06-upload.png | Document Upload | Uploading documents |
| 07-results.png | Results | Retrieved information |
```

Then you can easily maintain the article later.

------

# 12. A better approach: create a reusable "Documentation Agent" prompt

Once you've done this once, save a master instruction.

For example:

```
# Project Documentation Agent

You are responsible for producing production-quality documentation
for this software project.

## Phase 1 — Understand

Inspect the entire repository.

Identify:
- application type
- frameworks
- projects
- dependencies
- entry points
- configuration
- databases
- external services
- LLM providers
- authentication
- important user workflows

Do not modify the application.

## Phase 2 — Build

Verify:

dotnet restore
dotnet build

Report build failures.

## Phase 3 — Run

Start the application using the project's normal development process.

Verify that the application is reachable.

## Phase 4 — Test

Identify important user journeys.

Execute each journey through the browser.

Record:
- workflow
- expected result
- actual result
- errors
- screenshot

## Phase 5 — Screenshots

Create:

docs/images/

Take clean screenshots of important application states.

Never include:
- passwords
- API keys
- tokens
- secrets
- personal data

## Phase 6 — Documentation

Create:

docs/
├── USER-GUIDE.md
├── TECHNICAL-ARTICLE.md
└── SCREENSHOTS.md

## Phase 7 — Quality Review

Verify:

- Every documented feature actually exists.
- Every screenshot corresponds to the described screen.
- Image links work.
- No secrets appear in documentation.
- No fictional functionality was introduced.
- Commands are correct.
- URLs/ports are correct.
- Documentation is understandable to a new developer.
```

Now you have a repeatable process for **every project you build**.

------

# 13. You can take this even further

For example, after finishing your project, you could tell Claude:

```
Perform a complete documentation pass on this project.

I want you to behave as:

1. Senior .NET developer
2. QA engineer
3. Technical writer
4. Documentation photographer

Do not change application code.

Your deliverables are:

/docs
    USER-GUIDE.md
    TECHNICAL-ARTICLE.md
    ARCHITECTURE.md
    TROUBLESHOOTING.md
    SCREENSHOTS.md

/docs/images
    all required screenshots

First understand the project.

Then build it.

Then run it.

Then test it.

Then capture screenshots.

Then write the documentation.

Finally review everything for accuracy.
```

That's basically turning Claude into a **post-development documentation pipeline**.

------

## 14. One important distinction: Claude Code vs Cowork

I'd use them slightly differently.

| Task                           | Claude Code | Cowork |
| ------------------------------ | ----------- | ------ |
| Inspect source code            | ⭐⭐⭐         | ⭐⭐     |
| Modify code                    | ⭐⭐⭐         | ⭐⭐     |
| Run `dotnet` commands          | ⭐⭐⭐         | ⭐⭐     |
| Understand architecture        | ⭐⭐⭐         | ⭐⭐⭐    |
| Browser testing                | ⭐⭐⭐         | ⭐⭐⭐    |
| Screen interaction             | ⭐⭐⭐         | ⭐⭐⭐    |
| Take screenshots               | ⭐⭐⭐         | ⭐⭐⭐    |
| Write Markdown                 | ⭐⭐⭐         | ⭐⭐⭐    |
| Produce polished documentation | ⭐⭐          | ⭐⭐⭐    |
| Work across files/apps         | ⭐⭐⭐         | ⭐⭐⭐    |



Cowork is specifically designed to hand off broader tasks across files and tools, while Claude Code is naturally suited to the repository/build/test side. Current Claude documentation also describes computer use as available across Cowork and Claude Code.  Claude Help Center+1 

And Anthropic currently describes Claude Code + Claude in Chrome as a **build → test → verify** workflow, which is almost exactly what you're trying to accomplish.  Claude Help Center 

------

## 15. One safety issue you should take seriously

Because you're asking Claude to run your application and interact with your computer, **don't give it unrestricted access to your whole machine**.

Use a project-specific folder and don't expose:

```
.env
appsettings.Production.json
Azure credentials
AWS credentials
SSH keys
password managers
personal documents
production databases
```

Claude's computer-use feature can see what's displayed on your screen, and Anthropic specifically warns that computer use has additional risks because it can directly interact with your desktop.  Claude Help Center+1 

For an LLM project, I'd also use **fake/demo API keys or development credentials** whenever possible.

------

## The ideal pipeline for your ASP.NET Core + LLM projects

I'd ultimately make your workflow:

```
                ┌────────────────────┐
                │  Completed Project │
                └─────────┬──────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │  Claude Code    │
                 │ Inspect Repo    │
                 └────────┬────────┘
                          │
                          ▼
                  dotnet build/run
                          │
                          ▼
                ┌──────────────────┐
                │ Browser / Chrome │
                │ Playwright       │
                └────────┬─────────┘
                         │
                 Test workflows
                         │
                         ▼
                ┌──────────────────┐
                │   Screenshots    │
                │   docs/images/   │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    Claude        │
                │ Technical Writer │
                └────────┬─────────┘
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
        USER-GUIDE   ARTICLE     ARCHITECTURE
             │           │           │
             └───────────┼───────────┘
                         ▼
                  Publish to GitHub
                  / Blog / Medium
```

**This is the approach I'd recommend rather than asking Claude to "write an article about my project."** Let it first **prove the application works and collect the evidence/screenshots**, then generate the documentation from that evidence.

If you're using **Visual Studio + ASP.NET Core + SQL Server + OpenAI/Azure OpenAI/other LLM**, I can also give you a **copy-paste Claude Code/Cowork master prompt specifically designed to: build → launch IIS Express/Kestrel → browser test → take 10–15 screenshots → create Mermaid architecture → generate README + user guide + technical blog article**.