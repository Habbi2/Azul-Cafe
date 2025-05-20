// Database simulation for Azul Café
// In a real production environment, this would be replaced with actual database code (MongoDB, Postgres, etc.)

// Initial data from the JSON file
const initialMenuData = {
  "categorias": [
    {
      "id": "sin-leche",
      "nombre": "Sin Leche",
      "items": [
        {
          "id": "cafe-1",
          "nombre": "ESPRESSO",
          "descripcion": "",
          "precio": 1.50
        },
        {
          "id": "cafe-2",
          "nombre": "ESPRESSO EN AEROPRESS",
          "descripcion": "",
          "precio": 2.50
        },
        {
          "id": "cafe-3",
          "nombre": "LUNGO",
          "descripcion": "Espresso + agua",
          "precio": 1.80
        },
        {
          "id": "cafe-4",
          "nombre": "DOPPIO",
          "descripcion": "Doble espresso",
          "precio": 2.80
        },
        {
          "id": "cafe-5",
          "nombre": "AMERICANO",
          "descripcion": "",
          "precio": 1.80
        },
        {
          "id": "cafe-6",
          "nombre": "FILTRADO",
          "descripcion": "Café de filtro (250 g) orgánico",
          "precio": 2.50
        },
        {
          "id": "cafe-7",
          "nombre": "V60",
          "descripcion": "",
          "precio": 3.00
        }
      ]
    },
    {
      "id": "con-leche",
      "nombre": "Con Leche",
      "items": [
        {
          "id": "conleche-1",
          "nombre": "CORTADO",
          "descripcion": "",
          "precio": 1.80
        },
        {
          "id": "conleche-2",
          "nombre": "MACCHIATO",
          "descripcion": "Espresso + espuma de leche",
          "precio": 1.90
        },
        {
          "id": "conleche-3",
          "nombre": "CAPPUCCINO",
          "descripcion": "Espresso + leche",
          "precio": 2.80
        },
        {
          "id": "conleche-4",
          "nombre": "FLAT WHITE",
          "descripcion": "Doble espresso + leche",
          "precio": 3.20
        },
        {
          "id": "conleche-5",
          "nombre": "LATTE",
          "descripcion": "Espresso + mucha leche",
          "precio": 2.90
        },
        {
          "id": "conleche-6",
          "nombre": "MOCCA",
          "descripcion": "Espresso + leche + chocolate",
          "precio": 3.30
        },
        {
          "id": "conleche-7",
          "nombre": "CHAI LATTE",
          "descripcion": "Té chai + leche + espuma de la casa",
          "precio": 3.50
        },
        {
          "id": "conleche-8",
          "nombre": "DIRTY CHAI LATTE",
          "descripcion": "Chai latte de la casa + espresso",
          "precio": 3.90
        },
        {
          "id": "conleche-9",
          "nombre": "VAINILLA LATTE",
          "descripcion": "",
          "precio": 3.40
        },
        {
          "id": "conleche-10",
          "nombre": "NESQUIK",
          "descripcion": "",
          "precio": 2.80
        }
      ]
    },    {
      "id": "adicionales",
      "nombre": "Adicionales",
      "items": [
        {
          "id": "adicional-1",
          "nombre": "LECHE DE ALMENDRAS",
          "descripcion": "",
          "precio": 0.50
        },
        {
          "id": "adicional-2",
          "nombre": "EXTRA SHOT",
          "descripcion": "",
          "precio": 0.70
        }
      ]
    },
    {
      "id": "bebidas",
      "nombre": "Bebidas",
      "items": [
        {
          "id": "bebida-1",
          "nombre": "AGUA CON/SIN GAS",
          "descripcion": "",
          "precio": 1.50
        },
        {
          "id": "bebida-2",
          "nombre": "COCA-ZERO",
          "descripcion": "355 ml/en lata",
          "precio": 2.00
        }
      ]
    },
    {
      "id": "frios",
      "nombre": "Fríos",
      "items": [
        {
          "id": "frio-1",
          "nombre": "COLD BREW CON/SIN HIELO",
          "descripcion": "",
          "precio": 2.80
        },
        {
          "id": "frio-2",
          "nombre": "COLD BREW TONIC",
          "descripcion": "",
          "precio": 3.20
        },
        {
          "id": "frio-3",
          "nombre": "AFFOGATO",
          "descripcion": "Espresso + helado",
          "precio": 3.50
        },
        {
          "id": "frio-4",
          "nombre": "ICED LATTE",
          "descripcion": "",
          "precio": 3.20
        },
        {
          "id": "frio-5",
          "nombre": "ICED MATCHA",
          "descripcion": "Matcha + leche + hielo",
          "precio": 3.80
        },
        {
          "id": "frio-6",
          "nombre": "COFFEE TONIC",
          "descripcion": "",
          "precio": 3.50
        },
        {
          "id": "frio-7",
          "nombre": "TÉ HELADO DE DURAZNO",
          "descripcion": "",
          "precio": 2.80
        },
        {
          "id": "frio-8",
          "nombre": "LIMO HIBISCUS ICED TEA",
          "descripcion": "",
          "precio": 2.70
        },
        {
          "id": "frio-9",
          "nombre": "EXPRIMIDO DE NARANJA",
          "descripcion": "Zumo natural",
          "precio": 3.20
        }
      ]
    },
    {
      "id": "para-picar",
      "nombre": "Para Picar",
      "items": [
        {
          "id": "picar-1",
          "nombre": "MEDIALUNAS",
          "descripcion": "",
          "precio": 1.80
        },
        {
          "id": "picar-2",
          "nombre": "MEDIALUNAS RELLENAS",
          "descripcion": "Jamón york y queso",
          "precio": 2.50
        },
        {
          "id": "picar-3",
          "nombre": "CINNAMON ROLL",
          "descripcion": "",
          "precio": 2.80
        },
        {
          "id": "picar-4",
          "nombre": "BERRY CARROT",
          "descripcion": "",
          "precio": 3.20
        },
        {
          "id": "picar-5",
          "nombre": "BANANA BREAD",
          "descripcion": "",
          "precio": 3.00
        },
        {
          "id": "picar-6",
          "nombre": "COOKIE RED",
          "descripcion": "",
          "precio": 2.00
        },
        {
          "id": "picar-7",
          "nombre": "COOKIE CHOCOLATE",
          "descripcion": "",
          "precio": 2.00
        },
        {
          "id": "picar-8",
          "nombre": "COOKIE CHOCO VEGANA",
          "descripcion": "",
          "precio": 2.20
        },
        {
          "id": "picar-9",
          "nombre": "PALMERAS",
          "descripcion": "",
          "precio": 1.40
        },
        {
          "id": "picar-10",
          "nombre": "ALFAJORES",
          "descripcion": "",
          "precio": 2.20
        }
      ]
    },
    {
      "id": "sin-gluten",
      "nombre": "Productos Sin Glúten",
      "items": [
        {
          "id": "singluten-1",
          "nombre": "BROWNIE SIN GLUTEN",
          "descripcion": "",
          "precio": 2.80
        },
        {
          "id": "singluten-2",
          "nombre": "PAN SIN GLUTEN",
          "descripcion": "2 tostadas con tomate, aceite y jamón serrano",
          "precio": 3.80
        }
      ]
    },
    {
      "id": "brunch",
      "nombre": "Brunch",
      "items": [
        {
          "id": "brunch-1",
          "nombre": "TOSTADA DE PALTA",
          "descripcion": "Pan hecho en casa con aguacate, tomate y aceite",
          "precio": 4.50
        },
        {
          "id": "brunch-2",
          "nombre": "TOSTADITO CHIPOTLE",
          "descripcion": "Pan de masa madre, huevo, aguacate y aderezo chipotle",
          "precio": 5.20
        },
        {
          "id": "brunch-3",
          "nombre": "REVUELTO",
          "descripcion": "Pan de masa madre, mezcla de ajo negro, tomate y queso + pesto y tomate cherry",
          "precio": 5.80
        },
        {
          "id": "brunch-4",
          "nombre": "BOWL",
          "descripcion": "Yogurt, granola, tomate, aceite y especias",
          "precio": 4.80
        },
        {
          "id": "brunch-5",
          "nombre": "TOSTADAS",
          "descripcion": "2 de pan de masa madre, queso y jamón",
          "precio": 4.50
        },
        {
          "id": "brunch-6",
          "nombre": "PAN TOMACA",
          "descripcion": "2 tostadas + tomate natural + aceite",
          "precio": 3.20
        },
        {
          "id": "brunch-7",
          "nombre": "YOGURT CON GRANOLA",
          "descripcion": "Yogurt griego, granola casera y miel",
          "precio": 3.90
        }
      ]
    }
  ]
};

