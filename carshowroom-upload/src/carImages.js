// Arrow function mapping a car's unique API ID to a unique automotive image slot
export const getCarImage = (modelId) => {
  // Array of completely different vehicle photo profiles from Unsplash
  const vehicleInventoryPhotos = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", // Porsche
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80", // Corvette
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80", // Muscle Car
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80", // Luxury Sedan
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80", // Truck
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80", // Sports Car Side
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80", // Modern Compact
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80", // BMW Sedan
    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80", // Tesla EV
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80", // Luxury Interior Look
    "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80", // SUV Forest Drive
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80"  // Red Supercar
  ];

  // The Modulo (%) operator ensures we grab a clean index item based on the unique Model_ID
  const imageIndex = modelId % vehicleInventoryPhotos.length;
  
  return vehicleInventoryPhotos[imageIndex];
};