import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MovieDetails } from './pages/MovieDetails'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg bg-gradient-to-br from-dark-bg to-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App