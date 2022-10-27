CREATE DATABASE IF NOT EXISTS k8s_node;
USE k8s_node;

DROP TABLE IF EXISTS test_table;

CREATE TABLE test_table(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    CONSTRAINT unique_user_email UNIQUE(email)
    );