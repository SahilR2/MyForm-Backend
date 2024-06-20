# Slidely Windows Form App Backend

This repository contains the code for the backend of the Windows Form App. The backend is built using Express.js with TypeScript and provides RESTful API endpoints for managing form submissions.

## Setup Instructions

1. Clone this repository to your local machine.
2. Navigate to the `MyForm-Backend` directory.
3. Install dependencies: `npm install`
4. Build and run the server: `npm start`

## API Endpoints

### `/ping` (GET)
<pre>
- Description: Endpoint to check if the server is running.
- Response:

  { "message": "Server is up and running" }
</pre>

### `/submit` (POST)
<pre>
- Description: Submit a new form.
- Request Body Parameters:

{
"name (string)": "Name of the submitter"
"email (string)": "Email of the submitter"
"phone (string)": "Phone number of the submitter"
"github_link (string)": "GitHub repo link for the task"
"stopwatch_time (string)": "Stopwatch time for the form submission"
}
</pre>

### `/read` (GET) 
<pre>
- Description: Read a form submission by index.
- Query Parameters:
      index (number): Index of the submission (0-based).
- Example Request: /read?index=0
</pre>

### `/delete/:index` (GET) 
<pre>
- Description: Delete a form submission by index.
- Query Parameters:
      index (number): Index of the submission (0-based).
- Example Request: /delete/1
</pre>

### `/search`
<pre>
- Description: search a form submission by email
- Query Parameters:
      email (string): email of the submission.
- Example Request: /read?index=0
</pre>


### Database : 
The backend uses a JSON file (db.json) as a simple database to store form submissions.

