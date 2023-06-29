REPLACE INTO _user (id, email, firstname, lastname, password, role) VALUES (1, 't@test.at', 'R2', 'Grod', '$2a$10$qbykEXhV3yQzZ7m2r4aFdO6uLojN.i06.dl.QMPxnxrxrAEFucdWe', 'ROLE_USER');

REPLACE INTO cart (id, total, user_id) VALUES (1, 0, 1), (2, 0, 1), (3, 0, 1);

REPLACE INTO product (id, name, price, description, category, img_path, rating) VALUES
(1,'Pokerkoffer', 49.90, 'Beschreibung 1', 'Kartenspiel', '1.jpg', 4),
(2, 'Mensch', 19.99, 'Beschreibung 2', 'Brettspiel', '2.jpg', 2),
(3, 'Würfel', 19.90, 'Beschreibung 3', 'Komponenten', '3.jpg', 3),
(4, 'Bridge', 14.99, 'Beschreibung 4', 'Kartenspiel', '4.jpg', 5),
(5, 'Dame', 19.99, 'Beschreibung 5', 'Brettspiel', '5.jpg', 4),
(6, 'Schach', 21.99, 'Beschreibung 6', 'Brettspiel', '6.jpg', 1);


REPLACE INTO cart_entry (id, cart_id, product_id, quantity) VALUES (1, 1, 1, 2), (2, 1, 2, 1), (3, 1, 3, 3);

REPLACE INTO cart_entry (id, cart_id, product_id, quantity) VALUES (4, 2, 4, 1), (5, 2, 5, 2), (6, 2, 6, 1);

REPLACE INTO cart_entry (id, cart_id, product_id, quantity) VALUES (7, 3, 7, 3), (8, 3, 8, 1), (9, 3, 9, 2);

