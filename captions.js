/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 8. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Kermes', en: 'The school fair',
      note: 'Sınıfımız kermeste stant açıyor. Üç karar vermemiz gerekiyor ve her biri için bir olasılık gerekiyor.' },
    { scene: 2, start: 10.8, end: 19.2, tr: 'İki zarın toplamı', en: 'The sum of two dice',
      note: 'Zar oyununda iki zarın toplamı 7 gelirse ödül var. 36 çıktı eşit olasılıklı; 7 toplamını veren 6 çıktı var.' },
    { scene: 2, start: 19.4, end: 27.8, tr: 'Teorik: 1/6', en: 'Theoretical: 1/6',
      note: 'Olasılık 6 bölü 36, yani 1 bölü 6. 60 oyuncudan yaklaşık 10’u kazanır: 10 ödül hazırlayalım.' },
    { scene: 3, start: 28.8, end: 37.2, tr: 'Raptiye', en: 'A thumbtack',
      note: 'Raptiye ucu yukarı ya da yan yatık düşebilir, ama bu iki durum eşit olasılıklı değil. Sayamıyoruz, deneyelim: 50 atışta 30 kez ucu yukarı.' },
    { scene: 3, start: 37.4, end: 45.8, tr: 'Deneysel: 0,62', en: 'Experimental: 0.62',
      note: '200 atışta 124 kez ucu yukarı: yaklaşık 0,62. Atış arttıkça sonuç kararlı. Oyun adil değil.' },
    { scene: 4, start: 46.8, end: 55.0, tr: 'Final maçı', en: 'The final',
      note: 'Takımımız finali kazanırsa atkı satarız. Eşit çıktı yok, deney de yapılamaz. Bilgi topluyoruz: sezon, rakip, sakatlık.' },
    { scene: 4, start: 55.2, end: 63.8, tr: 'Öznel tahmin', en: 'A subjective estimate',
      note: 'Ayşe yüzde 70, Can yüzde 50, Ece yüzde 60 diyor. Öznel olasılık kişiden kişiye değişir; gerekçeleri sorgulayıp ortak tahminde buluşuyoruz.' },
    { scene: 5, start: 64.8, end: 72.0, tr: 'Yaklaşımı seç', en: 'Choose the approach',
      note: 'Eşit çıktılar varsa teorik, deney tekrarlanabiliyorsa deneysel, ikisi de yoksa bilgiye dayalı öznel olasılık.' },
    { scene: 5, start: 72.2, end: 79.8, tr: 'Karara yansıt', en: 'Use it to decide',
      note: '10 ödül hazırlıyoruz, raptiye oyununun kuralını değiştiriyoruz, az sayıda atkı alıyoruz.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Teorik, deneysel, öznel', en: 'Theoretical, experimental, subjective',
      note: 'Aklında kalsın: duruma uygun olasılık yaklaşımını seç.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Doğru karar!', en: 'The right decision!',
      note: 'Uygun yaklaşım, doğru karar!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
