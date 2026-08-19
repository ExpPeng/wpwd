

const C = window.WEDDING_CONFIG;
const $ = (id) => document.getElementById(id);
const text = (id, value) => { const el = $(id); if (el) el.textContent = value; };

/* ---------- ข้อมูลจาก config ---------- */
text("hero-msg", C.weddingMessage);
text("hero-groom", C.couple.groomNick);
text("hero-bride", C.couple.brideNick);
text("hero-full", `${C.couple.brideName}  ·  ${C.couple.groomName}`);
text("hero-date", C.weddingDateText);
$("hero-img").src = C.heroImage;

for (const who of ["groom", "bride"]) {
  const p = C[who];
  $(`${who}-img`).src = p.image;
  $(`${who}-img`).alt = `รูป${who === "groom" ? "เจ้าบ่าว" : "เจ้าสาว"} ${p.nickname}`;
  text(`${who}-name`, p.name);
  text(`${who}-nick`, `ชื่อเล่น : ${p.nickname}`);
  text(`${who}-bd`, p.birthday);
  text(`${who}-hobby`, p.hobby);
  text(`${who}-special`, p.special);
}

text("event-date", C.weddingDateText);
$("timeline").innerHTML = "";
C.schedule.forEach((s) => {
  const li = document.createElement("li");
  const t = document.createElement("div");
  t.className = "timeline__time";
  t.textContent = s.time;
  const d = document.createElement("div");
  d.className = "timeline__title";
  d.textContent = s.title;
  li.append(t, d);
  $("timeline").appendChild(li);
});

text("venue-text", C.venue);
$("map-btn").href = C.mapUrl;
$("parking-btn").href = C.parkingMapUrl;

text("bank-name", `ธนาคาร${C.bank.bankName}`);
text("bank-acc-name", C.bank.accountName);
text("bank-number", C.bank.accountNumber);
$("qr-img").src = C.bank.qrImage;
text("footer-names", `${C.couple.groomName} & ${C.couple.brideName}`);
$("audio").src = C.music;

/* ---------- GALLERY ---------- */
const gallery = C.gallery;
let current = 0;
const mainImg = $("gallery-main-img");
const thumbsWrap = $("gallery-thumbs");

gallery.forEach((src, i) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "thumb";
  btn.setAttribute("aria-label", `ดูภาพที่ ${i + 1}`);
  const img = document.createElement("img");
  img.src = src;
  img.alt = `ภาพความทรงจำที่ ${i + 1}`;
  img.loading = "lazy";
  img.width = 1000;
  img.height = 750;
  btn.appendChild(img);
  btn.addEventListener("click", () => setMain(i));
  thumbsWrap.appendChild(btn);
});

function setMain(i) {
  current = (i + gallery.length) % gallery.length;
  mainImg.src = gallery[current];
  mainImg.alt = `ภาพความทรงจำที่ ${current + 1}`;
  [...thumbsWrap.children].forEach((el, idx) =>
    el.setAttribute("aria-current", idx === current ? "true" : "false"),
  );
}
setMain(0);

/* ---------- LIGHTBOX (ใช้ร่วมกับ QR) ---------- */
const lb = $("lightbox");
const lbImg = $("lb-img");
let lbList = gallery;
let lbIndex = 0;

function openLightbox(list, index) {
  lbList = list;
  lbIndex = index;
  lbImg.src = lbList[lbIndex];
  lb.classList.add("open");
  const single = lbList.length < 2;
  $("lb-prev").hidden = single;
  $("lb-next").hidden = single;
  document.body.style.overflow = "hidden";
  $("lb-close").focus();
}
function closeLightbox() {
  lb.classList.remove("open");
  document.body.style.overflow = "";
}
function step(n) {
  lbIndex = (lbIndex + n + lbList.length) % lbList.length;
  lbImg.src = lbList[lbIndex];
}

$("gallery-main").addEventListener("click", () => openLightbox(gallery, current));
$("qr-btn").addEventListener("click", () => openLightbox([C.bank.qrImage], 0));
$("lb-close").addEventListener("click", closeLightbox);
$("lb-prev").addEventListener("click", () => step(-1));
$("lb-next").addEventListener("click", () => step(1));
lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
let touchX = null;
lb.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  touchX = null;
}, { passive: true });

