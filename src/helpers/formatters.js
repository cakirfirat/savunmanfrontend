export const formatCardNumber = (value) => {
    // Sadece sayıları al ve 16 karakterle sınırla
    const onlyNums = value.replace(/[^\d]/g, '').slice(0, 16);
  
    // Sayıları gruplara ayır
    const parts = [];
    for (let i = 0; i < onlyNums.length; i += 4) {
      parts.push(onlyNums.substring(i, i + 4));
    }
  
    // Grupları birleştir ve araya "-" ekle
    return parts.join('-');
  };