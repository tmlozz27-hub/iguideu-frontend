export function saveReservation({ guideId, date, hours, notes, amount }) {
  const key = "iguideu:reservations";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  const item = {
    id: "r" + Date.now(),
    guideId, date, hours, notes, amount,
    createdAt: new Date().toISOString()
  };
  list.push(item);
  localStorage.setItem(key, JSON.stringify(list));
  return item;
}

export function getReservations() {
  const key = "iguideu:reservations";
  return JSON.parse(localStorage.getItem(key) || "[]");
}
