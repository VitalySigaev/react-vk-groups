import React, { ChangeEvent } from 'react';
import { Select, Checkbox } from '@vkontakte/vkui';
import './Filters.css';
import '@vkontakte/vkui/dist/vkui.css';


interface FiltersProps {
  filter: {
    privacy: string;
    avatarColor: string;
    hasFriends: boolean;
  };
  handleFilterChange: (filterKey: string, value: string | boolean) => void;
  uniqueAvatarColors: string[];
  uniquePrivacyOptions: string[];
}

const Filters: React.FC<FiltersProps> = ({
  filter,
  handleFilterChange,
  uniqueAvatarColors,
  uniquePrivacyOptions,
}) => (
  <div className="filters-container">
    <Select
      className="select"
      options={uniquePrivacyOptions.map((option) => ({ value: option, label: option }))}
      value={filter.privacy || 'all'}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        handleFilterChange('privacy', e.target.value)
      }
    />
    <Select
      className="select"
      options={[
        { value: 'any', label: 'Any' },
        ...(uniqueAvatarColors.map((color) => ({ value: color, label: color })))
      ]}
      value={filter.avatarColor || 'any'}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        handleFilterChange('avatarColor', e.target.value)
      }
    />

    <Checkbox
      className="checkbox"
      checked={filter.hasFriends}
      onChange={(e) => handleFilterChange('hasFriends', e.target.checked)}
    >
      Has Friends
    </Checkbox>
  </div>
);

export default Filters;

