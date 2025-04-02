CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quantity TEXT,
    price DECIMAL(10, 2) NOT NULL, 
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    UNIQUE KEY unique_cart_product (cart_id, product_id) 
);

INSERT INTO users (username, email, password) 
VALUES ('test', 'test@test.fr', 'password');

INSERT INTO products (name, description, quantity, price, stock, image_url) 
VALUES 
    ('ZEN CODE', 'Focus & Concentration for long hours of code', '60', 19.99, 100, '/images/image_cp4.png'),
    ('HARD CODE', 'Boost & Energy to win the Hackaton and beat every bugs', '60', 19.99, 100, '/images/image2_cp4.png'),
    ('SLEEP CODE', 'Relax & Sleep after long day of git reset --hard', '60', 19.99, 100, '/images/image3_cp4.png');

INSERT INTO carts (user_id) 
VALUES (1);