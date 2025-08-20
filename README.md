📦 Inventory Pro

An advanced Inventory Management System built with React + TypeScript, designed to simplify product and supplier management with real-time features, analytics, and a clean modern UI.

🔗 Live Demo: Inventory Pro (https://inventory-pro-seven.vercel.app/)

🚀 Tech Stack

Frontend: React + TypeScript, TailwindCSS

State Management: React Context API

Routing: React Router DOM

Authentication: Local storage–based session simulation (can be extended to Firebase/Auth0)

Data Handling: Firestore/Mock JSON (based on environment)

UI Enhancements: Dark/Light Mode Toggle, Responsive Design, Chart Visualizations

Deployment: Vercel

✨ Features
🔐 Authentication & Security

User Signup & Login with validations

Local session handling using localStorage

📊 Dashboard

Manage Products (Add, Edit, Delete)

Live Search & Filter

Export product list to CSV

Inventory Statistics (Total Value, Low Stock Alerts)

Data visualization with charts

👥 Supplier Management

Add, Edit, and Delete Suppliers

Export supplier list to CSV

🎨 UI & Experience

Responsive design with TailwindCSS

Dark/Light Mode Toggle

Smooth navigation with SPA routing

📩 Contact Page

Contact form with basic validation

📂 Project Structure
src/
│── components/     # Reusable UI components (Navbar, DarkModeToggle, ProtectedRoute)
│── context/        # Auth context for session handling
│── pages/          # Application pages (Home, Login, Signup, Dashboard, Suppliers, Contact)
│── firebase.js     # Firebase config (optional if used)
│── App.tsx         # Main app with routing
│── main.tsx        # Entry point

🌍 Deployment

Deployed on Vercel

Continuous deployment enabled (auto-builds on every commit)

🤝 Contribution

Want to improve Inventory Pro? Feel free to fork and contribute!

Fork the repository

Create a new branch: git checkout -b feature-xyz

Commit changes: git commit -m "Add xyz feature"

Push the branch: git push origin feature-xyz

Create a Pull Request

📜 License

This project is licensed under the MIT License.
