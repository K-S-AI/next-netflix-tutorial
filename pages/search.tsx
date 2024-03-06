import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovietype from '@/hooks/useMovietype';
import useMovietitle from '@/hooks/useMovietitle';

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

const Search = () => {
  const router = useRouter();
  const { searchTerm } = router.query;
  // const searchTerm="sintel"
  console.log(searchTerm);
  const { data: searchtype = [] } = useMovietype(Array.isArray(searchTerm) ? searchTerm[0] : searchTerm || ""); // Ensure movieType is always a string
  const { data: searchtitle = [] } = useMovietitle(Array.isArray(searchTerm) ? searchTerm[0] : searchTerm || ""); // Ensure movieType is always a string
  const title1=`'${searchTerm}' type Films`;
  const title2=`'${searchTerm}' title Films`;

  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      
      <div className="pb-40">
        <text className="text-8xl font-bold" style={{ color: 'transparent', height: '300em', overflow: 'hidden' }}>Some Invisible Title</text>
        {/* <text className="text-8xl font-bold" style={{ color: 'white', height: '300em', overflow: 'hidden' }}>You Search Result</text> */}
        <MovieList title={title2} data={searchtitle} />
        <MovieList title={title1} data={searchtype} />
      </div>
    </>
  )
}

export default Search;
