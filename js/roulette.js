console.log('Roulette script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - roulette.js');
  const roulette = document.getElementById('roulette');
  const spinButton = document.getElementById('spin');
  const result = document.getElementById('result');
  const optionInput = document.getElementById('option-input');
  const addOptionButton = document.getElementById('add-option');
  const optionsList = document.getElementById('options-list');
  
  let userOptions = [];
  let spinning = false;
  let currentRotation = 0;
  
  // 초기 돌림판 상태 - 빈 상태로 시작
  initEmptyRoulette();
  
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
  
  // 돌리기 버튼 클릭 이벤트
  spinButton.addEventListener('click', function() {
    if (spinning) return;
    
    if (userOptions.length === 0) {
      alert('최소 1개 이상의 옵션을 추가해주세요!');
      return;
    }
    
    spinning = true;
    result.textContent = '';
    
    // 각도 계산 (이전 회전 값에 추가)
    const randomDegrees = Math.floor(Math.random() * 360);
    const extraRotation = 1800; // 추가 회전 (5바퀴)
    const totalRotation = currentRotation + extraRotation + randomDegrees;
    currentRotation = totalRotation % 360; // 360도로 정규화
    
    // 돌림판 회전
    roulette.style.transform = `rotate(${totalRotation}deg)`;
    
    // 결과 계산 및 표시
    setTimeout(() => {
      // 화살표가 가리키는 위치 (0도)에서의 결과 계산
      // 위치 보정: 돌림판이 시계 방향으로 회전하므로 결과는 반시계 방향으로 계산
      const finalAngle = totalRotation % 360; // 최종 회전 각도 (0-360)
      const segmentSize = 360 / userOptions.length;
      
      // 화살표 위치에서 어떤 세그먼트가 선택되었는지 계산
      // 화살표는 위(0도)에 고정되어 있고 돌림판이 시계방향으로 회전함
      let selectedIndex = Math.floor(finalAngle / segmentSize);
      // 인덱스 반전 제거 - 시계 방향 회전에 맞게 인덱스 계산
      selectedIndex = userOptions.length - 1 - selectedIndex;
      if (selectedIndex < 0) selectedIndex += userOptions.length;
      
      result.textContent = `결과: ${userOptions[selectedIndex]}!`;
      spinning = false;
    }, 3000);
  });
  
  // 초기 빈 돌림판 생성
  function initEmptyRoulette() {
    roulette.style.background = '#e0e0e0'; // 회색 배경으로 시작
    spinButton.disabled = true; // 옵션이 없을 때는 버튼 비활성화
    spinButton.style.opacity = '0.5';
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
        
        // 첫 번째 옵션이 추가되면 돌리기 버튼 활성화
        if (userOptions.length === 1) {
          spinButton.disabled = false;
          spinButton.style.opacity = '1';
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
        
        // 모든 옵션이 삭제되면 돌리기 버튼 비활성화
        if (userOptions.length === 0) {
          spinButton.disabled = true;
          spinButton.style.opacity = '0.5';
          initEmptyRoulette();
        }
      };
      
      optionItem.appendChild(optionText);
      optionItem.appendChild(removeButton);
      optionsList.appendChild(optionItem);
    });
    
    // 디버깅용 로그
    console.log('현재 사용자 옵션 목록:', userOptions);
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
      textElement.textContent = option;
      textElement.style.position = 'absolute';
      
      // 각 섹션의 중앙에 텍스트 배치
      const midAngle = startAngle + segmentSize / 2;
      const radialPosition = 120; // 중심에서 텍스트까지의 거리
      
      // 텍스트 방향 설정: 모든 텍스트가 동일한 방향(정방향)으로 표시
      // 원의 중심에서 볼 때 텍스트가 항상 똑바로 보이도록 함
      
      // 텍스트 배치 및 회전 조정
      textElement.style.transform = `
        rotate(${midAngle}deg) 
        translateY(-${radialPosition}px) 
        rotate(${-midAngle}deg)
      `;
      
      roulette.appendChild(textElement);
    });
    
    gradient += ')';
    roulette.style.background = gradient;
  }
}); 