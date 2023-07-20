create type "preferredOS" as ENUM('Windows', 'Linux', 'MacOs');

create table if not exists "developer_infos"(
    id SERIAL primary key,
    "developerSince" TIMESTAMP not null,
    "preferredOS" "preferredOS" not null
);

create table if not EXISTS developers(
    id SERIAL primary key,
    "name" VARCHAR(50) not null,
    "email" VARCHAR(50) unique not null,
    "developerInfoId" INTEGER UNIQUE,
    FOREIGN KEY("developerInfoId") REFERENCES developer_infos(id)
    ON DELETE CASCADE
);


create table if not exists "projects"(
    id SERIAL primary key,
    "name" VARCHAR(50) not null,
    "description" TEXT not null,
    "estimatedTime" VARCHAR(20) not null,
    "repository" VARCHAR(120) not null,
    "startDate" TIMESTAMP not null,
    "endDate" TIMESTAMP
);

create type "tech" as ENUM(
    'JavaScript',
    'Python',
    'React',
    'Express.js',
    'HTML',
    'CSS',
    'Django',
    'PostgreSQL',
    'MongoDB'
);

create table if not exists "technologies"(id SERIAL primary key, name "tech" not null);

create table if not exists "projects_technologies"(
    id SERIAL primary key,
    addedIn TIMESTAMP not NULL
);