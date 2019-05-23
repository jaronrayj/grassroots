USE grassroots_db;


-- Insert a set of records.
INSERT INTO projects (title, description, location, time, date, number_of_people, category_type, createdAt, updatedAt) VALUES ("Clean up the park", "We are going to go to our local park and clean up the dog poop", "DogPark", "14:30", "2019-04-28", 8, "Cleanup", "1989-02-13T02:20", "1989-02-13T02:20");
INSERT INTO projects (title, description, location, time, date, number_of_people, category_type, createdAt, updatedAt) VALUES ("Feed the homeless", "Feeding the homeless", "Soup Kitchen", "06:30", "2019-10-06", 300, "Community Service", "1989-02-13T02:20", "1989-02-13T02:20");
INSERT INTO projects (title, description, location, time, date, number_of_people, category_type, createdAt, updatedAt) VALUES ("Memorial Day Activity", "Put up flags in the cemetary", "Memorial Cemetary", "09:00", "2019-10-06", 4, "Community Service", "1989-02-13T02:20", "1989-02-13T02:20");
INSERT INTO projects (title, description, location, time, date, number_of_people, category_type, createdAt, updatedAt) VALUES ("Pull my finger", "No really, do it", "Classroom", "18:30", "2019-05-23", 4, "Community Service", "1989-02-13T02:20", "1989-02-13T02:20");

SELECT * FROM projects;