export const componentsList = {
    BoxCase: {
      "Standard Box": { price: 2000, image: "/images/boxcase.png" },
      "RGB Box": { price: 5000, image: "C:\Users\vaish\OneDrive\Desktop\Projects\GvPcWorld-mern\client\src\assets\images\boxcase.png" },
      "Full Tower Box": { price: 8000, image: "/images/boxcase.png" },
    },
    Motherboard: {
      "ASUS ROG Strix": { price: 30000, image: "/images/motherboard.png" },
      "MSI B450": { price: 15000, image: "/images/motherboard.png" },
      "Gigabyte Aorus": { price: 25000, image: "/images/motherboard.png" },
    },
    Processor: {
      "Intel i9": { price: 50000, image: "/images/processor.png" },
      "AMD Ryzen 9": { price: 45000, image: "/images/processor.png" },
    },
    RAM: {
      "16GB DDR4": { price: 7000, image: "/images/ram.png" },
      "32GB DDR4": { price: 12000, image: "/images/ram.png" },
    },
    Monitor: {
      "24-inch Monitor": { price: 20000, image: "/images/monitor.png" },
      "27-inch Monitor": { price: 25000, image: "/images/monitor.png" },
    },
    GPU: {
      "NVIDIA RTX 3080": { price: 80000, image: "/images/gpu.png" },
      "AMD Radeon RX 6800": { price: 70000, image: "/images/gpu.png" },
    },
    Storage: {
      "1TB SSD": { price: 10000, image: "/images/storage.png" },
      "2TB HDD": { price: 8000, image: "/images/storage.png" },
    },
    PowerSupply: {
      "750W PSU": { price: 10000, image: "/images/powersupply.png" },
      "850W PSU": { price: 12000, image: "/images/powersupply.png" },
    },
    Cooling: {
      "Air Cooler": { price: 5000, image: "/images/coolant.png" },
      "Liquid Cooler": { price: 10000, image: "/images/coolant.png" },
    },
    Mouse: {
      "Logitech MX Master": { price: 10000, image: "/images/mouse.png" },
      "Razer DeathAdder": { price: 8000, image: "/images/mouse.png" },
    },
    Keyboard: {
      "Mechanical Keyboard": { price: 15000, image: "/images/keyboard.png" },
      "Membrane Keyboard": { price: 6000, image: "../" },
    },
  };
  
  // Helper functions
export const calculateTotalPrice = (components) => {
    return Object.values(components).reduce((total, component) => {
      return total + component.price;
    }, 0);
  };
  
export const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

export const preBuiltConfigs = [
  {
    id: 'prebuilt-gaming-beast',
    name: 'Gaming Beast',
    components: {
      Processor: {
        category: 'Processor',
        component: 'Intel i9',
        price: 50000,
        image: '/images/processors/intel.jpg'
      },
      GPU: {
        category: 'GPU',
        component: 'NVIDIA RTX 3080',
        price: 80000,
        image: '/images/gpus/nvidia.jpg'
      },
      RAM: {
        category: 'RAM',
        component: '32GB DDR4',
        price: 12000,
        image: '/images/ram/32gb.jpg'
      },
      BoxCase: {
        category: 'BoxCase',
        component: 'RGB Box',
        price: 5000,
        image: '/images/cases/rgb.jpg'
      },
      Motherboard: {
        category: 'Motherboard',
        component: 'ASUS ROG Strix',
        price: 30000,
        image: '/images/motherboards/asus-rog.jpg'
      },
      Storage: {
        category: 'Storage',
        component: '1TB SSD',
        price: 10000,
        image: '/images/storage/ssd.jpg'
      },
      PowerSupply: {
        category: 'PowerSupply',
        component: '850W PSU',
        price: 12000,
        image: '/images/psu/850w.jpg'
      },
      Cooling: {
        category: 'Cooling',
        component: 'Liquid Cooler',
        price: 10000,
        image: '/images/cooling/liquid.jpg'
      },
      Monitor: {
        category: 'Monitor',
        component: '27-inch Monitor',
        price: 25000,
        image: '/images/monitors/27inch.jpg'
      },
      Mouse: {
        category: 'Mouse',
        component: 'Razer DeathAdder',
        price: 8000,
        image: '/images/mice/razer.jpg'
      },
      Keyboard: {
        category: 'Keyboard',
        component: 'Mechanical Keyboard',
        price: 15000,
        image: '/images/keyboards/mechanical.jpg'
      }
    },
    totalPrice: 257000,
    createdAt: '2024-01-01T00:00:00.000Z',
    isPreBuilt: true
  },
  {
    id: 'prebuilt-budget-warrior',
    name: 'Budget Warrior',
    components: {
      Processor: {
        category: 'Processor',
        component: 'AMD Ryzen 9',
        price: 45000,
        image: '/images/processors/amd.jpg'
      },
      GPU: {
        category: 'GPU',
        component: 'AMD Radeon RX 6800',
        price: 70000,
        image: '/images/gpus/amd.jpg'
      },
      RAM: {
        category: 'RAM',
        component: '16GB DDR4',
        price: 7000,
        image: '/images/ram/16gb.jpg'
      },
      BoxCase: {
        category: 'BoxCase',
        component: 'Standard Box',
        price: 2000,
        image: '/images/cases/standard.jpg'
      },
      Motherboard: {
        category: 'Motherboard',
        component: 'MSI B450',
        price: 15000,
        image: '/images/motherboards/msi.jpg'
      },
      Storage: {
        category: 'Storage',
        component: '2TB HDD',
        price: 8000,
        image: '/images/storage/hdd.jpg'
      },
      PowerSupply: {
        category: 'PowerSupply',
        component: '750W PSU',
        price: 10000,
        image: '/images/psu/750w.jpg'
      },
      Cooling: {
        category: 'Cooling',
        component: 'Air Cooler',
        price: 5000,
        image: '/images/cooling/air.jpg'
      },
      Monitor: {
        category: 'Monitor',
        component: '24-inch Monitor',
        price: 20000,
        image: '/images/monitors/24inch.jpg'
      },
      Mouse: {
        category: 'Mouse',
        component: 'Logitech MX Master',
        price: 10000,
        image: '/images/mice/logitech.jpg'
      },
      Keyboard: {
        category: 'Keyboard',
        component: 'Membrane Keyboard',
        price: 6000,
        image: '/images/keyboards/membrane.jpg'
      }
    },
    totalPrice: 198000,
    createdAt: '2024-01-01T00:00:00.000Z',
    isPreBuilt: true
  }
];
