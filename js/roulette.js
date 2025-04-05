console.log('Roulette script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - roulette.js');
  const roulette = document.getElementById('roulette');
  const spinButton = document.getElementById('spin');
  const result = document.getElementById('result');
  const items = ['빨강', '청록', '노랑', '남색', '주황'];
  let spinning = false;
  let currentRotation = 0;
  
  spinButton.addEventListener('click', function() {
    if (spinning) return;
    spinning = true;
    result.textContent = '';
    
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
      const segmentSize = 360 / items.length;
      let selectedIndex = Math.floor((360 - normalizedDegrees) / segmentSize);
      if (selectedIndex >= items.length) selectedIndex = 0;
      
      result.textContent = `결과: ${items[selectedIndex]}!`;
      spinning = false;
    }, 3000);
  });
}); 