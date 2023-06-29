INSERT INTO _user (id, email, firstname, lastname, password, role) VALUES (1, 't@test.at', 'R2', 'Grod', '$2a$10$qbykEXhV3yQzZ7m2r4aFdO6uLojN.i06.dl.QMPxnxrxrAEFucdWe', 'ROLE_USER');

INSERT INTO invoice (id, user_id) VALUES (1, 1), (2, 1), (3, 1);

INSERT INTO product (id, name, price, description, category, img_path, rating) VALUES
(1,'Pokerkoffer', 49.90, 'Beschreibung 1', 'Kartenspiel', '1.jpg', 4),
(2, 'Mensch', 19.99, 'Beschreibung 2', 'Brettspiel', '2.jpg', 2),
(3, 'Würfel', 19.90, 'Beschreibung 3', 'Kategorie 1', '3.jpg', 3),
(4, 'Bridge', 14.99, 'Beschreibung 4', 'Kategorie 1', '4.jpg', 5),
(5, 'Dame', 19.99, 'Beschreibung 5', 'Kategorie 1', '5.jpg', 4),
(6, 'Schach', 21.99, 'Beschreibung 6', 'Kategorie 1', '6.jpg', 1);

INSERT INTO invoice_entry (id, invoice_id, product_id, quantity) VALUES (1, 1, 1, 2), (2, 1, 2, 1), (3, 1, 3, 3);

INSERT INTO invoice_entry (id, invoice_id, product_id, quantity) VALUES (4, 2, 4, 1), (5, 2, 5, 2), (6, 2, 6, 1);

INSERT INTO invoice_entry (id, invoice_id, product_id, quantity) VALUES (7, 3, 7, 3), (8, 3, 8, 1), (9, 3, 9, 2);