// /* ---------- COUNTDOWN ---------- */
// const target = new Date(C.weddingDate).getTime();
// const cdWrap = $("countdown-wrap");
// function tick() {
//   const diff = target - Date.now();
//   if (diff <= 0) {
//     cdWrap.innerHTML = '<p class="countdown-done">วันนี้คือวันสำคัญของเรา ❤️</p>';
//     clearInterval(timer);
//     return;
//   }
//   const s = Math.floor(diff / 1000);
//   text("cd-d", Math.floor(s / 86400));
//   text("cd-h", Math.floor((s % 86400) / 3600));
//   text("cd-m", Math.floor((s % 3600) / 60));
//   text("cd-s", s % 60);
// }
// tick();
// const timer = setInterval(tick, 1000);

/* ---------- OUR JOURNEY ---------- */
const startDate = new Date(C.weddingDate).getTime();

function tick() {
  const diff = Date.now() - startDate;

  if (diff < 0) return;

  const s = Math.floor(diff / 1000);

  text("cd-d", Math.floor(s / 86400));
  text("cd-h", Math.floor((s % 86400) / 3600));
  text("cd-m", Math.floor((s % 3600) / 60));
  text("cd-s", s % 60);
}

tick();
const timer = setInterval(tick, 1000);

/* ---------- MUSIC ---------- */
const audio = $("audio");
const musicBtn = $("music-btn");

function syncBtn() {
  const playing = !audio.paused;
  musicBtn.classList.toggle("playing", playing);
  musicBtn.setAttribute("aria-pressed", String(playing));
}

// พยายามเล่นทันทีเมื่อเปิดเว็บ
audio.play().then(syncBtn).catch(() => {
  syncBtn();
});

// ถ้า Autoplay ถูก Browser บล็อก
// ให้การคลิกครั้งแรกที่ใดก็ได้บนหน้าเว็บเริ่มเพลง
let musicStarted = false;

async function startMusicOnFirstClick() {
  if (musicStarted || !audio.paused) return;

  try {
    await audio.play();
    musicStarted = true;
    syncBtn();

    // ไม่ต้องดัก click อีกหลังจากเพลงเริ่มแล้ว
    document.removeEventListener("click", startMusicOnFirstClick);
  } catch (error) {
    console.log("Music could not start:", error);
  }
}

document.addEventListener("click", startMusicOnFirstClick);

// ปุ่มเพลงสำหรับเปิด/ปิดเพลงเอง
musicBtn.addEventListener("click", async (e) => {
  e.stopPropagation();

  if (audio.paused) {
    try {
      await audio.play();
      musicStarted = true;
    } catch (_) {}
  } else {
    audio.pause();
  }

  syncBtn();
});

audio.addEventListener("play", syncBtn);
audio.addEventListener("pause", syncBtn);



/* ---------- GUESTBOOK ---------- */

const API_URL =
  "https://script.google.com/macros/s/AKfycbzLltSnY-jCscOV3zaNCiMo8Alia9JaKN-GA2YKkcIC6JcaXmk3MSRZO6cg0bq5oqzd/exec";

const listEl = $("wishes");
const formMsg = $("wish-msg");
const submitBtn = $("wish-submit");

let lastSubmit = 0;


/* ---------- แสดงข้อความสถานะ ---------- */

function showMsg(msg, kind = "") {
  if (!formMsg) return;

  formMsg.textContent = msg;
  formMsg.className = `form-msg ${kind}`;
}


/* ---------- วันที่ ---------- */

function formatDate(value) {
  if (!value) return "";

  try {
    return new Intl.DateTimeFormat("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Bangkok",
    }).format(new Date(value));
  } catch (_) {
    return "";
  }
}


/* =========================================================
   โหลดคำอวยพรทั้งหมด
   ========================================================= */

