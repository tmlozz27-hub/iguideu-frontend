export const guides = [
  { id: "g1", name: "Ana – Buenos Aires", price: 3500, languages: ["es","en"], rating: 4.8, bio: "City tour, Tigre, Caminito." },
  { id: "g2", name: "Bruno – Mendoza",     price: 4200, languages: ["es","pt"], rating: 4.6, bio: "Bodegas, alta montaña." },
  { id: "g3", name: "Carla – Iguazú",      price: 3900, languages: ["es","en"], rating: 4.9, bio: "Parque Nacional, aventuras." }
];

export function getGuide(id){
  return guides.find(g => g.id === id) || null;
}
