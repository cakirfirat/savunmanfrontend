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

  export function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }
  
  export function formatToISO(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString();
  }
  
  export function formatDatee(dateString) {
    const date = new Date(dateString.replace(' ', 'T'));
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
  
    if (days > 1) {
      return `${days} gün önce`;
    } else if (days === 1) {
      return `1 gün önce`;
    } else if (hours > 0) {
      return `${hours} saat önce`;
    } else if (minutes > 0) {
      return `${minutes} dakika önce`;
    } else {
      return `az önce`;
    }
  }
  
  
  