async function loadWishes() {
  try {
    const response = await fetch(
      `${API_URL}?t=${Date.now()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!result.ok) {
      throw new Error(
        result.error || "โหลดคำอวยพรไม่สำเร็จ"
      );
    }

    const data = Array.isArray(result.data)
      ? result.data
      : [];

    listEl.innerHTML = "";

    if (data.length === 0) {
      const li = document.createElement("li");

      li.className = "wishes-empty";

      li.textContent =
        "ยังไม่มีคำอวยพร มาเป็นคนแรกกันเถอะ ❤️";

      listEl.appendChild(li);

      return;
    }

    /*
     * แสดงทั้งหมด
     * ล่าสุดอยู่ด้านบน
     */

    data
      .slice()
      .reverse()
      .forEach((wish) => {

        const li = document.createElement("li");

        const name = document.createElement("div");

        name.className = "wish-name";

        name.textContent =
          wish.name || "ผู้ร่วมอวยพร";


        const message = document.createElement("p");

        message.className = "wish-msg";

        message.textContent =
          wish.message || "";


        const date = document.createElement("div");

        date.className = "wish-date";

        date.textContent =
          formatDate(wish.created_at);


        li.append(
          name,
          message,
          date
        );

        listEl.appendChild(li);
      });

  } catch (error) {

    console.error(
      "Guestbook GET:",
      error
    );

    listEl.innerHTML = "";

    const li = document.createElement("li");

    li.className = "wishes-empty";

    li.textContent =
      "ไม่สามารถโหลดคำอวยพรได้ในขณะนี้";

    listEl.appendChild(li);
  }
}


/* =========================================================
   ส่งคำอวยพร
   ========================================================= */

$("wish-form").addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();


    const name =
      $("wish-name").value.trim();

    const message =
      $("wish-message").value.trim();


    /* ---------- ตรวจข้อมูล ---------- */

    if (!name) {
      showMsg(
        "กรุณากรอกชื่อของคุณ",
        "err"
      );
      return;
    }


    if (name.length > 60) {
      showMsg(
        "ชื่อต้องไม่เกิน 60 ตัวอักษร",
        "err"
      );
      return;
    }


    if (!message) {
      showMsg(
        "กรุณากรอกคำอวยพร",
        "err"
      );
      return;
    }


    if (message.length > 500) {
      showMsg(
        "คำอวยพรต้องไม่เกิน 500 ตัวอักษร",
        "err"
      );
      return;
    }


    if (Date.now() - lastSubmit < 15000) {
      showMsg(
        "กรุณารอสักครู่ก่อนส่งอีกครั้ง",
        "err"
      );
      return;
    }


    submitBtn.disabled = true;

    showMsg(
      "กำลังส่ง...",
      ""
    );


    const body = JSON.stringify({
      action: "create",
      name: name,
      message: message,
    });


    /*
     * ส่งแบบ no-cors
     *
     * ไม่รอ response
     * เพื่อไม่ให้เว็บค้าง
     */

    fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type":
          "text/plain;charset=UTF-8",
      },
      body: body,
    }).catch((error) => {

      console.error(
        "Guestbook POST:",
        error
      );

    });


    /*
     * ถือว่าส่ง request แล้ว
     */

    lastSubmit = Date.now();

$("wish-form").reset();

showMsg(
  "ส่งคำอวยพรเรียบร้อยแล้ว ❤️",
  "ok"
);

submitBtn.disabled = false;


/* ---------- Refresh แล้วกลับมาที่ Guestbook ---------- */

setTimeout(() => {

  /*
   * เก็บตำแหน่งว่าเราต้องการกลับมา
   * ที่ Section คำอวยพร
   */
  sessionStorage.setItem(
    "scrollToGuestbook",
    "true"
  );

  window.location.reload();

}, 1800);
});

/* =========================================================
   โหลดคำอวยพรตอนเปิดหน้า
   ========================================================= */

loadWishes();


/* ---------- กลับมาที่ Guestbook หลัง Refresh ---------- */

if (
  sessionStorage.getItem(
    "scrollToGuestbook"
  ) === "true"
) {

  sessionStorage.removeItem(
    "scrollToGuestbook"
  );

  setTimeout(() => {

    const guestbook = document.getElementById("guestbook");

if (guestbook) {
  guestbook.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

  }, 500);
}



/* ---------- COPY ACCOUNT ---------- */
$("copy-btn").addEventListener("click", async () => {
  const num = C.bank.accountNumber;
  try {
    await navigator.clipboard.writeText(num);
  } catch (_) {
    const ta = document.createElement("textarea");
    ta.value = num;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  const el = $("copy-msg");
  el.textContent = "คัดลอกแล้ว";
  setTimeout(() => { el.textContent = ""; }, 2000);
});


