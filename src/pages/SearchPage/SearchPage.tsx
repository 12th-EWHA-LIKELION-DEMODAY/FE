import { useEffect, useState } from 'react';
import * as S from './SearchPage.style';

// components
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import SearchResult from './components/SearchResult';
import Onboarding from 'pages/ListPage/components/Onboarding';

// data
import { useItemContext } from 'contexts/ItemContext';
import { useSearchInfiniteQuery } from 'hooks/useInfiniteQuery';

const SearchPage = () => {
  const [query, setQuery] = useState(() => window.localStorage.getItem('query') || ''); // 검색어 유지
  const { items, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchInfiniteQuery(query);

  useEffect(() => {
    window.localStorage.setItem('query', query); // 검색어 저장
  }, [query]);

  const { isItemClicked } = useItemContext(); // 온보딩 트리거

  return (
    <S.Wrapper>
      <SearchBar isBack={true} query={query} setQuery={setQuery} />
      {query ? (
        <SearchResult
          query={query}
          data={items}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      ) : (
        <SearchHistory query={query} setQuery={setQuery} />
      )}
      {isItemClicked && <Onboarding />}
    </S.Wrapper>
  );
};

export default SearchPage;
