DROP TABLE IF EXISTS digimon ;
CREATE TABLE digimon (
    id SERIAL PRIMARY KEY ,
    name VARCHAR (255),
    img TEXT , 
    level VARCHAR (255)
)