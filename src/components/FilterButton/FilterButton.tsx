import React from 'react';
import './FilterButton.scss';
import { FilterParam } from '../../types/FilterParam';
import { useAppSelector } from '../../hooks/redux';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: FilterParam;
  text: string;
};

export const FilterButton: React.FC<Props> = ({ onChange, text, value }) => {
  const { filterParam } = useAppSelector(state => state.task);

  return (
    <label className="filter-button">
      {text}
      <input
        className="filter-button__input"
        type="radio"
        name="filter"
        value={value}
        checked={filterParam === value}
        onChange={onChange}
      />
    </label>
  );
};
