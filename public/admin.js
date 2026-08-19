const API_URL =
  "https://script.google.com/macros/s/AKfycbzLltSnY-jCscOV3zaNCiMo8Alia9JaKN-GA2YKkcIC6JcaXmk3MSRZO6cg0bq5oqzd/exec";
  
const $ = (id) => document.getElementById(id);

function setMsg(id, msg, isErr = false) {
  const el = $(id);
  if (!el) return;

  el.textContent = msg;
  el.className = isErr ? "msg err" : "msg";
}

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
   โหลดคำอวยพร
   ========================================================= */

async function loadWishes() {
  const list = $("list");

  list.innerHTML = "";
  setMsg("admin-msg", "กำลังโหลด...", false);

  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.error || "โหลดข้อมูลไม่สำเร็จ");
    }

    const data = result.data || [];

    if (data.length === 0) {
      setMsg("admin-msg", "ยังไม่มีคำอวยพร", false);
      return;
    }

    setMsg("admin-msg", `ทั้งหมด ${data.length} รายการ`, false);

    for (const wish of data) {
      const card = document.createElement("div");
      card.className = "card";

      const name = document.createElement("div");
      name.textContent = "ชื่อ: " + wish.name;

      const message = document.createElement("pre");
      message.textContent = wish.message;

      const date = document.createElement("div");
      date.className = "meta";
      date.textContent = formatDate(wish.created_at);

      const del = document.createElement("button");
      del.type = "button";
      del.className = "danger";
      del.textContent = "ลบ";

      del.addEventListener("click", () => deleteWish(wish.id, del));

      card.append(name, message, date, del);
      list.appendChild(card);
    }

  } catch (error) {
    console.error(error);
    setMsg("admin-msg", "โหลดคำอวยพรไม่สำเร็จ", true);
  }
}


/* =========================================================
   ลบคำอวยพร
   ========================================================= */

async function deleteWish(id, button) {
  if (!confirm("ลบคำอวยพรนี้?")) return;

  button.disabled = true;
  button.textContent = "กำลังลบ...";

  const body = JSON.stringify({
    action: "delete",
    id: id,
  });

  try {
    /*
     * ส่งไป Google Apps Script
     *
     * ไม่รอ response เพราะ Browser ไม่สามารถ
     * อ่าน response จาก Apps Script ข้ามโดเมนได้
     */
    fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: body,
    }).catch((error) => {
      console.error("Guestbook DELETE:", error);
    });

    /*
     * ให้เวลา Apps Script ลบข้อมูลใน Sheet
     */
    setTimeout(() => {
      loadWishes();
    }, 1000);

  } catch (error) {
    console.error(error);

    button.disabled = false;
    button.textContent = "ลบ";

    setMsg(
      "admin-msg",
      "เกิดข้อผิดพลาดในการลบ",
      true
    );
  }
}

/* =========================================================
   เริ่มต้น
   ========================================================= */

loadWishes();