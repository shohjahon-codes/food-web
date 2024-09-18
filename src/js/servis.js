const baseURL = 'https://food-pos-data.vercel.app'; // API asosiy manzili

// Ma'lumotlarni olish uchun umumiy funksiya
export const getData = async (endpoint = '/catalog') => {
  try {
    const url = `${baseURL}${endpoint}`; // Endpointni to'g'ri qo'shish
    console.log(`So'rov yuborilmoqda: ${url}`); // Debugging uchun URLni chiqarish
    const response = await fetch(url); // Endpointni dinamik qo'shish
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`); // Xatolikni chiqarish
    }
    const data = await response.json(); // JSON formatida ma'lumotni olish
    return data; // Ma'lumotni qaytarish
  } catch (error) {
    console.error("Ma'lumotlarni olishda xatolik:", error); // Xatolikni konsolga chiqarish
    return null; // Xatolik yuzaga kelganda null qaytarish
  }
}

