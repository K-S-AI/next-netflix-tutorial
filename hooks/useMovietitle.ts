import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovietitle = (movieTitle:string) => {
  const { data, error, isLoading, mutate } = useSwr(`/api/moviestitle?title=${movieTitle}`, fetcher, {
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

export default useMovietitle;
