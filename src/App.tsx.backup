import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import Roulette from './components/Roulette'
import { FiShare2, FiDownload, FiX, FiCopy, FiMoon, FiSun } from 'react-icons/fi'

interface ThemeProps {
  isDarkMode: boolean;
}

const Container = styled.div<ThemeProps>`
  min-height: 100vh;
  padding: 2rem;
  background: ${({isDarkMode}) => isDarkMode 
    ? 'linear-gradient(135deg, #1A1A2E, #16213E)' 
    : 'linear-gradient(135deg, #FFF0F3, #FFE5EC)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  color: ${({isDarkMode}) => isDarkMode ? '#E1E1E6' : 'inherit'};
  transition: background 0.3s ease;
`;

const Title = styled.h1<ThemeProps>`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  color: ${({isDarkMode}) => isDarkMode ? '#8BBCCC' : '#FF8BA7'};
  text-shadow: ${({isDarkMode}) => isDarkMode 
    ? '2px 2px 4px rgba(139, 188, 204, 0.2)' 
    : '2px 2px 4px rgba(255, 139, 167, 0.2)'};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContentContainer = styled.div<ThemeProps>`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputContainer = styled.div<ThemeProps>`
  width: 100%;
  padding: 1.5rem;
  background: ${({isDarkMode}) => isDarkMode 
    ? 'rgba(30, 41, 59, 0.9)' 
    : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 20px;
  box-shadow: ${({isDarkMode}) => isDarkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
    : '0 8px 32px rgba(255, 139, 167, 0.1)'};
  transition: all 0.3s ease;
`;

const Input = styled.input<ThemeProps>`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({isDarkMode}) => isDarkMode ? '#4A5568' : '#FFD1DA'};
  border-radius: 12px;
  font-size: 1rem;
  background: ${({isDarkMode}) => isDarkMode ? '#2D3748' : 'white'};
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  color: ${({isDarkMode}) => isDarkMode ? '#E2E8F0' : '#FF8BA7'};

  &:focus {
    outline: none;
    border-color: ${({isDarkMode}) => isDarkMode ? '#8BBCCC' : '#FF8BA7'};
    box-shadow: ${({isDarkMode}) => isDarkMode 
      ? '0 0 0 3px rgba(139, 188, 204, 0.1)' 
      : '0 0 0 3px rgba(255, 139, 167, 0.1)'};
  }

  &::placeholder {
    color: ${({isDarkMode}) => isDarkMode ? '#718096' : '#FFD1DA'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  isDarkMode: boolean;
}

const Button = styled.button<ButtonProps>`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background: ${props => {
    if (props.isDarkMode) {
      return props.variant === 'secondary' ? '#4A5568' : '#4299E1';
    }
    return props.variant === 'secondary' ? '#FF8BA7' : '#40C4AA';
  }};
  color: white;
  box-shadow: ${props => {
    if (props.isDarkMode) {
      return props.variant === 'secondary' 
        ? '0 4px 12px rgba(74, 85, 104, 0.3)' 
        : '0 4px 12px rgba(66, 153, 225, 0.3)';
    }
    return props.variant === 'secondary'
      ? '0 4px 12px rgba(255, 139, 167, 0.2)'
      : '0 4px 12px rgba(64, 196, 170, 0.2)';
  }};

  &:hover {
    transform: translateY(-2px);
    background: ${props => {
      if (props.isDarkMode) {
        return props.variant === 'secondary' ? '#718096' : '#63B3ED';
      }
      return props.variant === 'secondary' ? '#FFA5BC' : '#4CD6BA';
    }};
    box-shadow: ${props => {
      if (props.isDarkMode) {
        return props.variant === 'secondary' 
          ? '0 6px 16px rgba(74, 85, 104, 0.4)' 
          : '0 6px 16px rgba(66, 153, 225, 0.4)';
      }
      return props.variant === 'secondary'
        ? '0 6px 16px rgba(255, 139, 167, 0.3)'
        : '0 6px 16px rgba(64, 196, 170, 0.3)';
    }};
  }

  &:active {
    transform: translateY(0);
  }
`;

const OptionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 139, 167, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 6px 16px rgba(255, 139, 167, 0.15);
  }
`;

const OptionText = styled.span`
  font-size: 1rem;
  color: #FF8BA7;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #FFB3C6;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    color: #FF8BA7;
    transform: scale(1.2) rotate(90deg);
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: #FF8BA7;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(255, 139, 167, 0.2);

  &:hover {
    background: #FFA5BC;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 139, 167, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ShareModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ShareModal = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const ShareModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ShareModalTitle = styled.h3`
  font-size: 1.5rem;
  color: #FF8BA7;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: #FF8BA7;
    transform: rotate(90deg);
  }
