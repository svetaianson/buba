import React from 'react';
import './BoostCircle.scss';
import circl from './assets/wh.png';
import que from './assets/_.png';
interface BoostCircleProps {
  onHardWork: () => void;
  onFullCharge: () => void;
  onMultitapUpgrade: () => void;
  onEnergyLimitUpgrade: () => void;
  hardWorkAvailable: boolean;
  fullChargeAvailable: number;
  multitapUpgradeCost: number;
  energyUpgradeCost: number;
  userPoints: number;
}

const BoostCircle: React.FC<BoostCircleProps> = ({
  onHardWork,
  onFullCharge,
  onMultitapUpgrade,
  onEnergyLimitUpgrade,
  hardWorkAvailable,
  fullChargeAvailable,
  multitapUpgradeCost,
  energyUpgradeCost,
  userPoints
}) => {
  function formatTextToNewLines(text: string): string {
    return text.split(" ").join("\n");
  }
  const segments = [
    { id: 1, title: 'ENERGY LIMIT', action: onEnergyLimitUpgrade },
    { id: 2, title: '?', action: ()=>{}},
    { id: 3, title: '?', action: ()=>{} },
    { id: 4, title: 'FULL CHARGE', action:  onFullCharge },
    { id: 5, title: 'HARW WORK', action: onHardWork },
    { id: 6, title: 'MULTITAP', action: onMultitapUpgrade },
  ];
  const angles = [60, 60, 60, 60, 60, 60];
 return (
    <div className="boost-circle-container">
        <div className='balanse'>{userPoints.toLocaleString()}</div>
        <svg className="boost-circle" viewBox="0 0 100 100">
            <defs>
                <pattern id="circle-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                    <image className='syrcl' href={circl} x="0" y="0" width="100" height="100" />
                </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#circle-pattern)" />

            {segments.map((segment, index) => {
                const segmentAngle = angles[index] * (Math.PI / 180); // Конвертируем угол из градусов в радианы
                const rotationOffset = 30 * (Math.PI / 180); 
                const startAngle = (index === 0 ? 0 : angles.slice(0, index).reduce((acc, val) => acc + val, 0)) * (Math.PI / 180) + rotationOffset;
                const endAngle = startAngle + segmentAngle;
                
                const x1 = 50 + 45 * Math.cos(startAngle);
                const y1 = 50 + 45 * Math.sin(startAngle);
                const x2 = 50 + 45 * Math.cos(endAngle);
                const y2 = 50 + 45 * Math.sin(endAngle);

                const pathData = `M50 50 L${x1} ${y1} A45 45 0 0 1 ${x2} ${y2} Z`;

                // Определяем положение текста ближе к окружности
                const textX = 50 + 35 * Math.cos((startAngle + endAngle) / 2);
                const textY = 50 + 35 * Math.sin((startAngle + endAngle) / 2);
                const renderText = (title: string) => {
                    const words = title.split(" ");
                    return words.map((word, i) => (
                      <tspan key={i} x={textX} dy={i === 0 ? 0 : "5px"}>
                        {word}
                      </tspan>
                    ));
                };
                return (
                    <g
                        key={segment.id}
                        className="boost-segment"
                        onClick={segment.action}
                    >
                        <path
                            d={pathData}
                            fill="transparent"
                            stroke="rgba(255, 255, 255, 0)"
                            strokeWidth="0.5"
                        />
                        <text
                            x={textX}
                            y={textY}
                            textAnchor="middle"
                            fontSize="4.2"
                            fill="white" // Цвет текста
                            className='tox'
                        >
                            {renderText(segment.title)}
                        </text>
                    </g>
                );
            })}
        </svg>
    </div>
);
};

export default BoostCircle;
