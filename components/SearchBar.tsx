import { signOut } from 'next-auth/react';
import React from 'react';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import useCurrentUser from '@/hooks/useCurrentUser';

interface SearchBarProps {
  visible?: boolean;
}



// const SearchBar: React.FC<SearchBarProps> = ({ visible }) => {
//   const { data: currentUser } = useCurrentUser();

//   if (!visible) {
//     return null;
//   }

//   return (
//     <div className="absolute top-14 right-0 flex items-center">
//       <input
//         type="text"
//         placeholder="Search..."
//         className="px-3 py-2 text-white bg-transparent border-0 focus:outline-none"
//       />
//     </div>
//   )
// }

// export default SearchBar;



const SearchBar: React.FC<SearchBarProps> = ({ visible }) => {
 
  const { data: currentUser } = useCurrentUser();

 
 
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    // 在这里执行搜索操作，可以是调用后端API进行搜索

    

    if (searchTerm.trim() !== '') {
      router.push({
        pathname: '/search',
        query: { searchTerm },
      });
    }; }
  useEffect(() => {
    if (visible){
      const handleKeyDown = (e: KeyboardEvent) => {
        console.log('Key pressed:', e.key)
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }}
    }, [visible,searchTerm]); // searchTerm 作为依赖项
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation(); // 阻止事件冒泡
    };
  if (!visible) {
    return null;
  }
  return (
    <div className="absolute top-14 right-0 flex items-center" onClick={handleClick}>
    <input
      type="text"
      placeholder="Search..."
      className="px-3 py-2 text-white bg-transparent border-0 focus:outline-none"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}

    />
  </div>
  );
}


export default SearchBar;

