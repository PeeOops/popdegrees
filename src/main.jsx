import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css'
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import MovieDetails from './pages/MovieDetails';
import TvSeriesDetails from './pages/TvSeriesDetails';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetails />}/>
      <Route path="/movies" element={<Movies />} />
      <Route path="/series/:id" element={<TvSeriesDetails />} />
      <Route path="/series" element={<TvSeries />}/>
    </Routes>
  </BrowserRouter>
)
