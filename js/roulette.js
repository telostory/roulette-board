console.log('Roulette script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - roulette.js');
  const roulette = document.getElementById('roulette');
  const spinButton = document.getElementById('spin');
  const result = document.getElementById('result');
  const optionInput = document.getElementById('option-input');
  const addOptionButton = document.getElementById('add-option');
  const optionsList = document.getElementById('options-list');
  const applyOptionsButton = document.getElementById('apply-options');
  
  // 기본 옵션들 (사용자가 옵션을 추가하지 않은 경우 사용)
  const defaultOptions = ['빨강', '청록', '노랑', '남색', '주황'];
  let userOptions = [];
  let spinning = false;
  let currentRotation = 0;
  let activeOptions = defaultOptions; // 현재 활성화된 옵션들
  
  // 초기에 기본 옵션으로 돌림판 생성
  createRouletteWithOptions(defaultOptions);
  
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
  
  // 옵션 적용 버튼 클릭 이벤트
  applyOptionsButton.addEventListener('click', function() {
    if (userOptions.length > 0) {
      activeOptions = [...userOptions]; // 활성 옵션 업데이트
      createRouletteWithOptions(userOptions);
      console.log('사용자 옵션 적용됨:', userOptions);
    } else {
      alert('최소 1개 이상의 옵션을 추가해주세요!');
    }
  });
  
  // 돌리기 버튼 클릭 이벤트
  spinButton.addEventListener('click', function() {
    if (spinning) return;
    spinning = true;
    result.textContent = '';
    
    // 사용할 옵션 배열
    const options = activeOptions;
    console.log('돌림판 회전 시 사용 옵션:', options);
    
    // 각도 계산 (이전 회전 값에 추가)
    const randomDegrees = Math.floor(Math.random() * 360);
    const extraRotation = 1800; // 추가 회전 (5바퀴)
    const totalRotation = currentRotation + extraRotation + randomDegrees;
    currentRotation = totalRotation;
    
    // 돌림판 회전
    roulette.style.transform = `rotate(${totalRotation}deg)`;
    
    // 결과 계산 및 표시
    setTimeout(() => {
      const normalizedDegrees = randomDegrees;
      const segmentSize = 360 / options.length;
      let selectedIndex = Math.floor((360 - normalizedDegrees) / segmentSize);
      if (selectedIndex >= options.length) selectedIndex = 0;
      
      result.textContent = `결과: ${options[selectedIndex]}!`;
      spinning = false;
    }, 3000);
  });
  
  // 옵션 추가 함수
  function addOption() {
    const optionText = optionInput.value.trim();
    
    if (optionText && userOptions.length < 10) {
      if (!userOptions.includes(optionText)) {
        userOptions.push(optionText);
        renderOptionsList();
        optionInput.value = '';
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
      };
      
      optionItem.appendChild(optionText);
      optionItem.appendChild(removeButton);
      optionsList.appendChild(optionItem);
    });
    
    // 디버깅용 로그
    console.log('현재 사용자 옵션 목록:', userOptions);
  }
  
  // 옵션에 따라 돌림판 생성 함수
  function createRouletteWithOptions(options) {
    console.log('돌림판 생성 시작. 옵션:', options);
    
    // 돌림판의 배경 그라데이션 설정
    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C', 
      '#6A0572', '#AB83A1', '#F15BB5', '#00BBF9', '#00F5D4'
    ];
    
    // 기존 텍스트 요소 제거
    const existingTexts = roulette.querySelectorAll('.section-text');
    existingTexts.forEach(text => text.remove());
    console.log('기존 텍스트 요소 제거됨');
    
    // conic-gradient 생성
    let gradient = 'conic-gradient(';
    const segmentSize = 360 / options.length;
    
    options.forEach((option, index) => {
      const startAngle = index * segmentSize;
      const endAngle = (index + 1) * segmentSize;
      const color = colors[index % colors.length];
      
      gradient += `${color} ${startAngle}deg ${endAngle}deg`;
      if (index < options.length - 1) {
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
      
      // 텍스트 배치 및 회전 조정 - 위치 수정
      textElement.style.transform = `rotate(${midAngle}deg) translateY(-${radialPosition}px) rotate(-${midAngle}deg)`;
      
      roulette.appendChild(textElement);
      console.log(`텍스트 요소 추가됨: ${option}, 각도: ${midAngle}deg`);
    });
    
    gradient += ')';
    roulette.style.background = gradient;
    console.log('돌림판 배경 설정됨');
    
    // 현재 활성화된 옵션 갱신
    activeOptions = [...options];
  }
}); 