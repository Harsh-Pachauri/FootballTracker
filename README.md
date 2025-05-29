# ⚽ Football Tracker

**Football Tracker** is a modern web application that lets you explore live and upcoming football matches, filter by leagues, view team players, and switch between dark and light mode — all in a clean and user-friendly interface.

Powered by the [AllSportsAPI](https://allsportsapi.com/), Football Tracker is built using React + TypeScript and supports future enhancements like detailed player and team profiles.

---

## 🚀 Features

* 🎯 **Landing Page** with feature highlights and call to action
* 🏆 **Select League** to view matches from top football leagues around the world
* 🔹 **Live Match Listing** with real-time data pulled from the external API
* 👥 **View Team Players** by clicking on a team from any match
* 🌙 **Dark Mode / Light Mode** toggle for a better viewing experience
* 🛠️ **Coming Soon**: Enhanced player profiles and smart team insights

---

## 🧐 Tech Stack

* **Frontend**: React + TypeScript
* **Styling**: Tailwind CSS
* **Icons**: Lucide Icons
* **Routing**: React Router
* **API**: [AllSportsAPI](https://allsportsapi.com/)

---

## 🛠️ Getting Started

Follow these steps to run the app locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/football-tracker.git
cd football-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your API Key

* Sign up at [AllSportsAPI](https://allsportsapi.com/)
* Get your free API key

### 4. Setup Environment Variable

Create a `.env` file in the root folder:

```env
VITE_API_KEY=your_api_key_here
```

### 5. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📂 Basic Folder Structure

```
project-root/
│
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── context/      
│   ├── pages/           # Landing, Matches, etc.
│   ├── services/        # API logic
│   ├── utils/        
│   └── App.tsx
# Main app entry
├── .env                 # API key (not committed)
├── .gitignore           # Ignores .env and other files
└── README.md            # This file
```

---

## ⚠️ Disclaimer

This project uses a free external API. Make sure you adhere to [AllSportsAPI’s usage terms](https://allsportsapi.com/).

---

## 📌 TODO / Roadmap

* Add player profiles with detailed stats
* Add team pages with match history
* Deploy to Vercel/Netlify
* Optimize API calls and error handling

---

## 💡 Author

Made by [Harsh Pachauri](https://github.com/Harsh-Pachauri)

---

## 🏑 License

This project is open source and free to use.
