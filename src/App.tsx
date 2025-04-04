import React, { useState } from 'react'
import styled from '@emotion/styled'
import Roulette from './components/Roulette'

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #FFF0F3, #FFE5EC);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  color: #FF8BA7;
  text-shadow: 2px 2px 4px rgba(255, 139, 167, 0.2);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContentContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(255, 139, 167, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #FFD1DA;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  color: #FF8BA7;

  &:focus {
    outline: none;
    border-color: #FF8BA7;
    box-shadow: 0 0 0 3px rgba(255, 139, 167, 0.1);
  }

  &::placeholder {
    color: #FFD1DA;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background: ${props => 
    props.variant === 'secondary' 
    ? '#FF8BA7'
    : '#40C4AA'
  };
  color: white;
  box-shadow: ${props =>
    props.variant === 'secondary'
    ? '0 4px 12px rgba(255, 139, 167, 0.2)'
    : '0 4px 12px rgba(64, 196, 170, 0.2)'
  };

  &:hover {
    transform: translateY(-2px);
    background: ${props =>
      props.variant === 'secondary'
      ? '#FFA5BC'
      : '#4CD6BA'
    };
    box-shadow: ${props =>
      props.variant === 'secondary'
      ? '0 6px 16px rgba(255, 139, 167, 0.3)'
      : '0 6px 16px rgba(64, 196, 170, 0.3)'
    };
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

function App() {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

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

  return (
    <Container>
      <Title>돌려돌려 돌림판</Title>
      <Roulette options={options} />
      <ContentContainer>
        <InputContainer>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="옵션을 입력하세요 (쉼표로 구분)"
          />
          <ButtonContainer>
            <Button onClick={handleAddOption}>추가</Button>
            <Button variant="secondary" onClick={handleReset}>초기화</Button>
          </ButtonContainer>
        </InputContainer>
        <OptionList>
          {options.map((option, index) => (
            <OptionItem key={index}>
              <OptionText>{option}</OptionText>
              <DeleteButton onClick={() => handleDeleteOption(index)}>×</DeleteButton>
            </OptionItem>
          ))}
        </OptionList>
      </ContentContainer>
    </Container>
  )
}

export default App
