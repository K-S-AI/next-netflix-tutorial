import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovietype from '@/hooks/useMovietype';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Films = () => {
  const { data: movies = [] } = useMovieList();
  const { data: actionmoviestype = [] } = useMovietype("Action");
  const { data: comedymoviestype = [] } = useMovietype("Comedy");
  const { data: adventuremoviestype = [] } = useMovietype("Adventure");
  const { data: scifimoviestype = [] } = useMovietype("Sci-Fi");
  const {isOpen, closeModal} = useInfoModalStore();
  const style={margin : 100}

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      {/* <Billboard /> */}
      
      <div className="pb-40" >
        <text className="text-8xl font-bold" style={{ color: 'transparent', height: '300em', overflow: 'hidden' }}>Some Invisible Title</text>
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="Action Films" data={actionmoviestype} />
        <MovieList title="Comedy Films" data={comedymoviestype} />
        <MovieList title="Adventure Films" data={adventuremoviestype} />
        <MovieList title="Sci-Fi Films" data={scifimoviestype} />
      </div>
    </>
  )
}

export default Films;
