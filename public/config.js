/* ================================================================
   ข้อมูลงานแต่งงาน — แก้ไขไฟล์นี้ไฟล์เดียวพอ
   รูปภาพ: แทนที่ไฟล์ใน assets/images/ ด้วยรูปจริงได้เลย
   เพลง:   แทนที่ไฟล์ assets/music/wedding.mp3
   ================================================================ */
window.WEDDING_CONFIG = {
  couple: {
    groomNick: "เปง",
    brideNick: "น้ำหวาน",
    groomName: "อานนท์ โภคสมบัติกุล",
    brideName: "กรรณิกา สมแสง",
  },

  weddingDate: "2025-01-19T07:09:00+07:00", // 19 มกราคม 2568 เวลา 07:09 น.
  weddingDateText: "19 มกราคม 2568",
  weddingMessage: "ขอเชิญร่วมเป็นส่วนหนึ่งในวันสำคัญของเรา",

  heroImage: "assets/images/hero.jpg",

  groom: {
    name: "อานนท์ โภคสมบัติกุล",
    nickname: "เปง",
    birthday: "31 ตุลาคม 2543",
    hobby: "ดู Tiktok",
    special: "หนุ่มไอที ใจเย็น สุขุม อบอุ่น",
    image: "assets/images/groom.jpg",
  },

  bride: {
    name: "กรรณิกา สมแสง",
    nickname: "น้ำหวาน",
    birthday: "25 พฤษภาคม 2544",
    hobby: "เลี้ยงหลาน",
    special: "สาวบัญชี ขี้บ่น ว่าง่าย อารมณ์ดี",
    image: "assets/images/bride.jpg",
  },

  schedule: [
    { time: "07:09 น.", title: "พิธีสงฆ์" },
    { time: "09:09 น.", title: "ผูกข้อไม้ข้อมือ" },
    { time: "10:39 น.", title: "ร่วมรับประทานอาหาร" },
  ],

  venue: "บ้านเลขที่ 19 ซอยประชาอุทิศ 21\nแขวงบางมด เขตทุ่งครุ\nกรุงเทพมหานคร",
  mapUrl: "https://maps.app.goo.gl/U4a6wvW3RxnH8xCL7",
  parkingMapUrl: "https://maps.app.goo.gl/PQnBJtWKybbzqjH47",

  bank: {
    bankName: "กสิกรไทย",
    accountName: "อานนท์ โภคสมบัติกุล",
    accountNumber: "0663946595",
    qrImage: "assets/images/bank-qr.jpg",
  },

  gallery: [
    "assets/images/gallery/01.jpg",
    "assets/images/gallery/02.jpg",
    "assets/images/gallery/03.jpg",
    "assets/images/gallery/04.jpg",
    "assets/images/gallery/05.jpg",
    "assets/images/gallery/06.jpg",
    "assets/images/gallery/07.jpg",
    "assets/images/gallery/08.jpg",
    "assets/images/gallery/09.jpg",
    "assets/images/gallery/10.jpg",
    "assets/images/gallery/11.jpg",
    "assets/images/gallery/12.jpg",
    // "assets/images/gallery/13.jpg",
    // "assets/images/gallery/14.jpg",
    // "assets/images/gallery/15.jpg",
    // "assets/images/gallery/16.jpg",
    // "assets/images/gallery/17.jpg",
    // "assets/images/gallery/18.jpg",
  ],

  music: "assets/music/wedding.mp3",

  // Lovable Cloud (ใช้ public key เท่านั้น — ห้ามใส่ service role key)
  supabaseUrl: "https://gerlwwpsvicxtarwocvp.supabase.co",
  supabaseKey: "sb_publishable_mRn63Q4lm1Vf0jVIqjyVxg_5SqV8sFw",
};
