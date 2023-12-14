// 현재 연도와 월을 저장할 변수
let currentYear;
let currentMonth;

// 달력을 생성하는 함수
function generateCalendar(year, month) {
  // 해당 월의 일수와 첫 날의 요일을 계산
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // 테이블 시작
  let html = '<table>';
  html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
  
  let dayCount = 1;

  // 6주(행) 동안 반복
  for (let i = 0; i < 6; i++) {
    html += '<tr>';

    // 7일(열) 동안 반복
    for (let j = 0; j < 7; j++) {
      // 이전 달의 날짜 표시
      if (i === 0 && j < firstDay) {
        const prevMonthDays = new Date(year, month, 0).getDate();
        html += `<td class="other-month">${prevMonthDays - firstDay + j + 1}</td>`;
      } else if (dayCount <= daysInMonth) {
        const currentDate = new Date();
        let cellClass = '';

        // 오늘 날짜에 배경색 추가
        if (year === currentDate.getFullYear() && month === currentDate.getMonth() && dayCount === currentDate.getDate()) {
          cellClass = 'today';
        }

        html += `<td class="${cellClass}">${dayCount}</td>`;
        dayCount++;
      } else {
        // 다음 달의 날짜 표시
        const nextMonthDays = dayCount - daysInMonth;
        html += `<td class="other-month">${nextMonthDays}</td>`;
        dayCount++;
      }
    }

    html += '</tr>';
  }

  // 테이블 종료
  html += '</table>';

  return html;
}

// 월 변경 함수
function changeMonth(offset) {
  currentMonth += offset;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  // 달력 업데이트
  updateCalendar();
}

// 달력 업데이트 함수
function updateCalendar() {
  const calendarContainer = document.getElementById('calendar-container');
  calendarContainer.innerHTML = generateCalendar(currentYear, currentMonth);

  const calendarInfo = document.getElementById('calendar-info');
  calendarInfo.textContent = `${currentYear}년 ${currentMonth + 1}월`;
}

// 현재 날짜 정보 가져오기
const currentDate = new Date();
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth();

// 초기 달력 업데이트
updateCalendar();
