import React, { useEffect, useState } from 'react';
import './Stats.scss';
import tonzzLogo from './assets/ZZ.png';
import bronzeRank from './assets/2.png';
import silverRank from './assets/1.png';
import goldRank from './assets/3.png';

interface User {
  username: string;
  points: number;
  rank: number;
}

const Stats: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('users');
    if (storedData) {
      const parsedData: { [key: number]: string } = JSON.parse(storedData);
      console.log(1)
      const userList: User[] = Object.entries(parsedData).map(([points, username]) => ({
        username,
        points: Number(points),
        rank: 0, // Изначально ранг равен 0
      }));
      console.log(userList);
      userList.sort((a, b) => b.points - a.points);

      userList.forEach((user, index) => {
        user.rank = index + 1;
      });

      // Обновляем состояние
      setUsers(userList);
    }
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return bronzeRank;
      case 2:
        return silverRank;
      case 3:
        return goldRank;
      default:
        return null; // Возвращаем null, если ранга нет
    }
  };

  return (
    <div className="stats-container">
      <div className="stats-header">
        <img src={tonzzLogo} alt="TONZZ Logo" className="tonzz-logo" />
      </div>
      <div className="stats-list">
        {users.map((user, index) => (
          <div className="stats-item" key={index}>
            <div className="username">@{user.username}</div>
            <div className="points">+{user.points.toLocaleString()}</div>
            {getRankIcon(user.rank) && (
              <img src={getRankIcon(user.rank)!} alt={`Rank ${user.rank}`} className="rank-icon" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
