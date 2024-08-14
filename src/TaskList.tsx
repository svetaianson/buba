import React, { useState, useEffect } from 'react';
import tonzzLogo from './assets/ZZ.png';
import wel from './assets/25.png';
import './TaskList.scss';
import ZZ from './assets/ZZ2.png';
import start from './assets/start.png';
import claim from './assets/claim.png';
import g from './assets/4.png';
import j from './assets/5.png';

interface TasksProps {
  frends: number;
  balance: number;
  setBalance: (newBalance: number) => void;
  my_href: string;
}

const TaskList: React.FC<TasksProps> = ({ frends, balance, setBalance, my_href }) => {
  const linkToCopy = my_href;
  const url = "https://t.me/tonzzcoin";

  const handleClick = () => {
    window.location.href = url;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
    } catch (err) {
      console.error('Не удалось скопировать ссылку: ', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Поделиться с друзьями',
          text: 'Посмотрите этот интересный сайт!',
          url: my_href, // Замените на вашу ссылку
        })
        .then(() => {
          console.log('Успешно поделились');
        })
        .catch((error) => {
          console.error('Ошибка при обмене', error);
          alert('Произошла ошибка при обмене. Попробуйте снова.');
        });
    } else {
      alert('Web Share API не поддерживается на этом устройстве.');
    }
  };

  const [claimed, setClaimed] = useState<{ [key: number]: boolean }>(() => {
    const storedClaimed = localStorage.getItem('claimed');
    return storedClaimed ? JSON.parse(storedClaimed) : { 25: false, 50: false, 0: false };
  });

  useEffect(() => {
    localStorage.setItem('claimed', JSON.stringify(claimed));
  }, [claimed]);

  const handleClaim = (count: number, reward: number) => {
    if (!claimed[count]) {
      setClaimed((prev) => ({ ...prev, [count]: true }));
      setBalance(balance + reward);
    }
  };

  const renderButton = (requiredFriends: number, reward: number) => {
    if (frends >= requiredFriends) {
      return (
        <button onClick={() => handleClaim(requiredFriends, reward)} disabled={claimed[requiredFriends]}>
          <img src={claim} className="wheel" alt="Claim" />
        </button>
      );
    }
    return (
      <button>
        <img src={start} className="wheel" alt="Start" />
      </button>
    );
  };

  return (
    <div className="main_con">
      <div className="stats-header">
        <img src={tonzzLogo} alt="TONZZ Logo" className="tonzz-logo" />
      </div>
      <button className="rol">
        <img src={wel} className="wheel" alt="Wheel" />
      </button>
      <div className="binch">
        <div className="kasks">
          <div className="t">
            <img src={ZZ} className="wheel" alt="ZZ Logo" />
            <div className="data">
              <div className="discription">Invite 25 friends</div>
              <div>35000 {frends}/25</div>
            </div>
            {renderButton(25, 35000)}
          </div>
          <div className="t">
            <img src={ZZ} className="wheel" alt="ZZ Logo" />
            <div className="data">
              <div className="discription">Invite 50 friends</div>
              <div>75000 {frends}/50</div>
            </div>
            {renderButton(50, 75000)}
          </div>
          <div className="t">
            <img src={ZZ} className="wheel" alt="ZZ Logo" />
            <div className="data">
              <div className="discription">Subscribe channel</div>
              <div>50000</div>
            </div>
            <button onClick={() => {
                handleClick();
                if (!claimed[0]) {
                  handleClaim(0, 50000);
                }
              }}>
              <img src={claim} className="wheel" alt="Claim" />
            </button>
          </div>
        </div>
        <div className="copy">
          <button className="meet_frend" onClick={handleShare}>
            <tspan>Отправь другу</tspan>
          </button>
          <button className='cop' onClick={handleCopyLink}>
            <img src={j} className='wheel'></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
