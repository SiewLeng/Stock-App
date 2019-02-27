-- create pokemons table
DROP TABLE IF EXISTS company;

CREATE TABLE IF NOT EXISTS company (
	company_id SERIAL,
	symbol TEXT PRIMARY KEY,
	name TEXT,
	type TEXT,
	region TEXT,
	market_open TEXT,
	market_close TEXT,
	timezone TEXT,
	currency TEXT
);

DROP TABLE IF EXISTS buy;

CREATE TABLE IF NOT EXISTS buy (
	buy_id SERIAL PRIMARY KEY,
	company_symbol TEXT,
	quantity INTEGER,
	purchase_date timestamp DEFAULT now(),
	purchase_date_zone timestamptz DEFAULT now(),
	price_sgd real,
	price real
);

DROP TABLE IF EXISTS sold;

CREATE TABLE IF NOT EXISTS sold (
	sold_id SERIAL PRIMARY KEY,
	company_id INTEGER,
	quantity INTEGER,
	purchase_date timestamp,
	purchase_date_zone timestamptz,
	buy_price_sgd real,
	buy_price real,
	sold_date timestamp DEFAULT now(),
	sold_date_zone timestamptz DEFAULT now(),
	sold_price_sgd real,
	sold_price real,
	dividend real,
	dividend_sgd real
);