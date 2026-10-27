# Cyber.folio

Kiberxavfsizlik mutaxassislari uchun terminal uslubidagi, moslashuvchan va ko'p sahifali portfolio. Har bir yo'nalish alohida HTML sahifada ochiladi.

## Imkoniyatlar

- Terminal uslubidagi dizayn va mobil qurilmalarga mos ko'rinish
- Alohida sahifalar: bosh sahifa, profil, ishlar, CVE, sertifikatlar, tajriba va aloqa
- Profil, qiziqishlar, texnologiyalar, loyiha filtrlari, CVE, sertifikat va tajriba bo'limlari
- Bir nechta aloqa usullari va ijtimoiy havolalar
- Yorug'/qorong'i mavzu; tanlov brauzerda saqlanadi
- Tashqi JS kutubxonasi, backend yoki build bosqichi kerak emas
- Shriftlar qurilmaning o'zidan olinadi; tashqi shrift xizmatlariga so'rov yuborilmaydi

## Ishga tushirish

`index.html` faylini brauzerda oching. Yuqoridagi menyu orqali `profile.html`, `work.html`, `cves.html`, `certifications.html`, `experience.html` va `contact.html` sahifalariga o'ting. Navigatsiya statik HTML havolalaridan iboratligi sababli sahifalar lokal fayl sifatida hamda GitHub Pages'da ishlaydi.

## Moslashtirish

Sayt kontenti `script.js` faylining boshidagi `portfolio` obyektida saqlanadi. Profil, ishlar, sertifikatlar va aloqa ma'lumotlarini shu obyektni tahrirlab yangilash mumkin; sahifaning o'zida tahrirlash formasi yo'q.

- Profil uchun: `name`, `role`, `intro`, `about`, `location`, `focus`, `languages`
- Qiziqish va ko'nikmalar uchun: `interests`, `interestTags`
- Ishlar uchun: `works` — sarlavha, kategoriya, izoh, teglar va ommaviy havola
- Tasdiqlangan zaifliklar uchun: `findings`
- Sertifikatlar uchun: `certifications`
- Ish tajribasi va ta'lim uchun: `experience`
- Bog'lanish usullari uchun: `contacts`

Obyekt ichidagi kommentlar qaysi ma'lumotni qayerda o'zgartirishni ko'rsatadi. `name`, `role`, `intro`, `about`, `availability`, `status`, `location`, `focus`, `languages` va `interests` qiymatlari profil matnlarini boshqaradi. `works`, `findings`, `certifications`, `experience` va `contacts` ro'yxatlarini o'zingizning haqiqiy ma'lumotlaringiz bilan to'ldiring. Sahifada tahrirlash formasi yo'q — o'zgarishlar kodda saqlanadi.

CVE yozuvi namunasi:

```js
{
  id: "CVE-YYYY-NNNNN",
  title: "Oshkor etishga ruxsat berilgan qisqa tavsif",
  product: "Mahsulot / komponent",
  year: "YYYY",
  severity: "Medium",
  status: "Vendor tomonidan tasdiqlangan",
  url: "https://www.cve.org/CVERecord?id=CVE-YYYY-NNNNN"
}
```

Bu sintaksis namuna, haqiqiy CVE da'vosi emas. Faqat sizga tegishli va rasmiy tasdiqlangan, e'lon qilishga ruxsatli yozuvlarni qo'shing. CVE hali berilmagan bo'lsa, uni CVE deb ko'rsatmay, disclosure siyosati ruxsat bergan darajada umumiy bayon qiling.

Sertifikat namunasi:

```js
{ name: "Sertifikat nomi", issuer: "Tashkilot", year: "2026", short: "OS", url: "https://example.com/verify" }
```

## Mas'uliyat va maxfiylik

- Faqat yozma ruxsat berilgan tizimlarni sinang.
- Mijoz nomi, IP manzil, token, hisob ma'lumoti, ichki screenshot yoki oshkor qilinmagan zaiflik dalillarini public repoga qo'shmang.
- CTF materiallarini faqat musobaqa qoidalari ruxsat bersa ulashing.
- Ommaga chiqarishdan avval namuna ism, tajriba, profil va havolalarni almashtiring.

## GitHub Pages

1. Alohida public GitHub repository yarating.
2. Ushbu papkadagi barcha HTML sahifalarini (`index.html`, `profile.html`, `work.html`, `cves.html`, `certifications.html`, `experience.html`, `contact.html`) hamda `style.css`, `script.js`, `README.md` fayllarini repozitoriy ildiziga yuklang.
3. **Settings → Pages → Deploy from a branch** ni tanlang.
4. `main` branch va `/ (root)` papkasini tanlab saqlang.
5. Sayt `https://USERNAME.github.io/REPOSITORY/` manzilida ochiladi.
