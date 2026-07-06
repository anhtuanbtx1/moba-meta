import codecs
code = """import { useState, useRef } from "react";
interface Hero {
  id: string;
  name: string;
  image: string;
}
const HEROES_DATA = {
  "truong-thanh": [
    { id: "luu-bang", name: "Lưu Bang", image: "https://hokmoba.com/assets/images/heroes/luu-bang.jpg" },
    { id: "han-tin", name: "Hàn Tín", image: "https://hokmoba.com/assets/images/heroes/han-tin.jpg" },
    { id: "hoa-moc-lan", name: "Hoa Mộc Lan", image: "https://hokmoba.com/assets/images/heroes/hoa-moc-lan.jpg" },
    { id: "truong-luong", name: "Trương Lương", image: "https://hokmoba.com/assets/images/heroes/truong-luong.jpg" },
    { id: "khai", name: "Khải", image: "https://hokmoba.com/assets/images/heroes/khai.jpg" },
    { id: "bach-ly-huyen-sach", name: "Bách Lý Huyền Sách", image: "https://hokmoba.com/assets/images/heroes/bach-ly-huyen-sach.jpg" },
    { id: "bach-ly-thu-uoc", name: "Bách Lý Thủ Ước", image: "https://hokmoba.com/assets/images/heroes/bach-ly-thu-uoc.jpg" },
    { id: "li-xin", name: "Li Xin", image: "https://hokmoba.com/assets/images/heroes/li-xin.jpg" },
    { id: "gia-la", name: "Già La", image: "https://hokmoba.com/assets/images/heroes/gia-la.jpg" }
  ],
  "hoc-vien-tac-ha": [
    { id: "lu-bo", name: "Tôn Tẫn", image: "https://hokmoba.com/assets/images/heroes/lu-bo.jpg" },
    { id: "chung-vo-diem", name: "Chung Vô Diệm", image: "https://hokmoba.com/assets/images/heroes/chung-vo-diem.jpg" },
    { id: "liem-pha", name: "Liêm Pha", image: "https://hokmoba.com/assets/images/heroes/liem-pha.jpg" }
  ]
};
const FACTIONS = [
  { id: "truong-thanh", name: "Trường Thành", heroCount: 9 },
  { id: "hoc-vien-tac-ha", name: "Học Viện Tắc Hạ", heroCount: 12 }
];
"""
