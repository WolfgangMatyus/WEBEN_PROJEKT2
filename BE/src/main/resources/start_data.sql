INSERT INTO _user (id, email, firstname, lastname, password, role) VALUES (1, 't@test.at', 'R2', 'Grod', '$2a$10$qbykEXhV3yQzZ7m2r4aFdO6uLojN.i06.dl.QMPxnxrxrAEFucdWe', 'ROLE_USER');

INSERT INTO invoice (id, user_id) VALUES (1, 1), (2, 1), (3, 1);

INSERT INTO product (id, name, price, description) VALUES 
(1, 'Produkt 1', 10.99, 'Beschreibung 1'), 
(2, 'Produkt 2', 19.99, 'Beschreibung 2'), 
(3, 'Produkt 3', 8.50, 'Beschreibung 3'),
(4, 'Produkt 4', 14.99, 'Beschreibung 4'),
(5, 'Produkt 5', 19.99, 'Beschreibung 5'),
(6, 'Produkt 6', 21.99, 'Beschreibung 6'),
(7, 'Produkt 7', 19.99, 'Beschreibung 7'),
(8, 'Produkt 8', 12.99, 'Beschreibung 8'),
(9, 'Produkt 9', 2.50, 'Beschreibung 9');


INSERT INTO invoice_entry (id, invoice_id, product_id, quantity) VALUES (1, 1, 1, 2), (2, 1, 2, 1), (3, 1, 3, 3);

INSERT INTO invoice_entry (id, invoice_id, product_id, quantity) VALUES (4, 2, 4, 1), (5, 2, 5, 2), (6, 2, 6, 1);

INSERT INTO invoice_entry (id, invoice_id, product_id, quantity) VALUES (7, 3, 7, 3), (8, 3, 8, 1), (9, 3, 9, 2);

