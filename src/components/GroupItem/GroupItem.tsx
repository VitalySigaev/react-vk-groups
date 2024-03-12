import React from 'react';
import { Avatar, Div, Separator } from '@vkontakte/vkui';
import './GroupItem.css';
import { Group, User } from '../../types';

interface GroupItemProps {
    group: Group;
    selectedGroup: Group | null;
    handleFriendClick: (group: Group) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ group, selectedGroup, handleFriendClick }) => (
    <Div key={group.id} className="group-item">
        <div className="group-name">
            {group.avatar_color ? (
                <Avatar
                    className="group-avatar"
                    style={{
                        backgroundColor: group.avatar_color,
                    }}
                />
            ) : (
                <div className="group-avatar-none">Аватар <br /> отсутствует</div>
            )}

            <div className='name'>{group.name}</div>
        </div>
        <Separator />

        <div className="group-status">{group.closed ? 'Closed' : 'Open'}</div>
        {group.members_count ? <div>Подписчики: {group.members_count}</div> : <></>}
        {group.friends && group.friends.length > 0 && (
            <div className="friends-count" onClick={() => handleFriendClick(group)}>
                {`${group.friends.length} Друзья`}
            </div>
        )}
        {selectedGroup?.id === group.id && (
            <div className="friend-list">
                <h2>Список друзей</h2>
                {group.friends?.map((friend: User, index: number) => (
                    <div key={index} className="friend-item">{`${friend.first_name} ${friend.last_name}`}</div>
                ))}
            </div>
        )}
    </Div>
);

export default GroupItem;
