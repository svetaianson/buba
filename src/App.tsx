
import { number, retrieveLaunchParams } from '@telegram-apps/sdk';
import React, { useEffect, useState } from 'react';
import './App.scss';
import Boost from './BoostCircle';
import Ref from './Ref';
import Stats from './Stats';
import Task from './TaskList';
import tonzz from './assets/TONZZ.png';
import batteryGreen from './assets/battery-green.png';
import batteryOrange from './assets/battery-orange.png';
import batteryRed from './assets/battery-red.png';
import batteryYellow from './assets/battery-yellow.png';
import boostIcon from './assets/boost.png';
import homeIcon from './assets/home.png';
import refIcon from './assets/ref.png';
import settingsIcon from './assets/settings.png';
import statsIcon from './assets/stats.png';
import tasksIcon from './assets/tasks.png';
const { initDataRaw } = retrieveLaunchParams();






interface AppData {
  balance: number;
  tapLimit: number;
  tapCount: number;
  tapValue: number;
  boostActive: boolean;
  currentCharge: number;
  multitapUpgradeCost: number;
  energyUpgradeCost: number;
  fullChargeAvailable: number;
  hardWorkAvailable: boolean;
  hardWorkTimer: number;
  isHardWorkActive: boolean;
}

const App: React.FC = () => {
  const initialMultitapUpgradeCost = 5000;
  const initialEnergyUpgradeCost = 5000;
  const [balance, setBalance] = useState<number>(0);
  const [tapLimit, setTapLimit] = useState<number>(500);
  const [tapCount, setTapCount] = useState<number>(0);
  const [tapValue, setTapValue] = useState<number>(1);
  const [currentCharge, setCurrentCharge] = useState<number>(500);
  const [multitapUpgradeCost, setMultitapUpgradeCost] = useState<number>(initialMultitapUpgradeCost);
  const [energyUpgradeCost, setEnergyUpgradeCost] = useState<number>(initialEnergyUpgradeCost);
  const [fullChargeAvailable, setFullChargeAvailable] = useState<number>(3);
  const [hardWorkAvailable, setHardWorkAvailable] = useState<boolean>(true);
  const [hardWorkTimer, setHardWorkTimer] = useState<number>(0);
  const [isHardWorkActive, setIsHardWorkActive] = useState<boolean>(false);
  const [activeScreen, setActiveScreen] = useState<'home' | 'boost' | 'stats' | 'Ref' | 'Tasks'>('home');
  const { initDataRaw } = retrieveLaunchParams();
  const [frebs, setFrebs] = useState<number>(0);
  const [id, setid] = useState<number>(0);
  const [name, setname] = useState<string>("");
  useEffect(() => {
    fetch('https://1t1y2.ru:3000/api', {
      method: 'POST',
      headers: {
        Authorization: `tma ${initDataRaw}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setname(String(data.username));
        setBalance(Number(data.balance));
        setTapLimit(Number(data.tap_limit));
        setTapValue(Number(data.tapvalue)); // или data.tap_value, если есть такое значение
        setMultitapUpgradeCost(Number(data.multitap_upgrade_cost));
        setEnergyUpgradeCost(Number(data.energy_upgrade_cost));
        setFullChargeAvailable(Number(data.full_charge_available) ? 3 : 0);
        setHardWorkAvailable(data.hard_work_available);
        setFrebs(Number(data.friends));
        setid(Number(data.id));
        setCurrentCharge(Number(data.energi));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [initDataRaw]);
  
  const my_href = "https://t.me/Tiktok_hashtag_bot?start="+name;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCharge((prevCharge) => Math.min(prevCharge + 1, tapLimit));
    }, 3000);

    return () => clearInterval(interval);
  }, [tapLimit]);

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('frends', JSON.stringify(frebs));
  }, [frebs]);

  useEffect(() => {
    localStorage.setItem('fullChargeAvailable', JSON.stringify(fullChargeAvailable));
  }, [fullChargeAvailable]);

  useEffect(() => {
    localStorage.setItem('hardWorkAvailable', JSON.stringify(hardWorkAvailable));
  }, [hardWorkAvailable]);

  useEffect(() => {
    localStorage.setItem('tapValue', JSON.stringify(tapValue));
  }, [tapValue]);

  useEffect(() => {
    localStorage.setItem('multitapUpgradeCost', JSON.stringify(multitapUpgradeCost));
  }, [multitapUpgradeCost]);

  useEffect(() => {
    localStorage.setItem('energyUpgradeCost', JSON.stringify(energyUpgradeCost));
  }, [energyUpgradeCost]);

  useEffect(() => {
    localStorage.setItem('tapLimit', JSON.stringify(tapLimit));
  }, [tapLimit]);

  useEffect(() => {
    if (hardWorkTimer > 0) {
      const timerInterval = setInterval(() => {
        setHardWorkTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            setIsHardWorkActive(false);
            clearInterval(timerInterval);
          }
          return newTimer;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [hardWorkTimer]);


  const handleTap = () => {
    if (currentCharge > 0) {
      setTapCount(tapCount + 1);
      setBalance(balance + (isHardWorkActive ? tapValue * 10 : tapValue));
      setCurrentCharge(currentCharge - 1);
      animateTonzzLogo();
    }
  };

  const handleHardWork = () => {
    if (hardWorkAvailable) {
      setIsHardWorkActive(true);
      setHardWorkTimer(10);
      setHardWorkAvailable(false);
      setTimeout(() => setHardWorkAvailable(true), 24 * 60 * 60 * 1000);
      setActiveScreen('home'); // Переключение на экран Home после активации Hard Work
    }
  };

  const handleFullCharge = () => {
    if (fullChargeAvailable > 0) {
      setCurrentCharge(tapLimit);
      setFullChargeAvailable(fullChargeAvailable - 1);
      setActiveScreen('home'); // Переключение на экран Home после полного заряда
    }
  };

  const handleMultitapUpgrade = () => {
    if (balance >= multitapUpgradeCost) {
      setBalance(balance - multitapUpgradeCost);
      setTapValue(tapValue + 1);
      setMultitapUpgradeCost(multitapUpgradeCost * 2);
    }
  };

  const handleEnergyLimitUpgrade = () => {
    if (balance >= energyUpgradeCost) {
      setBalance(balance - energyUpgradeCost);
      setTapLimit(tapLimit + 500);
      setEnergyUpgradeCost(energyUpgradeCost * 2);
    }
  };

  const getBatteryImage = (): string => {
    const chargePercentage = (currentCharge / tapLimit) * 100;
    if (chargePercentage > 75) {
      return batteryGreen;
    } else if (chargePercentage > 50) {
      return batteryYellow;
    } else if (chargePercentage > 25) {
      return batteryOrange;
    } else {
      return batteryRed;
    }
  };

  const animateTonzzLogo = () => {
    const logo = document.querySelector('.TONZZ') as HTMLElement;
    if (logo) {
      logo.classList.add('animate');
      setTimeout(() => {
        logo.classList.remove('animate');
      }, 200);
    }
  };
  useEffect(() => {
    const handleEvent = () => {
        window.removeEventListener('beforeunload', handleEvent);
        window.removeEventListener('visibilitychange', handleEvent);
        const bodyData = new URLSearchParams();
        bodyData.append('balance', String(balance));
        bodyData.append('tapValue', String(tapValue));
        bodyData.append('tapLimit', String(tapLimit));
        bodyData.append('currentCharge', String(currentCharge));
        bodyData.append('multitapUpgradeCost', String(multitapUpgradeCost));
        bodyData.append('energyUpgradeCost', String(energyUpgradeCost));
        bodyData.append('fullChargeAvailable', String(fullChargeAvailable));
        bodyData.append('hardWorkAvailable', String(hardWorkAvailable));
        bodyData.append('id', String(id));
        bodyData.append('energi', String(currentCharge));
        navigator.sendBeacon('https://1t1y2.ru:3000/data', bodyData);
    };
    if('Telegram' in window ){
      let a=window.Telegram;
      if('WebApp' in window.Telegram){
        console.log(1);
      }
    }
    window.addEventListener('beforeunload', handleEvent);
    window.addEventListener('visibilitychange', handleEvent);
    return () => {
        window.removeEventListener('beforeunload', handleEvent);
        window.removeEventListener('visibilitychange', handleEvent);
    };
  }, [balance, tapLimit, tapValue, currentCharge, multitapUpgradeCost, energyUpgradeCost, fullChargeAvailable, hardWorkAvailable, id]);
  return (
    <div className="app">
      <div className="toc"><div className="tochka">.</div></div>
      <div className="top-bar">
        <button onClick={() => setActiveScreen('Ref')}>
          <img src={refIcon} alt="Ref" />
        </button>
        <button onClick={() => setActiveScreen('boost')}>
          <img src={boostIcon} alt="Boost" />
        </button>
        <button>
          <img src={settingsIcon} alt="Settings" />
        </button>
      </div>
      {activeScreen === 'home' && (
        <div className="main-content" onClick={handleTap}>
          <div className="balanse">{balance.toLocaleString()}</div>
          <div className="tonzz-logo">
            <img src={tonzz} className="TONZZ" />
          </div>
          <div className="battery">
            <img src={getBatteryImage()} alt="Battery" />
            <div className="tap-limit">{currentCharge}/{tapLimit}</div>
          </div>
        </div>
      )}
      {activeScreen === 'boost' && (
        <Boost
          onHardWork={handleHardWork}
          onFullCharge={handleFullCharge}
          onMultitapUpgrade={handleMultitapUpgrade}
          onEnergyLimitUpgrade={handleEnergyLimitUpgrade}
          hardWorkAvailable={hardWorkAvailable}
          fullChargeAvailable={fullChargeAvailable}
          multitapUpgradeCost={multitapUpgradeCost}
          energyUpgradeCost={energyUpgradeCost}
          userPoints={balance}
        />
      )}
      {activeScreen === 'stats' && (
        <Stats />
      )}
      {activeScreen === 'Ref' && (
        <Ref />
      )}
      {activeScreen === 'Tasks' && (
        <Task
          frends={frebs}
          balance={balance}
          setBalance={setBalance}
          my_href={my_href}
        />
      )}
      <div className="bottom-bar">
        <button onClick={() => setActiveScreen('Tasks')}>
          <img src={tasksIcon} alt="Tasks" />
        </button>
        <button className="home" onClick={() => setActiveScreen('home')}>
          <img src={homeIcon} alt="Home" />
        </button>
        <button onClick={() => setActiveScreen('stats')}>
          <img src={statsIcon} alt="Stats" />
        </button>
      </div>
    </div>
  );
  
};

export default App;
