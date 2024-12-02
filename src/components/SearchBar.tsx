import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, TextSearch, X } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useAppDispatch } from '@/model/store.ts';
import { valuesSlice } from '@/model/values.ts';
import { useDebounceValue } from 'usehooks-ts';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  const [debouncedValue, setDebouncedValue] = useDebounceValue('', 500);

  useEffect(() => {
    dispatch(valuesSlice.actions.setSearchText(debouncedValue.trim()));
  }, [debouncedValue]);

  const clearSearch = () => {
    setSearchTerm('');
    dispatch(valuesSlice.actions.resetSearchText());
  };

  return (
    <div className="w-full pb-4">
      <div className="relative">
        {!searchTerm ? (
          <Search
            className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
            size={20}
          />
        ) : (
          <TextSearch
            className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
            size={20}
          />
        )}
        <Input
          data-testid="searchBarInput"
          type="text"
          placeholder=""
          value={searchTerm}
          onChange={(e) => {
            const searchText = String(e.target.value);
            setSearchTerm(searchText);
            setDebouncedValue(searchText);
          }}
          className="w-full pl-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={clearSearch}
          >
            <X className="text-muted-foreground h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
