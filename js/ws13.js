/*******************************
 *  EMPLOYEE LOGIN SYSTEM
 *******************************/
const fs = require('fs');
const LOGIN_FILE = 'EmpLogin.txt';

function writeLoginDetails(data) {
    let jsonString = JSON.stringify(data) + '\n';
    try {
        fs.appendFileSync(LOGIN_FILE, jsonString);
        console.log('Login details written successfully.');
    } catch (err) {
        console.error('Error writing to file:', err.message);
    }
}

function countLateLogins(targetDate) {
    let lateCount = 0;

    try {
        if (!fs.existsSync(LOGIN_FILE)) {
            console.log('File does not exist. Late login count is 0.');
            return 0;
        }

        const data = fs.readFileSync(LOGIN_FILE, 'utf8');
        const lines = data.trim().split('\n');

        for (const line of lines) {
            if (line.trim() === '') continue;

            try {
                const entry = JSON.parse(line);

                if (entry.Date === targetDate) {
                    const [hour, minute] = entry.TimeIn.split(':').map(Number);
                    if (hour > 10 || (hour === 10 && minute > 0)) {
                        lateCount++;
                    }
                }
            } catch (e) {
                console.error('Error parsing JSON line:', e.message);
            }
        }

        return lateCount;
    } catch (err) {
        console.error('Error reading file:', err.message);
        return 0;
    }
}

// Sample login data
const loginData1 = { EmpID: 'E001', Date: '2025-10-29', TimeIn: '09:30', TimeOut: '17:30' };
const loginData2 = { EmpID: 'E002', Date: '2025-10-29', TimeIn: '10:05', TimeOut: '18:00' };
const loginData3 = { EmpID: 'E003', Date: '2025-10-30', TimeIn: '10:00', TimeOut: '18:00' };
const loginData4 = { EmpID: 'E004', Date: '2025-10-29', TimeIn: '11:15', TimeOut: '19:00' };

writeLoginDetails(loginData1);
writeLoginDetails(loginData2);
writeLoginDetails(loginData3);
writeLoginDetails(loginData4);

const targetDate = '2025-10-29';
const count = countLateLogins(targetDate);

console.log(`\nNumber of employees logged in after 10AM on ${targetDate}: ${count}`);




/*******************************
 *  PRODUCT CSV STOCK SYSTEM
 *******************************/
const PROD_FILE = 'Prod.csv';
const BUFFER_STOCK = 10;

function createNewProductsFile() {
    try {
        fs.writeFileSync(PROD_FILE, 'ProdID,description,Price,Stock\n');
        console.log('New products file (Prod.csv) created successfully.');
    } catch (err) {
        console.error('Error creating file:', err.message);
    }
}

function addProducts(products) {
    let csvData = '';

    for (const prod of products) {
        csvData += `${prod.ProdID},${prod.description},${prod.Price},${prod.Stock}\n`;
    }

    try {
        fs.appendFileSync(PROD_FILE, csvData);
        console.log('New products added successfully.');
    } catch (err) {
        console.error('Error appending products:', err.message);
    }
}

function readAllProducts() {
    try {
        if (!fs.existsSync(PROD_FILE)) {
            console.log('Product file does not exist.');
            return [];
        }

        const data = fs.readFileSync(PROD_FILE, 'utf8').trim();
        const lines = data.split('\n');

        if (lines.length <= 1) return [];

        const header = lines[0].split(',');
        const products = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');

            if (values.length === header.length) {
                const product = {};

                for (let j = 0; j < header.length; j++) {
                    product[header[j].trim()] = values[j].trim();
                }

                product.Stock = parseInt(product.Stock);
                products.push(product);
            }
        }

        return products;
    } catch (err) {
        console.error('Error reading product file:', err.message);
        return [];
    }
}

function updateLowStock(newStock) {
    let products = readAllProducts();
    let updatedCount = 0;

    for (let product of products) {
        if (product.Stock < BUFFER_STOCK) {
            product.Stock = newStock;
            updatedCount++;

            console.log(`Updated stock for ${product.description} (ID: ${product.ProdID}) to ${newStock}.`);
        }
    }

    let updatedCsv = 'ProdID,description,Price,Stock\n';

    for (const prod of products) {
        updatedCsv += `${prod.ProdID},${prod.description},${prod.Price},${prod.Stock}\n`;
    }

    try {
        fs.writeFileSync(PROD_FILE, updatedCsv.trim());
        console.log(`\nStock updated successfully. Total items updated: ${updatedCount}`);
    } catch (err) {
        console.error('Error writing updated file:', err.message);
    }
}

// Test product section
createNewProductsFile();

const initialProducts = [
    { ProdID: 'P001', description: 'Laptop', Price: 50000, Stock: 15 },
    { ProdID: 'P002', description: 'Mouse', Price: 500, Stock: 8 },
    { ProdID: 'P003', description: 'Keyboard', Price: 1500, Stock: 12 },
    { ProdID: 'P004', description: 'Monitor', Price: 12000, Stock: 5 }
];

addProducts(initialProducts);
updateLowStock(20);




/*******************************
 *  ORDERS (FOOD DELIVERY SYSTEM)
 *******************************/
const readline = require('readline-sync');
const ORDER_FILE = 'Orders.json';

function ensureFileExists() {
    if (!fs.existsSync(ORDER_FILE)) {
        try {
            fs.writeFileSync(ORDER_FILE, '[]');
            console.log('Orders file created.');
        } catch (err) {
            console.error('Error creating orders file:', err.message);
        }
    }
}

function readAllOrders() {
    try {
        const data = fs.readFileSync(ORDER_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading orders file:', err.message);
        return [];
    }
}

function writeOrder(order) {
    const orders = readAllOrders();
    orders.push(order);

    try {
        fs.writeFileSync(ORDER_FILE, JSON.stringify(orders, null, 2));
        console.log('Order saved successfully.');
    } catch (err) {
        console.error('Error writing order file:', err.message);
    }
}

function addNewOrder() {
    console.log('\n--- Add New Order ---');

    const orderId = readline.question('Enter Order ID: ');
    const item = readline.question('Enter Food Item Name: ');
    const quantity = parseInt(readline.question('Enter Quantity: '));
    const price = parseFloat(readline.question('Enter Item Price: '));
    const total = quantity * price;

    if (isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
        console.log('Invalid quantity or price. Order cancelled.');
        return;
    }

    const newOrder = {
        orderId,
        item,
        quantity,
        price,
        total
    };

    writeOrder(newOrder);
}

function printTotalSales() {
    const orders = readAllOrders();
    let totalSales = 0;

    for (const order of orders) {
        totalSales += order.total;
    }

    console.log(`\n--- Total Sales ---`);
    console.log(`Total revenue generated from all orders: Rs. ${totalSales.toFixed(2)}`);
    console.log('-------------------');
}

function displayMenu() {
    console.log('\n=======================================');
    console.log(' Food Delivery System Menu');
    console.log('=======================================');
    console.log('1. Add New Order');
    console.log('2. Print Total Sales (Console)');
    console.log('3. Exit');
    console.log('=======================================');
}

function main() {
    ensureFileExists();

    let choice = '';

    while (choice !== '3') {
        displayMenu();
        choice = readline.question('Enter your choice (1-3): ');

        switch (choice) {
            case '1':
                addNewOrder();
                break;
            case '2':
                printTotalSales();
                break;
            case '3':
                console.log('Exiting Food Delivery System. Goodbye!');
                break;
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
}

main();
