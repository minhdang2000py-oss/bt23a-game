// ====== 1. Khai báo dữ liệu và lấy các phần tử HTML ======
const STUDENT_ID = "241A010202";  // TODO: thay bằng mã sinh viên của bạn

const timeSelect = document.getElementById("timeSelect"); // ô chọn thời gian
const startBtn   = document.getElementById("startBtn");   // nút Bắt đầu
const colorBtn   = document.getElementById("colorBtn");   // nút Đổi màu nền
const playerBtn  = document.getElementById("playerBtn");  // nút Người chơi
const resetBtn   = document.getElementById("resetBtn");   // nút Chơi lại
const timeLeftEl = document.getElementById("timeLeft");   // chỗ hiện thời gian còn lại
const scoreEl    = document.getElementById("score");      // chỗ hiện điểm
const playerInfo = document.getElementById("playerInfo"); // chỗ hiện mã sinh viên
const gameArea   = document.getElementById("gameArea");   // khu vực chơi
const target     = document.getElementById("target");     // nút mục tiêu cần click
const resultEl   = document.getElementById("result");     // dòng kết quả cuối game

let score = 0;        // điểm hiện tại
let timeLeft = 0;     // số giây còn lại
let timerId = null;   // lưu id của setInterval để có thể dừng lại

// ====== 2. Di chuyển nút mục tiêu đến vị trí ngẫu nhiên ======
function moveTarget() {
  const maxX = gameArea.clientWidth - target.offsetWidth;   // x lớn nhất để nút không ra ngoài
  const maxY = gameArea.clientHeight - target.offsetHeight; // y lớn nhất
  target.style.left = Math.floor(Math.random() * maxX) + "px"; // chọn x ngẫu nhiên
  target.style.top  = Math.floor(Math.random() * maxY) + "px"; // chọn y ngẫu nhiên
}

// ====== 3. Bắt đầu chơi ======
function startGame() {
  score = 0;                                  // đặt lại điểm về 0
  scoreEl.textContent = score;                // hiện điểm lên màn hình
  timeLeft = Number(timeSelect.value);        // lấy số giây người chơi đã chọn
  timeLeftEl.textContent = timeLeft;          // hiện thời gian lên màn hình
  resultEl.hidden = true;                     // ẩn dòng kết quả cũ
  gameArea.classList.remove("locked");        // mở khóa khu vực chơi
  target.disabled = false;                    // cho phép click nút mục tiêu
  startBtn.disabled = true;                   // tránh bấm Bắt đầu nhiều lần
  timeSelect.disabled = true;                 // không đổi thời gian khi đang chơi
  moveTarget();                               // đặt nút mục tiêu ở vị trí đầu tiên

  clearInterval(timerId);                     // xóa bộ đếm cũ (nếu có) để không bị chạy chồng
  timerId = setInterval(tick, 1000);          // cứ 1 giây gọi hàm tick một lần
}

// ====== 4. Mỗi giây: giảm thời gian, hết giờ thì kết thúc ======
function tick() {
  timeLeft--;                                 // trừ 1 giây
  timeLeftEl.textContent = timeLeft;          // cập nhật hiển thị
  if (timeLeft <= 0) endGame();               // về 0 thì kết thúc game
}

// ====== 5. Kết thúc game: khóa mọi thao tác, hiện tổng điểm ======
function endGame() {
  clearInterval(timerId);                     // dừng bộ đếm, tránh rò rỉ bộ nhớ
  timerId = null;                             // đặt lại biến về rỗng
  target.disabled = true;                     // khóa nút mục tiêu
  gameArea.classList.add("locked");           // khóa khu vực chơi bằng CSS
  startBtn.disabled = true;                   // khóa nút Bắt đầu
  colorBtn.disabled = true;                   // khóa nút Đổi màu nền
  playerBtn.disabled = true;                  // khóa nút Người chơi
  resultEl.textContent = "Hết giờ! Tổng điểm của bạn: " + score; // nội dung kết quả
  resultEl.hidden = false;                    // hiện dòng kết quả
}

// ====== 6. Chơi lại: đưa mọi thứ về trạng thái ban đầu ======
function resetGame() {
  clearInterval(timerId);                     // dừng bộ đếm đang chạy
  timerId = null;
  score = 0;                                  // điểm về 0
  scoreEl.textContent = 0;
  timeLeftEl.textContent = 0;
  resultEl.hidden = true;                     // ẩn kết quả
  gameArea.classList.remove("locked");        // mở khóa khu vực chơi
  target.disabled = true;                     // chưa bắt đầu nên chưa cho click
  startBtn.disabled = false;                  // mở lại các nút
  colorBtn.disabled = false;
  playerBtn.disabled = false;
  timeSelect.disabled = false;
}

// ====== 7. Đổi màu nền ngẫu nhiên ======
function randomColor() {
  const h = Math.floor(Math.random() * 360);  // chọn một góc màu ngẫu nhiên từ 0 đến 359
  document.body.style.background = "hsl(" + h + ", 70%, 85%)"; // áp màu nhạt lên nền trang
}

// ====== 8. Hiện mã sinh viên ======
function showPlayer() {
  playerInfo.textContent = "Người chơi (MSSV): " + STUDENT_ID; // hiển thị mã sinh viên
}

// ====== 9. Gắn sự kiện cho các nút ======
target.addEventListener("click", function () {
  score++;                                    // mỗi lần click trúng: cộng 1 điểm
  scoreEl.textContent = score;                // cập nhật điểm
  moveTarget();                               // chuyển nút sang chỗ mới
});
startBtn.addEventListener("click", startGame);   // bấm Bắt đầu
colorBtn.addEventListener("click", randomColor); // bấm Đổi màu nền
playerBtn.addEventListener("click", showPlayer); // bấm Người chơi
resetBtn.addEventListener("click", resetGame);   // bấm Chơi lại
