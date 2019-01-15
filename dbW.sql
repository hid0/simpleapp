CREATE DATABASE db_nodesimple;
CREATE TABLE IF NOT EXIST 'players' (
    'id' int(5) NOT NULL AUTO_INCREMENT,
    'first_name' varchar(40) NOT NULL,
    'last_name' varchar(30) NOT NULL,
    'position' varchar(100) NOT NULL,
    'number' int(11) NOT NULL,
    'image' varchar(255) NOT NULL,
    'user_name' varchar(25) NOT NULL,
    PRIMARY KEY ('id')
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;