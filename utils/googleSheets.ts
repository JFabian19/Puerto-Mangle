
import { RestaurantData, MenuCategory, MenuItem } from '../types';
import { RESTAURANT_DATA as DEFAULT_DATA } from '../constants';

const SPREADSHEET_ID = '1NuLVbV6z9WpMr4PBDHNoSyozP7hlDZiSG0qmWzE2uek';

// CSV Parser that correctly handles quotes and escaped quotes
const parseCSV = (text: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentField = '';
    let insideQuotes = false;

    // Normalize newlines
    const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    for (let i = 0; i < cleanText.length; i++) {
        const char = cleanText[i];
        const nextChar = cleanText[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                currentField += '"';
                i++; // Skip escape quote
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            currentRow.push(currentField);
            currentField = '';
        } else if (char === '\n' && !insideQuotes) {
            currentRow.push(currentField);
            rows.push(currentRow);
            currentRow = [];
            currentField = '';
        } else {
            currentField += char;
        }
    }

    // Add last field/row if exists
    if (currentField || currentRow.length > 0) {
        currentRow.push(currentField);
        rows.push(currentRow);
    }

    return rows;
};

const normalizeHeader = (header: string): string => {
    return header.toLowerCase().trim().replace(/^"|"$/g, '').replace(/\s+/g, '_');
};

const fetchSheet = async (sheetName: string): Promise<any[]> => {
    try {
        const response = await fetch(
            `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch sheet ${sheetName}: ${response.statusText}`);
        }

        const text = await response.text();
        const rows = parseCSV(text);

        if (rows.length < 2) return [];

        const rawHeaders = rows[0];
        // Allow duplicates in headers array to handle cases where user has multiple columns with same name
        // (e.g. 'imagen' empty in col C, and 'Imagen' with url in col E)
        const headers = rawHeaders.map(h => normalizeHeader(h));

        // Map rows to objects
        const data = rows.slice(1).map(row => {
            const obj: any = {};
            row.forEach((cell, index) => {
                const header = headers[index];
                if (header) {
                    const val = cell.trim();
                    // If key doesn't exist, set it.
                    // If key exists but is empty, and new val is NOT empty, overwrite it.
                    // This allows the non-empty duplicate column to "win".
                    if (obj[header] === undefined || (obj[header] === '' && val !== '')) {
                        obj[header] = val;
                    }
                }
            });
            return obj;
        });

        console.log(`Loaded ${sheetName}: ${data.length} rows`);
        return data;
    } catch (error) {
        console.error(`Error loading ${sheetName}:`, error);
        return [];
    }
};

export const fetchRestaurantData = async (): Promise<RestaurantData> => {
    try {
        const [categoriesRaw, platesRaw] = await Promise.all([
            fetchSheet('CATEGORIAS'),
            fetchSheet('PLATOS')
        ]);

        if (categoriesRaw.length === 0) {
            console.warn('No categories found, using default data');
            return DEFAULT_DATA;
        }

        // Sort categories
        const sortedCategories = categoriesRaw.sort((a, b) => {
            const orderA = parseInt(a.orden) || 999;
            const orderB = parseInt(b.orden) || 999;
            return orderA - orderB;
        });

        const menu: MenuCategory[] = sortedCategories.map((cat: any) => {
            // Flexible matching for ID
            const catId = cat.id;

            // Filter items
            const catItems = platesRaw.filter((p: any) => {
                // Try to match exact string or number
                return p.categoria_id === catId ||
                    String(p.categoria_id) === String(catId);
            });

            const items: MenuItem[] = catItems.map((p: any) => ({
                nombre: p.nombre || 'Sin nombre',
                descripcion: p.descripcion || '',
                precio: parseFloat(p.precio) || 0,
                imagen: p.imagen || undefined
            }));

            return {
                categoria: cat.nombre || 'Sin categoria',
                imagen: cat.imagen || undefined,
                items: items
            };
        });

        return {
            ...DEFAULT_DATA,
            menu: menu
        };

    } catch (error) {
        console.error('Fatal parsing error:', error);
        return DEFAULT_DATA;
    }
};
