import { FC, useState } from 'react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useAppDispatch } from '@/model/store.ts';
import { valuesSlice } from '@/model/values.ts';

type filterStates = 'none' | 'asc' | 'desc';

const nextSortState: Record<filterStates, filterStates> = {
  none: 'asc',
  asc: 'desc',
  desc: 'none',
} as const;

type SortByLastInterviewDateProps = {
  name: string;
  filterName: string;
  initialState: string;
};
export const SortButton: FC<SortByLastInterviewDateProps> = ({
  name,
  filterName,
  initialState,
}) => {
  const [sorterState, setSorterState] = useState(initialState);

  const dispatch = useAppDispatch();

  const cycleFilterState = () => {
    const nextSortStateValue = nextSortState[sorterState as filterStates];

    dispatch(
      valuesSlice.actions.setSortStateInSorters({
        filterName,
        filterState: nextSortStateValue,
      })
    );
    setSorterState(nextSortStateValue);
  };

  const getStateConfig = () => {
    switch (sorterState) {
      case 'asc':
        return {
          icon: <ArrowUpIcon />,
          variant: 'default',
          tooltip: 'Ascending order',
        };
      case 'desc':
        return {
          icon: <ArrowDownIcon />,
          variant: 'secondary',
          tooltip: 'Descending order',
        };
      default:
        return {
          icon: <ArrowUpDownIcon />,
          tooltip: 'No filter',
        };
    }
  };

  const { icon, tooltip } = getStateConfig();
  return (
    <Button
      onClick={cycleFilterState}
      className={`flex items-center justify-between transition-all duration-300`}
      aria-label={tooltip}
    >
      {icon}
      <span className="flex-grow text-left">{name}</span>
    </Button>
  );
};
