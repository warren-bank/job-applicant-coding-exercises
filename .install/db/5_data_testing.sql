INSERT INTO `surveys` (`createdAt`, `updatedAt`, `title`, `question`) VALUES
  (NOW(), NOW(), 'Survey 01', 'Favorite color?'),
  (NOW(), NOW(), 'Survey 02', 'Favorite fruit?'),
  (NOW(), NOW(), 'Survey 03', 'Favorite place?'),
  (NOW(), NOW(), 'Survey 04', 'Favorite person?'),
  (NOW(), NOW(), 'Survey 05', 'Favorite food?'),
  (NOW(), NOW(), 'Survey 06', 'Favorite cartoon?');

INSERT INTO `answers` (`createdAt`, `updatedAt`, `survey_id`, `count`, `answer`) VALUES
  (NOW(), NOW(), 1, 190, 'red'),
  (NOW(), NOW(), 1, 003, 'white'),
  (NOW(), NOW(), 1, 010, 'blue'),
  (NOW(), NOW(), 1, 040, 'gold'),

  (NOW(), NOW(), 2, 160, 'apple'),
  (NOW(), NOW(), 2, 040, 'orange'),
  (NOW(), NOW(), 2, 180, 'banana'),
  (NOW(), NOW(), 2, 080, 'pineapple'),

  (NOW(), NOW(), 3, 040, 'beach'),
  (NOW(), NOW(), 3, 030, 'mountains'),
  (NOW(), NOW(), 3, 010, 'forest'),
  (NOW(), NOW(), 3, 090, 'desert'),

  (NOW(), NOW(), 4, 120, 'mother'),
  (NOW(), NOW(), 4, 045, 'father'),
  (NOW(), NOW(), 4, 085, 'spouse'),
  (NOW(), NOW(), 4, 025, 'sibling'),

  (NOW(), NOW(), 5, 030, 'chinese'),
  (NOW(), NOW(), 5, 035, 'italian'),
  (NOW(), NOW(), 5, 025, 'thai'),
  (NOW(), NOW(), 5, 015, 'mexican'),

  (NOW(), NOW(), 6, 070, 'futurama'),
  (NOW(), NOW(), 6, 049, 'family guy'),
  (NOW(), NOW(), 6, 079, 'south park'),
  (NOW(), NOW(), 6, 119, 'voltron');
