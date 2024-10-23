import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css'
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import MovieDetails from './pages/MovieDetails';
import TvSeriesDetails from './pages/TvSeriesDetails';
import NotFound from './components/404';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetails />}/>
      <Route path="/movies" element={<Movies />} />
      <Route path="/series/:id" element={<TvSeriesDetails />} />
      <Route path="/series" element={<TvSeries />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
)
