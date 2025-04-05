import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

interface RouletteProps {
  options: string[];
  onResultUpdate?: (result: string) => void;
  isDarkMode?: boolean;
}

interface ThemeProps {
  isDarkMode?: boolean;
}

const RouletteContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  background: ${({isDarkMode}) => isDarkMode 
    ? 'linear-gradient(135deg, #1A1A2E, #16213E)' 
    : 'linear-gradient(135deg, #FFF0F3, #FFE5EC)'};
  border-radius: 20px;
  box-shadow: ${({isDarkMode}) => isDarkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
    : '0 8px 32px rgba(255, 139, 167, 0.1)'};
  transition: all 0.3s ease;
`;

const WheelContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 20px 0;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
`;

const Wheel = styled(motion.div)<{ gradient: string; isDarkMode?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: ${({isDarkMode}) => isDarkMode ? '12px solid #4299E1' : '12px solid #FF8BA7'};
  background: ${props => props.gradient};
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
  transition: border-color 0.3s ease;
`;

const SectionText = styled.div<{ rotate: number; distance: number; isDarkMode?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: rotate(${props => props.rotate}deg) translateY(-${props => props.distance}px);
  color: ${({isDarkMode}) => isDarkMode ? '#E2E8F0' : 'white'};
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

const Pointer = styled.div<ThemeProps>`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: ${({isDarkMode}) => isDarkMode ? '#4299E1' : '#40C4AA'};
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  z-index: 1;
  transition: background 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    right: 2px;
    bottom: 1px;
    background: ${({isDarkMode}) => isDarkMode ? '#63B3ED' : '#4CD6BA'};
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
      ${({isDarkMode}) => isDarkMode 
        ? '0 4px 8px rgba(66, 153, 225, 0.3), 0 -2px 4px rgba(255, 255, 255, 0.4) inset, 0 2px 4px rgba(0, 0, 0, 0.2) inset' 
        : '0 4px 8px rgba(64, 196, 170, 0.3), 0 -2px 4px rgba(255, 255, 255, 0.4) inset, 0 2px 4px rgba(0, 0, 0, 0.2) inset'};
    clip-path: polygon(50% 100%, 0 0, 100% 0);
    z-index: 3;
  }
`;

const Button = styled.button<ThemeProps>`
  padding: 12px 32px;
  margin: 10px 0;
  background: ${({isDarkMode}) => isDarkMode ? '#4299E1' : '#40C4AA'};
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: ${({isDarkMode}) => isDarkMode 
    ? '0 4px 15px rgba(66, 153, 225, 0.3)' 
    : '0 4px 15px rgba(64, 196, 170, 0.3)'};

  &:hover {
    background: ${({isDarkMode}) => isDarkMode ? '#63B3ED' : '#4CD6BA'};
    transform: translateY(-2px);
    box-shadow: ${({isDarkMode}) => isDarkMode 
      ? '0 6px 20px rgba(66, 153, 225, 0.4)' 
      : '0 6px 20px rgba(64, 196, 170, 0.4)'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({isDarkMode}) => isDarkMode 
      ? 'linear-gradient(135deg, #2D3748, #4A5568)' 
      : 'linear-gradient(135deg, #E0E0E0, #CCCCCC)'};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultContainer = styled(motion.div)<ThemeProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({isDarkMode}) => isDarkMode ? '#2D3748' : 'white'};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 100;
`;

const ResultOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
`;

const ResultTitle = styled.h2<ThemeProps>`
  font-size: 1.8rem;
  color: ${({isDarkMode}) => isDarkMode ? '#E2E8F0' : '#FF8BA7'};
  margin-bottom: 1rem;
`;

const ResultContent = styled.div<ThemeProps>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({isDarkMode}) => isDarkMode ? '#E2E8F0' : '#40C4AA'};
  margin-bottom: 2rem;
`;

const ResultButton = styled.button<ThemeProps>`
  padding: 0.8rem 2rem;
  background: ${({isDarkMode}) => isDarkMode ? '#63B3ED' : '#FF8BA7'};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({isDarkMode}) => isDarkMode ? '#90CDF4' : '#FFA5BC'};
    transform: translateY(-2px);
  }
