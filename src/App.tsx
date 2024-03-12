import React, { useState, useEffect } from 'react';
import { View, Panel } from '@vkontakte/vkui';
import Header from './components/Header/Header';
import LoadingError from './components/LoadingError/LoadingError';
import Filters from './components/Filters/Filters';
import GroupItem from './components/GroupItem/GroupItem';
import { groups } from './groups';
import './App.css';
import { Group, User } from './types';



const App: React.FC = () => {
  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [filter, setFilter] = useState<{
    privacy: 'all' | 'open' | 'closed';
    avatarColor: string;
    hasFriends: boolean;
  }>({
    privacy: 'all',
    avatarColor: 'any',
    hasFriends: false,
  });
  const [friendList, setFriendList] = useState<User[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGroupsData(groups);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUniqueAvatarColors = (): string[] => {
    const colors: string[] = [];
    groupsData.forEach((group) => {
      if (group.avatar_color && !colors.includes(group.avatar_color)) {
        colors.push(group.avatar_color);
      }
    });
    return colors;
  };

  const getUniquePrivacyOptions = (): string[] => ['all', 'open', 'closed'];

  const handleFilterChange = (filterKey: string, value: string | boolean) => {
    setFilter({ ...filter, [filterKey]: value });
  };

  const handleFriendClick = (group: Group) => {
    if (selectedGroup?.id === group.id) {
      setSelectedGroup(null);
      setFriendList([]);
    } else {
      setSelectedGroup(group);
      setFriendList(group.friends || []);
    }
  };

  const filteredGroups = groupsData.filter((group) => {
    return (
      (filter.privacy === 'all' || (filter.privacy === 'closed' && group.closed) || (filter.privacy === 'open' && !group.closed)) &&
      (filter.avatarColor === 'any' || filter.avatarColor === group.avatar_color) &&
      (!filter.hasFriends || (filter.hasFriends && group.friends && group.friends.length > 0))
    );
  });

  return (
    <View activePanel="main">
      <Panel id="main">
        <Header />
        <LoadingError loading={loading} error={error} />
        {!loading && !error && (
          <>
            <Filters
              filter={filter}
              handleFilterChange={handleFilterChange}
              uniqueAvatarColors={getUniqueAvatarColors()}
              uniquePrivacyOptions={getUniquePrivacyOptions()}
            />
            <div className="group-list">
              {filteredGroups.map((group) => (
                <GroupItem key={group.id} group={group} selectedGroup={selectedGroup} handleFriendClick={handleFriendClick} />
              ))}
            </div>
          </>
        )}
      </Panel>
    </View>
  );
};

export default App;
