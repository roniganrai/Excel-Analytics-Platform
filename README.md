# Excel-Analytics-Platform

This guide is for all teammates working on this project.  
Follow these steps exactly to avoid mistakes and conflicts.

---

## Step 1: Clone the Repository

First, open your vscode terminal(without seleting any folder):
go to terminal (ctrl+`);

git clone https://github.com/roniganrai/Excel-Analytics-Platform.git

then:
cd Excel-Analytics-Platform

## Step 2: Choose Where You Will Work

If you're a backend developer:
cd backend

If you're a frontend developer:
cd client

## Step 3: Install Project Dependencies

cd backend
npm install

cd client
npm install

## Step 4: Checkout and Pull the dev Branch

**Never work directly on main**

Start by switching to dev branch:
git checkout dev
git pull origin dev

## Step 5: Create a New Feature Branch

Each person should create a branch based on the feature they are working on:
git checkout -b feature/your-task-name

## Step 6: Start Writing Code

For backend: write in backend/controllers/, routes/, models/, etc.

For frontend: write in client/src/components/ or pages/

**Make sure your code works locally before committing**

## Step 7: Add and Commit Your Changes

git add .
git commit -m "Clear message about what you did"

## Step 8: Push Your Branch to GitHub

git push origin feature/your-task-name

## Step 9: Create a Pull Request

-> Go to your GitHub repo page

-> Click Pull Requests → New Pull Request

Set: Base branch: dev
Compare branch: feature/your-task-name

Click Create Pull Request

Add a short description (must)

## Step 10: Always Stay Updated

Before you start new work, pull the latest dev branch:

git checkout dev
git pull origin dev

Then create a new feature branch and continue work.

Extra Notes:

✅ Don’t push to main

✅ Always write in a feature branch

✅ Always commit meaningful changes

\*\* Summary of the steps:

# Step 1: Clone the project repo

git clone https://github.com/roniganrai/Excel-Analytics-Platform.git //Download project code

# Step 2: Move into the project directory

cd Excel-Analytics-Platform //Go inside the project folder

# Step 3: Install dependencies (backend)

cd backend
npm install //Install backend libraries

# (OR) For frontend:

cd ../client
npm install //Install frontend libraries

# Step 4: Switch to dev branch

git checkout dev //Move to dev branch

# Step 5: Pull the latest dev updates

git pull origin dev //Get latest code from dev branch

# Step 6: Create a feature branch

git checkout -b feature/my-task-name //Create your own working branch

# Step 7: Work on code → then add changes

git add . //Stage all changed files

# Step 8: Commit your work

git commit -m "Describe what you added or changed" //Save your changes locally

# Step 9: Push your branch to GitHub

git push origin feature/my-task-name //Upload your branch to GitHub

# Step 10: Create Pull Request from GitHub UI

# → Go to repo → Pull Requests → New Pull Request

# → Base: dev, Compare: feature/my-task-name

# → Add title + description, then submit

We're 6 minds, but 1 mission.
We might be beginners,
but together we're unstoppable.
Let's build, learn, and succeed as one team!