// Vercel KV Store simulation for serverless environments
// This object will be reset on cold starts, but we'll use environment variables to persist data
let menuData = null;
let lastUpdateTimestamp = null;

// This key will be used for storing/retrieving the menu data in environment variables or other storage
const MENU_DATA_KEY = 'AZUL_CAFE_MENU_DATA';
const MENU_UPDATE_TIMESTAMP_KEY = 'AZUL_CAFE_MENU_UPDATED_AT';

/**
 * Gets current menu data from the best available source:
 * 1. If we have in-memory data that's been updated during this function instance, use that
 * 2. If there's data in the environment variable, use that
 * 3. Fall back to the initial default data
 */
export async function getMenuData() {
  // If we already have menu data in memory, use it
  if (menuData) {
    return menuData;
  }
  
  try {
    // Check if we have data in the environment variable
    if (process.env[MENU_DATA_KEY]) {
      try {
        const parsedData = JSON.parse(process.env[MENU_DATA_KEY]);
        menuData = parsedData;
        
        // Also get the timestamp if available
        if (process.env[MENU_UPDATE_TIMESTAMP_KEY]) {
          lastUpdateTimestamp = parseInt(process.env[MENU_UPDATE_TIMESTAMP_KEY], 10);
        }
        
        console.log(`Retrieved menu data from environment variable. Last updated: ${new Date(lastUpdateTimestamp).toISOString()}`);
        return menuData;
      } catch (e) {
        console.error('Error parsing menu data from environment variable:', e);
      }
    }
    
    // If we couldn't get data from environment variable, use the initial data
    menuData = initialMenuData;
    return menuData;
  } catch (error) {
    console.error('Error getting menu data:', error);
    // Always return something, even if there's an error
    return initialMenuData;
  }
}

/**
 * Updates the menu data both in memory and attempts to persist it
 * in environment variables (which will work for the current deployment)
 */
export async function updateMenuData(newMenuData) {
  try {
    // Update in-memory data
    menuData = newMenuData;
    lastUpdateTimestamp = Date.now();
    
    // Try to update environment variables (this works only in certain environments)
    // For Vercel, this will only update the current instance but is useful for testing
    try {
      if (typeof process.env !== 'undefined') {
        process.env[MENU_DATA_KEY] = JSON.stringify(newMenuData);
        process.env[MENU_UPDATE_TIMESTAMP_KEY] = lastUpdateTimestamp.toString();
      }
    } catch (e) {
      console.log('Could not update environment variables:', e);
      // This is expected in some environments, so we don't throw the error
    }
    
    // Log success
    console.log(`Menu data updated at ${new Date(lastUpdateTimestamp).toISOString()}`);
    
    return { 
      success: true, 
      timestamp: lastUpdateTimestamp,
      message: 'Menu data updated successfully'
    };
  } catch (error) {
    console.error('Error updating menu data:', error);
    throw error;
  }
}
