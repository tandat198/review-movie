import fetch from "isomorphic-unfetch";
import MoviesList from "../components/MoviesList";
import { apiURL } from "../redux/api";

function NowShowingMovies({ movies }) {
    return (
        <div className='px-3 pt-5 pb-6'>
            <h1 className='has-text-weight-bold mb-4'>Phim Đang Chiếu</h1>
            <MoviesList movies={movies[0]} />
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${apiURL}/api/movies?status=[1]&&pageSize=100`);
    const data = await res.json();

    return {
        props: { movies: data },
    };
}

export default NowShowingMovies;
