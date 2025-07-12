## 🚀 **Stack**

- **Frontend:** Vite + React + TypeScript + MUI + Redux Toolkit (RTK)
- **Backend:** Node.js + Express (mock, no real database)
- **Routing:** React Router

---

## 📂 **Project structure**

```plaintext
/education-dashboard
 ├── /client     # Frontend (Vite React app)
 ├── /server     # Backend (Express mock API)
 ├── /server/users.json, universities.json, schools.json, highschools.json
 ├── README.md
````

✅ Setup instructions
1️⃣ Clone the project

git clone https://github.com/Mehemmed77/KibritProject

cd KibritProject

2️⃣ Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

3️⃣ Run the servers

Backend:

```
cd server
node index.js
```
    Runs your mock API at: http://localhost:5000

Frontend:

Open a new terminal:

```
cd client
npm run dev
```

    Runs your React app at: http://localhost:5173 (or whichever Vite port)

🗝️ How it works

    ✅ Login: Enter a username & password.

        If user does not exist, it’s added to users.json (mock).

    ✅ Dashboard: Shows a sidebar with Universities, Schools, and High Schools.

    ✅ Tables: Each page displays mock data from JSON files.

    ✅ Filters: Use the dynamic filter component to filter by region, year, etc.

    ✅ Corpus: Click the 👁️ icon to open a modal with Corpus details.

    ✅ Delete: Click the 🗑️ icon → Confirm → Row is removed in the UI.

    ⚠️ Note: Since this is a mock backend, deletes and edits do not persist if you restart the server.