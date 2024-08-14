import React from 'react';
import './Boost.scss';

interface BoostProps {
  onHardWork: () => void;
  onFullCharge: () => void;
  onMultitapUpgrade: () => void;
  onEnergyLimitUpgrade: () => void;
  hardWorkAvailable: boolean;
  fullChargeAvailable: number;
  tapValue: number;
  multitapUpgradeCost: number;
  energyUpgradeCost: number;
  tapLimit: number;
  userPoints: number;
}

const Boost: React.FC<BoostProps> = ({
  onHardWork,
  onFullCharge,
  onMultitapUpgrade,
  onEnergyLimitUpgrade,
  hardWorkAvailable,
  fullChargeAvailable,
  tapValue,
  multitapUpgradeCost,
  energyUpgradeCost,
  tapLimit,
  userPoints
}) => {
  const options = [
    { title: 'Hard Work', desc: hardWorkAvailable ? 'Available' : 'Unavailable (24h cooldown)', action: onHardWork },
    { title: 'Full Charge', desc: fullChargeAvailable > 0 ? `Available (${fullChargeAvailable} left)` : 'Unavailable', action: onFullCharge },
    { title: 'Upgrade Tap', desc: `Cost: ${multitapUpgradeCost} (Current: +${tapValue} per tap)`, action: onMultitapUpgrade },
    { title: 'Increase Energy', desc: `Cost: ${energyUpgradeCost} (Current: ${tapLimit})`, action: onEnergyLimitUpgrade },
    { title: 'Your Points', desc: userPoints.toLocaleString() },
    { title: 'Placeholder', desc: 'Feature coming soon' }
  ];

  return (
    <div className="boost-container">
      <div className="boost-ring">
        {options.map((option, index) => (
          <div
            className="boost-segment"
            key={index}
            style={{ transform: `rotate(${index * 60}deg)` }}
            onClick={option.action}
          >
            <div className="boost-content" style={{ transform: `rotate(-${index * 60}deg)` }}>
              <div className="boost-title">{option.title}</div>
              <div className="boost-desc">{option.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boost;
