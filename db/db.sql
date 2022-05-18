DROP TABLE IF EXISTS imcs CASCADE;
CREATE TABLE imcs(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

/* se agrega info manualmente */
INSERT INTO imcs(
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'Bajo Peso',
	'bajo/main',
	'2021-05-22',
	'2021-05-22'
);

INSERT INTO imcs(
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'Normal',
	'normal/main',
	'2021-05-22',
	'2021-05-22'
);

INSERT INTO imcs(
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'Sobrepeso',
	'sobre/main',
	'2021-05-22',
	'2021-05-22'
);

INSERT INTO imcs(
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'Obesidad',
	'obesidad/main',
	'2021-05-22',
	'2021-05-22'
);



/* Para eliminar tabla si existe y no cause error*/
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(80) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(10) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

/* ON UPDATE CASCADE ON DELETE CASCADE para actualizar o eliminar
automáticamente esos valores*/
DROP TABLE IF EXISTS user_has_imcs CASCADE;
CREATE TABLE user_has_imcs(
	id_user BIGSERIAL NOT NULL,
	id_imc BIGSERIAL NOT NULL,
    imc_value VARCHAR(10) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_imc) REFERENCES imcs(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_imc)
)
