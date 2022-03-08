CREATE TABLE "user" (
--1
	"id" SERIAL PRIMARY KEY,
	"username" varchar(255) NOT NULL UNIQUE,
	"admin" BOOLEAN NOT NULL,
	"password" varchar NOT NULL
);

CREATE TABLE "customers" (
--2
	"customer_id" SERIAL PRIMARY KEY,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"phone" varchar(20),
	"email" varchar(200),
	"street" varchar(200),
	"city" varchar(100),
	"state" varchar(100),
	"zip_code" varchar(10)
);

CREATE TABLE "stores" (
--3
	"store_id" SERIAL PRIMARY KEY,
	"store_name" varchar(100),
	"phone" varchar(20),
	"email" varchar(200),
	"street" varchar(200),
	"city" varchar(100),
	"state" varchar(100),
	"zip_code" varchar(10)
);

CREATE TABLE "staff" (
--4
	"staff_id" SERIAL PRIMARY KEY,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"phone" varchar(20),
	"email" varchar(200),
	"store_id" INT REFERENCES "stores",
	"manager_id" INT REFERENCES "staff",
	"active" BOOLEAN
);

CREATE TABLE "brands" (
--5
	"brand_id" SERIAL PRIMARY KEY,
	"brand_name" varchar(50)
);

CREATE TABLE "categories" (
--6
	"category_id" SERIAL PRIMARY KEY,
	"category_name" varchar(50)
);

CREATE TABLE "products" (
--7
	"product_id" SERIAL PRIMARY KEY,
	"product_name" varchar(100),
	"brand_id" INT REFERENCES "brands",
	"category_id" INT REFERENCES "categories",
	"model_year" INT,
	"list_price" NUMERIC
);

CREATE TABLE "stocks" (
--8
	"store_id" INT REFERENCES "stores",
	"product_id" INT REFERENCES "products",
	"quantity" INT
);

CREATE TABLE "orders" (
--9
	"order_id" SERIAL PRIMARY KEY,
	"customer_id" INT REFERENCES "customers",
	"order_status" varchar(20),
	"order_date" DATE,
	"required_date" DATE,
	"shipped_date" DATE,
	"store_id" INT REFERENCES "stores",
	"staff_id" INT REFERENCES "staff"
);

CREATE TABLE "order_items" (
--10
	"order_id" INT REFERENCES "orders",
	"item_id" varchar(50),
	"product_id" INT REFERENCES "products",
	"quantity" INT,
	"list_price" NUMERIC,
	"discount_percentage" INT 
);