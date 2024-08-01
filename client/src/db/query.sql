--Get_Books
SELECT * FROM users;

--GET_BOOKS
SELECT * FROM books;

--GET_BOOKCLUBS
SELECT * FROM bookclubs;

--Add a new User
INSERT INTO users (username, email, password) VALUES ('john_doe', 'john@example.com', 'securepassword');

--Add a new Book
INSERT INTO books (title, author, genre, published_date, summary) 
VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', 'A summary of the book');

--Update a User
UPDATE users SET email = 'john_new@example.com' WHERE id = 1;

--Update a Book
UPDATE books SET summary = 'An updated summary' WHERE id = 1;

--Update a Bookclub
UPDATE bookclubs SET name ='New Club Name' WHERE id = 1;

--Delete a User
DELETE FROM users WHERE id = 1;

--Delete a Book
DELETE FROM books WHERE id = 1;

--Delete a Book Club
DELETE FROM bookclubs WHERE id = 1;

--Get Books by a Specific User
SELECT b.*
FROM books b
JOIN user_books ub ON b.id = ub.book_id
JOIN users u ON u.id = ub.user_id
WHERE u.id = 1;

--Get Book Clubs by a Specific User
SELECT bc.*
FROM bookclubs bc
JOIN user_bookclubs ubc ON bc.id = ubc.bookclub_id
JOIN users u ON u.id = ubc.user_id
WHERE u.id = 1;

--Get Books in a Specific Book Club
SELECT b.*
FROM books b
JOIN bookclub_books bcb ON b.id = bcb.book_id
JOIN bookclubs bc ON bc.id = bcb.bookclub_id
WHERE bc.id = 1;

--Add and Update Rating
INSERT INTO book_ratings (user_id, book_id, rating)
VALUES (1, 1, 5)
ON CONFLICT (user_id, book_id)
DO UPDATE SET rating = EXCLUDED.rating;

--Delete Users from a Book Club
DELETE FROM user_bookclubs
WHERE user_id = 1 AND bookclub_id = 1;

--Delete Books from a Book Club
DELETE FROM bookclub_books
WHERE book_id = 1 AND bookclub_id = 1;

--Create a New Book List
CREATE TABLE book_lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

--Add Books to a Book List
INSERT INTO list_books (list_id, book_id) VALUES (1, 1);

--Remove Books from a Book List
DELETE FROM list_books WHERE list_id = 1 AND book_id = 1;

--Update Book List Name
UPDATE book_lists SET name = 'New List Name' WHERE id = 1;

--Add Users to a User List
INSERT INTO list_users (list_id, user_id) VALUES (1, 1);

--Remove Users from a User List
DELETE FROM list_users WHERE list_id = 1 AND user_id = 1;

--Update User List Name
UPDATE user_lists SET name = 'New User List Name' WHERE id = 1;

-- Add a Book to User's Saved Books
INSERT INTO user_books (user_id, book_id) VALUES (1, 1)
ON CONFLICT (user_id, book_id)
DO NOTHING;