`;

const ShareOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ShareOption = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: #FFF0F3;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #FFE5EC;
    transform: translateY(-3px);
  }
`;

const ShareIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  color: #FF8BA7;
  font-size: 1.5rem;
  box-shadow: 0 4px 10px rgba(255, 139, 167, 0.15);
`;

const ShareOptionText = styled.span`
  color: #FF8BA7;
  font-weight: 600;
`;

const UrlInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #FFD1DA;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #FF8BA7;
  }
`;

const ThemeToggleButton = styled.button<ThemeProps>`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({isDarkMode}) => isDarkMode ? '#2D3748' : 'white'};
  color: ${({isDarkMode}) => isDarkMode ? '#8BBCCC' : '#FF8BA7'};
  border: none;
  box-shadow: 0 2px 10px ${({isDarkMode}) => isDarkMode 
    ? 'rgba(0, 0, 0, 0.2)' 
    : 'rgba(255, 139, 167, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    transform: rotate(30deg);
  }
`;

function App() {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const urlInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === null) {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
      localStorage.setItem('theme', prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const loadOptionsFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const optionsParam = urlParams.get('options');
      
      if (optionsParam) {
        try {
          const decodedOptions = decodeURIComponent(optionsParam).split(',');
          setOptions(decodedOptions.filter(option => option.trim() !== ''));
        } catch (error) {
          console.error('URL 파라미터 파싱 오류:', error);
        }
      }
    };
    
    loadOptionsFromURL();
  }, []);

  const handleAddOption = () => {
    if (inputValue.trim() !== '') {
      const newOptions = inputValue
        .split(',')
        .map(option => option.trim())
        .filter(option => option !== '');
      
      setOptions([...options, ...newOptions]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddOption();
    }
  };

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setOptions([]);
    setInputValue('');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const handleCopyLink = () => {
    if (urlInputRef.current) {
      urlInputRef.current.select();
      document.execCommand('copy');
      alert('링크가 복사되었습니다!');
    }
  };

  const handleDownloadImage = () => {
    alert('이미지 다운로드 기능은 곧 추가될 예정입니다!');
  };

  const generateShareURL = () => {
    if (options.length > 0) {
      const baseUrl = window.location.origin + window.location.pathname;
      const encodedOptions = encodeURIComponent(options.join(','));
      return `${baseUrl}?options=${encodedOptions}`;
    }
    return window.location.href;
  };

  const handleResultUpdate = (result: string) => {
    console.log('결과:', result);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <ThemeToggleButton 
        onClick={toggleTheme} 
        isDarkMode={isDarkMode}
        aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
      >
        {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </ThemeToggleButton>
      
      <Title isDarkMode={isDarkMode}>행운의 룰렛</Title>
      <Roulette options={options} onResultUpdate={handleResultUpdate} isDarkMode={isDarkMode} />
      
      <ContentContainer isDarkMode={isDarkMode}>
        <InputContainer isDarkMode={isDarkMode}>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="옵션을 입력하세요 (쉼표로 구분)"
            isDarkMode={isDarkMode}
          />
          <ButtonContainer>
            <Button onClick={handleAddOption} isDarkMode={isDarkMode}>추가</Button>
            <Button variant="secondary" onClick={handleReset} isDarkMode={isDarkMode}>초기화</Button>
          </ButtonContainer>
        </InputContainer>
        
        {options.length > 0 && (
          <ShareButton onClick={handleShare}>
            <FiShare2 />
            공유하기
          </ShareButton>
        )}
        
        <OptionList>
          {options.map((option, index) => (
            <OptionItem key={index}>
              <OptionText>{option}</OptionText>
              <DeleteButton onClick={() => handleDeleteOption(index)}>×</DeleteButton>
            </OptionItem>
          ))}
        </OptionList>
      </ContentContainer>

      {showShareModal && (
        <ShareModalOverlay>
          <ShareModal>
            <ShareModalHeader>
              <ShareModalTitle>룰렛 공유하기</ShareModalTitle>
              <CloseButton onClick={handleCloseShareModal}>
                <FiX />
              </CloseButton>
            </ShareModalHeader>
            
            <ShareOptions>
              <ShareOption onClick={handleCopyLink}>
                <ShareIconWrapper>
                  <FiCopy />
                </ShareIconWrapper>
                <ShareOptionText>링크 복사</ShareOptionText>
              </ShareOption>
              
              <ShareOption onClick={handleDownloadImage}>
                <ShareIconWrapper>
                  <FiDownload />
                </ShareIconWrapper>
                <ShareOptionText>이미지 저장</ShareOptionText>
              </ShareOption>
            </ShareOptions>
            
            <UrlInput
              ref={urlInputRef}
              value={generateShareURL()}
              readOnly
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
          </ShareModal>
        </ShareModalOverlay>
      )}
    </Container>
  )
}

export default App
