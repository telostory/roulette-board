import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface RouletteProps {
  options: string[];
}

const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  background: linear-gradient(135deg, #FFF0F3, #FFE5EC);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(255, 139, 167, 0.1);
`;

const WheelContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 20px 0;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
`;

const Wheel = styled(motion.div)<{ gradient: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 12px solid #FF8BA7;
  background: ${props => props.gradient};
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
`;

const SectionText = styled.div<{ rotate: number; distance: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: rotate(${props => props.rotate}deg) translateY(-${props => props.distance}px);
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  width: 50px;
  margin-left: -25px;
  margin-top: -10px;
  overflow-wrap: break-word;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
  z-index: 2;
`;

const Pointer = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: #40C4AA;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    right: 2px;
    bottom: 1px;
    background: #4CD6BA;
    clip-path: polygon(50% 98%, 2px 2px, calc(100% - 2px) 2px);
    z-index: 2;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 
      0 4px 8px rgba(64, 196, 170, 0.3),
      0 -2px 4px rgba(255, 255, 255, 0.4) inset,
      0 2px 4px rgba(0, 0, 0, 0.2) inset;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
    z-index: 3;
  }
`;

const Button = styled.button`
  padding: 12px 32px;
  margin: 10px 0;
  background: #40C4AA;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(64, 196, 170, 0.3);

  &:hover {
    background: #4CD6BA;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(64, 196, 170, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #E0E0E0, #CCCCCC);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const colors = [
  '#FFB3C6',  // 연한 핑크
  '#FF8BA7',  // 진한 핑크
  '#40C4AA',  // 민트
  '#4CD6BA',  // 밝은 민트
  '#FFD1DA',  // 아주 연한 핑크
  '#FFA5BC',  // 중간 핑크
  '#33B79B',  // 어두운 민트
  '#FFE5EC',  // 파스텔 핑크
  '#59E0C5',  // 밝은 청록
  '#FF97B7'   // 선명한 핑크
];

const Roulette: React.FC<RouletteProps> = ({ options }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (isSpinning || options.length === 0) return;
    
    setIsSpinning(true);
    const newRotation = rotation + 1800 + Math.random() * 360;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  const sectionAngle = 360 / Math.max(options.length, 1);
  
  const getConicGradient = () => {
    if (options.length === 0) return '#fff';
    
    const gradientStops = options.map((_, index) => {
      const color = colors[index % colors.length];
      const start = (index * sectionAngle);
      const end = ((index + 1) * sectionAngle);
      return `${color} ${start}deg ${end}deg`;
    });
    
    return `conic-gradient(${gradientStops.join(', ')})`;
  };

  return (
    <RouletteContainer>
      <WheelContainer>
        <Pointer />
        <Wheel
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: "easeOut" }}
          gradient={getConicGradient()}
        >
          {options.map((option, index) => {
            const textRotate = index * sectionAngle + sectionAngle / 2;
            const distance = 100; // 텍스트 위치를 중심에서 100px 떨어진 곳으로 설정
            
            return (
              <SectionText 
                key={index} 
                rotate={textRotate} 
                distance={distance}
              >
                {option}
              </SectionText>
            );
          })}
        </Wheel>
      </WheelContainer>
      <Button 
        onClick={spinWheel} 
        disabled={isSpinning || options.length === 0}
      >
        {isSpinning ? '돌리는 중...' : options.length === 0 ? '옵션을 추가하세요' : '돌리기'}
      </Button>
    </RouletteContainer>
  );
};

export default Roulette; 