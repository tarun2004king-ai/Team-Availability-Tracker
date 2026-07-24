import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__eyebrow">Live roster</div>
        <h1 className="app__title">Team Availability Tracker</h1>
        <p className="app__subtitle">
          Toggle a status to update it everywhere, instantly.
        </p>
      </header>

      <main className="app__main">
        <Dashboard />
      </main>
    </div>
  );
}
