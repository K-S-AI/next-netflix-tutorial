import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovietype = (movieType:string) => {
  const { data, error, isLoading, mutate } = useSwr(`/api/moviestype?type=${movieType}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useMovietype;
