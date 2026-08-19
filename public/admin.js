import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const C = window.WEDDING_CONFIG;
const supabase = createClient(C.supabaseUrl, C.supabaseKey);
const $ = (id) => document.getElementById(id);

function setMsg(id, msg, isErr) {
  const el = $(id);
  el.textContent = msg;
  el.className = isErr ? "msg err" : "msg";
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Bangkok",
  }).format(new Date(iso));
}

async function render() {
  const { data: { user } } = await supabase.auth.getUser();
  $("login-view").hidden = !!user;
  $("admin-view").hidden = !user;
  if (!user) return;
  $("who").textContent = user.email + " ";
  loadWishes();
}

async function loadWishes() {
  const { data, error } = await supabase
    .from("wishes")
    .select("id,name,message,created_at")
    .order("created_at", { ascending: false });

  const list = $("list");
  list.innerHTML = "";
  if (error) return setMsg("admin-msg", "โหลดข้อมูลไม่สำเร็จ", true);
  if (!data.length) return setMsg("admin-msg", "ยังไม่มีคำอวยพร", false);
  setMsg("admin-msg", `ทั้งหมด ${data.length} รายการ`, false);

  for (const w of data) {
    const card = document.createElement("div");
    card.className = "card";

    const name = document.createElement("div");
    name.textContent = "ชื่อ: " + w.name;

    const msg = document.createElement("pre");
    msg.textContent = w.message;

    const date = document.createElement("div");
    date.className = "meta";
    date.textContent = formatDate(w.created_at);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "danger";
    del.textContent = "ลบ";
    del.addEventListener("click", async () => {
      if (!confirm("ลบคำอวยพรนี้?")) return;
      del.disabled = true;
      const { error: delError } = await supabase.from("wishes").delete().eq("id", w.id);
      if (delError) {
        del.disabled = false;
        return setMsg("admin-msg", "ลบไม่สำเร็จ", true);
      }
      loadWishes();
    });

    card.append(name, msg, date, del);
    list.appendChild(card);
  }
}

$("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  setMsg("login-msg", "กำลังเข้าสู่ระบบ...", false);
  const { error } = await supabase.auth.signInWithPassword({
    email: $("email").value.trim(),
    password: $("password").value,
  });
  if (error) return setMsg("login-msg", "เข้าสู่ระบบไม่สำเร็จ", true);
  setMsg("login-msg", "", false);
  render();
});

$("logout").addEventListener("click", async () => {
  await supabase.auth.signOut();
  render();
});

render();
