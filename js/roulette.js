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
  const modalBackground = document.querySelector('.modal-background');
  const modalClose = document.querySelector('.modal-close');
  
  let userOptions = [];
  let spinning = false;
  
  // 초기 돌림판 상태 - 비어있는 상태
  roulette.style.background = '#e0e0e0'; // 회색 배경으로 시작
  spinButton.disabled = true; // 옵션이 없을 때는 버튼 비활성화
  spinButton.classList.add('is-loading', 'is-outlined');
  spinButton.classList.remove('is-loading');
  resetButton.disabled = true; // 초기화 버튼도 비활성화
  
  // 모달 창 닫기 (여러 방법 지원)
  function closeModal() {
    resultModal.classList.remove('is-active');
  }
  
  // 모달 닫기 버튼 이벤트
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }
  
  // 모달 배경 클릭 시 닫기
  if (modalBackground) {
    modalBackground.addEventListener('click', closeModal);
  }
  
  // 모달 X 버튼 클릭 시 닫기
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
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
  
  // 초기화 버튼 클릭 이벤트
  resetButton.addEventListener('click', function() {
    if (spinning) return; // 회전 중에는 초기화 불가
    if (userOptions.length === 0) return; // 이미 비어있으면 아무 작업도 하지 않음
    
    userOptions = [];
    renderOptionsList();
    initEmptyRoulette();
    optionsList.style.display = 'none'; // 옵션 목록 숨김
  });
  
  // 돌리기 버튼 클릭 이벤트
  spinButton.addEventListener('click', function() {
    if (spinning) return;
    
    if (userOptions.length === 0) {
      // Bulma 알림창 스타일
      showNotification('최소 1개 이상의 옵션을 추가해주세요!', 'is-warning');
      return;
    }
    
    spinning = true;
    spinButton.classList.add('is-loading');
    spinButton.disabled = true;
    
    // 회전값 초기화 - 매번 새롭게 회전하도록 수정
    // 각도 계산 (랜덤한 추가 회전 + 랜덤 각도)
    const randomDegrees = Math.floor(Math.random() * 360);
    
    // 추가 회전을 랜덤하게 설정 (3바퀴에서 8바퀴 사이로 변경)
    const minRotation = 3 * 360; // 최소 3바퀴
    const maxRotation = 8 * 360; // 최대 8바퀴
    const extraRotation = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
    
    const totalRotation = extraRotation + randomDegrees;
    
    // 회전량에 비례해서 시간 계산
    const minTime = 3; // 최소 3초
    const maxTime = 8; // 최대 8초
    const normalizedRotation = (totalRotation - minRotation) / (maxRotation - minRotation); // 0~1 사이 값
    const spinTime = minTime + normalizedRotation * (maxTime - minTime); // 회전 시간 (초)
    
    // 돌림판 회전 처리 수정
    try {
      // 기존 트랜지션 제거 후 초기화
      roulette.style.transition = 'none';
      roulette.style.transform = 'rotate(0deg)';
      
      // 레이아웃 강제 리플로우 (크로스 브라우저 호환성 개선)
      void roulette.offsetWidth;
      
      // 가속도 있는 트랜지션 적용 (회전량에 비례한 시간 적용)
      roulette.style.transition = `transform ${spinTime}s cubic-bezier(0.17, 0.67, 0.27, 0.99)`;
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
        
        // 결과 애니메이션 표시 (null 체크 추가)
        if (resultModal && resultText) {
          showResultWithAnimation(userOptions[selectedIndex]);
        } else {
          showNotification(`결과: ${userOptions[selectedIndex]}`, 'is-success');
        }
        
        spinButton.classList.remove('is-loading');
        spinButton.disabled = false;
        spinning = false;
      }, spinTime * 1000); // 회전 시간에 맞춰 타이머 설정
    } catch (error) {
      console.error('돌림판 회전 중 오류 발생:', error);
      spinButton.classList.remove('is-loading');
      spinButton.disabled = false;
      spinning = false;
      showNotification('돌림판 회전 중 오류가 발생했습니다. 다시 시도해주세요.', 'is-danger');
    }
  });
  
  // Bulma 스타일 알림창 표시
  function showNotification(message, type = 'is-info') {
    // 이미 있는 알림창 제거
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(item => item.remove());
    
    // 새 알림창 생성
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.maxWidth = '300px';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    notification.style.borderRadius = '6px';
    notification.style.animation = 'slideIn 0.3s ease-out forwards';
    
    // 닫기 버튼 추가
    const closeBtn = document.createElement('button');
    closeBtn.className = 'delete';
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(notification);
    });
    
    notification.appendChild(closeBtn);
    notification.appendChild(document.createTextNode(message));
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  }
  
  // 결과 애니메이션 표시 함수
  function showResultWithAnimation(selectedOption) {
    // 모달에 결과 표시
    resultText.textContent = selectedOption;
    
    // 모달 표시 (Bulma 스타일)
    setTimeout(() => {
      resultModal.classList.add('is-active');
      
      // 콘페티 효과 실행
      launchConfetti();
    }, 500);
  }
  
  // 콘페티 효과 함수
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const myConfetti = confetti.create(canvas, { resize: true });
    
    // 더 화려한 콘페티 효과 설정
    myConfetti({
      particleCount: 150,
      spread: 160,
      origin: { y: 0.6 },
      colors: ['#FF3860', '#3273DC', '#FFD166', '#23D160', '#209CEE'],
      disableForReducedMotion: true
    });
    
    // 추가 콘페티 효과 (1초 후)
    setTimeout(() => {
      myConfetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF3860', '#3273DC', '#FFD166']
      });
      
      myConfetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#209CEE', '#FFD166', '#23D160']
      });
    }, 1000);
  }
  
  // 초기 빈 돌림판 생성
  function initEmptyRoulette() {
    roulette.style.background = '#e0e0e0'; // 회색 배경으로 시작
    roulette.innerHTML = ''; // 모든 텍스트 제거
    spinButton.disabled = true; // 옵션이 없을 때는 버튼 비활성화
    resetButton.disabled = true; // 초기화 버튼도 비활성화
  }
  
  // 옵션 추가 함수
  function addOption() {
    const optionText = optionInput.value.trim();
    
    if (optionText && userOptions.length < 10) {
      // 동일한 옵션 입력 허용 (중복 체크 제거)
      userOptions.push(optionText);
      renderOptionsList();
      updateRoulette(); // 옵션 추가 시 즉시 돌림판 업데이트
      optionInput.value = '';
      
      // 첫 번째 옵션이 추가되면 버튼들 활성화
      if (userOptions.length === 1) {
        spinButton.disabled = false;
        resetButton.disabled = false;
      }
    } else if (userOptions.length >= 10) {
      showNotification('최대 10개까지만 추가할 수 있습니다!', 'is-warning');
    } else {
      showNotification('옵션을 입력해주세요!', 'is-warning');
    }
    
    optionInput.focus();
  }
  
  // 옵션 목록 렌더링 함수
  function renderOptionsList() {
    optionsList.innerHTML = '';
    
    // 옵션이 있을 때만 옵션 목록 표시
    if (userOptions.length > 0) {
      optionsList.style.display = 'block';
      
      userOptions.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        optionItem.style.animation = 'slideUp 0.3s ease-out forwards';
        
        const optionText = document.createElement('span');
        optionText.textContent = option;
        
        const removeButton = document.createElement('button');
        removeButton.className = 'delete-button';
        removeButton.innerHTML = '<i class="fas fa-times"></i>';
        removeButton.onclick = function() {
          userOptions.splice(index, 1);
          renderOptionsList();
          updateRoulette(); // 옵션 삭제 시 즉시 돌림판 업데이트
          
          // 모든 옵션이 삭제되면 버튼들 비활성화
          if (userOptions.length === 0) {
            spinButton.disabled = true;
            resetButton.disabled = true;
            initEmptyRoulette();
            optionsList.style.display = 'none'; // 옵션 목록 숨김
          }
        };
        
        optionItem.appendChild(optionText);
        optionItem.appendChild(removeButton);
        optionsList.appendChild(optionItem);
      });
    } else {
      // 옵션이 없으면 옵션 목록 숨김
      optionsList.style.display = 'none';
    }
  }
  
  // 돌림판 업데이트 함수
  function updateRoulette() {
    if (userOptions.length === 0) {
      initEmptyRoulette();
      return;
    }
    
    spinButton.disabled = false;
    resetButton.disabled = false;
    
    // 색상 배열 - 각 섹션에 다른 색상 적용 (Bulma 색상)
    const colors = [
      '#FF3860', '#3273DC', '#FFD166', '#23D160', '#209CEE',
      '#6A67CE', '#FF9F43', '#00D1B2', '#F56565', '#667EEA'
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