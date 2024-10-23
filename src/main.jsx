import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './styles/index.css'
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import MovieDetails from './pages/MovieDetails';
import TvSeriesDetails from './pages/TvSeriesDetails';
import NotFound from './components/404';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const MainLayout = () => {
  return (
      <>
          <Navigation />
          <Outlet /> {/* Renders child routes */}
          <Footer />
      </>
  );
};


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<TvSeries />} />
        <Route path="*" element={<NotFound />} />
      </Route>
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/series/:id" element={<TvSeriesDetails />} />
    </Routes>
  </BrowserRouter>
)