`;

const resultColors = [
  // 라이트 모드 색상
  [
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
  ],
  // 다크 모드 색상
  [
    '#4299E1',  // 파랑
    '#63B3ED',  // 연한 파랑
    '#3182CE',  // 진한 파랑
    '#2B6CB0',  // 더 진한 파랑
    '#2D3748',  // 어두운 회색
    '#4A5568',  // 연한 회색
    '#1A365D',  // 진한 네이비
    '#EBF8FF',  // 아주 연한 파랑
    '#90CDF4',  // 연한 하늘색
    '#BEE3F8'   // 파스텔 파랑
  ]
];

const Roulette: React.FC<RouletteProps> = ({ options, onResultUpdate, isDarkMode = false }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const resultSoundRef = useRef<HTMLAudioElement | null>(null);
  const buttonSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 사운드 효과 초기화
    spinSoundRef.current = new Audio('./sounds/spin.mp3');
    resultSoundRef.current = new Audio('./sounds/result.mp3');
    buttonSoundRef.current = new Audio('./sounds/button-click.mp3');
    
    // 사운드 효과 볼륨 설정
    if (spinSoundRef.current) spinSoundRef.current.volume = 0.5;
    if (resultSoundRef.current) resultSoundRef.current.volume = 0.7;
    if (buttonSoundRef.current) buttonSoundRef.current.volume = 0.3;
    
    return () => {
      // 컴포넌트 언마운트 시 사운드 리소스 정리
      if (spinSoundRef.current) {
        spinSoundRef.current.pause();
        spinSoundRef.current = null;
      }
      if (resultSoundRef.current) {
        resultSoundRef.current.pause();
        resultSoundRef.current = null;
      }
      if (buttonSoundRef.current) {
        buttonSoundRef.current.pause();
        buttonSoundRef.current = null;
      }
    };
  }, []);

  const playSound = (soundRef: React.RefObject<HTMLAudioElement | null>) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(err => console.error('오디오 재생 에러:', err));
    }
  };

  const spinWheel = () => {
    if (isSpinning || options.length === 0) return;
    
    setIsSpinning(true);
    // 이전 결과 초기화
    setResult(null);
    setShowResult(false);
    
    // 스핀 사운드 재생
    playSound(spinSoundRef);
    
    const newRotation = rotation + 1800 + Math.random() * 360;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      // 결과 사운드 재생
      playSound(resultSoundRef);
      
      // 결과 계산
      const normalizedRotation = newRotation % 360;
      const sectionAngle = 360 / options.length;
      // 포인터는 상단에 있으므로 0도는 첫 번째 섹션의 중간을 가리킴
      // 섹션의 시작점은 (index * sectionAngle - sectionAngle/2) 이고, 끝점은 ((index+1) * sectionAngle - sectionAngle/2)
      const normalizedDegree = (360 - normalizedRotation) % 360; // 시계 방향으로 회전하므로 360에서 빼줌
      const sectionIndex = Math.floor(normalizedDegree / sectionAngle);
      
      const finalResult = options[sectionIndex % options.length];
      setResult(finalResult);
      setShowResult(true);
      
      // 부모 컴포넌트에 결과 알림
      if (onResultUpdate) {
        onResultUpdate(finalResult);
      }
    }, 5000);
  };

  const closeResult = () => {
    // 버튼 클릭 사운드 재생
    playSound(buttonSoundRef);
    setShowResult(false);
  };

  useEffect(() => {
    if (showResult) {
      // 결과 표시 시 스크롤 비활성화
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showResult]);

  const sectionAngle = 360 / Math.max(options.length, 1);
  
  const getConicGradient = () => {
    if (options.length === 0) return isDarkMode ? '#2D3748' : '#fff';
    
    const colors = resultColors[isDarkMode ? 1 : 0];
    const gradientStops = options.map((_, index) => {
      const color = colors[index % colors.length];
      const start = (index * sectionAngle);
      const end = ((index + 1) * sectionAngle);
      return `${color} ${start}deg ${end}deg`;
    });
    
    return `conic-gradient(${gradientStops.join(', ')})`;
  };

  return (
    <RouletteContainer isDarkMode={isDarkMode}>
      <WheelContainer>
        <Pointer isDarkMode={isDarkMode} />
        <Wheel
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: "easeOut" }}
          gradient={getConicGradient()}
          isDarkMode={isDarkMode}
        >
          {options.map((option, index) => {
            const textRotate = index * sectionAngle + sectionAngle / 2;
            const distance = 100;
            
            return (
              <SectionText 
                key={index} 
                rotate={textRotate} 
                distance={distance}
                isDarkMode={isDarkMode}
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
        isDarkMode={isDarkMode}
      >
        {isSpinning ? '돌리는 중...' : options.length === 0 ? '옵션을 추가하세요' : '돌리기'}
      </Button>
      
      <AnimatePresence>
        {showResult && result && (
          <>
            <ResultOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeResult}
            />
            <ResultContainer
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              isDarkMode={isDarkMode}
            >
              <ResultTitle isDarkMode={isDarkMode}>결과 발표!</ResultTitle>
              <ResultContent isDarkMode={isDarkMode}>{result}</ResultContent>
              <ResultButton onClick={closeResult} isDarkMode={isDarkMode}>확인</ResultButton>
            </ResultContainer>
          </>
        )}
      </AnimatePresence>
    </RouletteContainer>
  );
};

export default Roulette; 