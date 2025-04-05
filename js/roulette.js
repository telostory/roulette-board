console.log('Roulette script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - roulette.js');
  const roulette = document.getElementById('roulette');
  const spinButton = document.getElementById('spin');
  const resetButton = document.getElementById('reset-options');
  const optionInput = document.getElementById('option-input');
  const addOptionButton = document.getElementById('add-option');
  const optionsList = document.getElementById('options-list');
  
  // 결과 모달 관련 요소
  const resultModal = document.getElementById('result-modal');
  const resultText = document.getElementById('result-text');
  const closeModalButton = document.getElementById('close-modal');
  
  let userOptions = [];
  let spinning = false;
  
  // 초기 돌림판 상태 - 비어있는 상태
  roulette.style.background = '#e0e0e0'; // 회색 배경으로 시작
  spinButton.disabled = true; // 옵션이 없을 때는 버튼 비활성화
  spinButton.style.opacity = '0.5';
  resetButton.disabled = true; // 초기화 버튼도 비활성화
  resetButton.style.opacity = '0.5';
  
  // 모달 닫기 버튼 이벤트
  closeModalButton.addEventListener('click', function() {
    resultModal.style.display = 'none';
  });
  
  // 옵션 추가 버튼 클릭 이벤트
  addOptionButton.addEventListener('click', function() {
    addOption();
  });
  
  // 엔터 키로 옵션 추가
  optionInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addOption();
    }
  });
  
  // 초기화 버튼 클릭 이벤트 - 컨펌 제거
  resetButton.addEventListener('click', function() {
    if (spinning) return; // 회전 중에는 초기화 불가
    if (userOptions.length === 0) return; // 이미 비어있으면 아무 작업도 하지 않음
    
    userOptions = [];
    renderOptionsList();
    initEmptyRoulette();
  });
  
  // 돌리기 버튼 클릭 이벤트
  spinButton.addEventListener('click', function() {
    if (spinning) return;
    
    if (userOptions.length === 0) {
      alert('최소 1개 이상의 옵션을 추가해주세요!');
      return;
    }
    
    spinning = true;
    
    // 회전값 초기화 - 매번 새롭게 회전하도록 수정
    // 각도 계산 (고정된 추가 회전 + 랜덤 각도)
    const randomDegrees = Math.floor(Math.random() * 360);
    const extraRotation = 1800; // 추가 회전 (5바퀴)
    const totalRotation = extraRotation + randomDegrees;
    
    // 돌림판 회전 - 가속도 효과 적용
    roulette.style.transition = 'none'; // 기존 트랜지션 제거
    roulette.offsetHeight; // 레이아웃 리플로우 강제
    roulette.style.transform = 'rotate(0deg)'; // 회전 상태를 0으로 초기화
    roulette.offsetHeight; // 다시 한번 레이아웃 리플로우 강제
    
    // 가속도 있는 트랜지션 적용 (처음엔 빠르게, 나중엔 천천히)
    roulette.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.27, 0.99)';
    roulette.style.transform = `rotate(${totalRotation}deg)`;
    
    // 결과 계산 및 표시
    setTimeout(() => {
      // 화살표가 가리키는 위치 (0도)에서의 결과 계산
      const finalAngle = totalRotation % 360; // 최종 회전 각도 (0-360)
      const segmentSize = 360 / userOptions.length;
      
      // 화살표 위치에서 어떤 세그먼트가 선택되었는지 계산
      // 화살표는 위(0도)에 고정되어 있고 돌림판이 시계방향으로 회전함
      let selectedIndex = Math.floor(finalAngle / segmentSize);
      // 인덱스 반전 제거 - 시계 방향 회전에 맞게 인덱스 계산
      selectedIndex = userOptions.length - 1 - selectedIndex;
      if (selectedIndex < 0) selectedIndex += userOptions.length;
      
      // 결과 애니메이션 표시
      showResultWithAnimation(userOptions[selectedIndex]);
      spinning = false;
    }, 4000); // 트랜지션 시간과 맞춰줌
  });
  
  // 결과 애니메이션 표시 함수
  function showResultWithAnimation(selectedOption) {
    // 모달에 결과 표시
    resultText.textContent = selectedOption;
    
    // 0.5초 후에 모달 표시 (회전이 완전히 끝난 후)
    setTimeout(() => {
      resultModal.style.display = 'flex';
      
      // 콘페티 효과 실행
      launchConfetti();
    }, 500);
  }
  
  // 콘페티 효과 함수
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const myConfetti = confetti.create(canvas, { resize: true });
    
    // 콘페티 효과 설정
    myConfetti({
      particleCount: 150,
      spread: 160,
      origin: { y: 0.6 },
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C'],
      disableForReducedMotion: true
    });
    
    // 추가 콘페티 효과 (1초 후)
    setTimeout(() => {
      myConfetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
      });
      
      myConfetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1A535C', '#FF9F1C', '#4ECDC4']
      });
    }, 1000);
  }
  
  // 초기 빈 돌림판 생성
  function initEmptyRoulette() {
    roulette.style.background = '#e0e0e0'; // 회색 배경으로 시작
    roulette.innerHTML = ''; // 모든 텍스트 제거
    spinButton.disabled = true; // 옵션이 없을 때는 버튼 비활성화
    spinButton.style.opacity = '0.5';
    resetButton.disabled = true; // 초기화 버튼도 비활성화
    resetButton.style.opacity = '0.5';
  }
  
  // 옵션 추가 함수
  function addOption() {
    const optionText = optionInput.value.trim();
    
    if (optionText && userOptions.length < 10) {
      if (!userOptions.includes(optionText)) {
        userOptions.push(optionText);
        renderOptionsList();
        updateRoulette(); // 옵션 추가 시 즉시 돌림판 업데이트
        optionInput.value = '';
        
        // 첫 번째 옵션이 추가되면 버튼들 활성화
        if (userOptions.length === 1) {
          spinButton.disabled = false;
          spinButton.style.opacity = '1';
          resetButton.disabled = false;
          resetButton.style.opacity = '1';
        }
      } else {
        alert('이미 동일한 옵션이 있습니다!');
      }
    } else if (userOptions.length >= 10) {
      alert('최대 10개까지만 추가할 수 있습니다!');
    } else {
      alert('옵션을 입력해주세요!');
    }
    
    optionInput.focus();
  }
  
  // 옵션 목록 렌더링 함수
  function renderOptionsList() {
    optionsList.innerHTML = '';
    
    userOptions.forEach((option, index) => {
      const optionItem = document.createElement('div');
      optionItem.className = 'option-item';
      
      const optionText = document.createElement('span');
      optionText.textContent = option;
      
      const removeButton = document.createElement('button');
      removeButton.className = 'remove-btn';
      removeButton.textContent = '삭제';
      removeButton.onclick = function() {
        userOptions.splice(index, 1);
        renderOptionsList();
        updateRoulette(); // 옵션 삭제 시 즉시 돌림판 업데이트
        
        // 모든 옵션이 삭제되면 버튼들 비활성화
        if (userOptions.length === 0) {
          spinButton.disabled = true;
          spinButton.style.opacity = '0.5';
          resetButton.disabled = true;
          resetButton.style.opacity = '0.5';
          initEmptyRoulette();
        }
      };
      
      optionItem.appendChild(optionText);
      optionItem.appendChild(removeButton);
      optionsList.appendChild(optionItem);
    });
  }
  
  // 돌림판 업데이트 함수
  function updateRoulette() {
    if (userOptions.length === 0) {
      initEmptyRoulette();
      return;
    }
    
    // 돌림판의 배경 그라데이션 설정
    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C', 
      '#6A0572', '#AB83A1', '#F15BB5', '#00BBF9', '#00F5D4'
    ];
    
    // 기존 텍스트 요소 제거
    const existingTexts = roulette.querySelectorAll('.section-text');
    existingTexts.forEach(text => text.remove());
    
    // conic-gradient 생성
    let gradient = 'conic-gradient(';
    const segmentSize = 360 / userOptions.length;
    
    userOptions.forEach((option, index) => {
      const startAngle = index * segmentSize;
      const endAngle = (index + 1) * segmentSize;
      const color = colors[index % colors.length];
      
      gradient += `${color} ${startAngle}deg ${endAngle}deg`;
      if (index < userOptions.length - 1) {
        gradient += ', ';
      }
      
      // 텍스트 요소 추가
      const textElement = document.createElement('div');
      textElement.className = 'section-text';
      
      // 텍스트가 긴 경우 줄바꿈 처리
      const shortOption = shortenText(option);
      textElement.innerHTML = shortOption;
      textElement.style.position = 'absolute';
      
      // 각 섹션의 중앙에 텍스트 배치
      const midAngle = startAngle + segmentSize / 2;
      const radialPosition = 90; // 중심에서 텍스트까지의 거리 (120에서 90으로 수정)
      
      // 이미지와 같이 텍스트를 단순히 세로로 표시
      // 섹션 위치로 회전 후 텍스트만 90도 회전
      
      // 텍스트 배치 및 회전 조정 - 세로로 90도 회전
      textElement.style.transform = `
        rotate(${midAngle}deg) 
        translateY(-${radialPosition}px) 
        rotate(90deg)
      `;
      
      roulette.appendChild(textElement);
    });
    
    gradient += ')';
    roulette.style.background = gradient;
    
    // 트랜지션 재설정
    roulette.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.27, 0.99)';
  }
  
  // 텍스트 길이 처리 함수
  function shortenText(text) {
    if (text.length <= 7) {
      return text; // 짧은 텍스트는 그대로 반환
    } else if (text.length <= 14) {
      // 중간 길이 텍스트는 중간에 줄바꿈 추가
      const middleIndex = Math.floor(text.length / 2);
      return text.substring(0, middleIndex) + '<br>' + text.substring(middleIndex);
    } else {
      // 긴 텍스트는 처음 13자만 표시하고 말줄임표 추가
      return text.substring(0, 6) + '<br>' + text.substring(6, 13) + '...';
    }
  }
}); 