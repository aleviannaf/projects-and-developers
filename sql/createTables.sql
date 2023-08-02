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
);


CREATE TABLE IF NOT EXISTS projects (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedTime" VARCHAR(20) NOT NULL,
    "repository" VARCHAR(120) NOT NULL,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP,
    "developerId" INTEGER,
    FOREIGN KEY ("developerId") REFERENCES developers (id) ON DELETE SET NULL
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

CREATE TABLE IF NOT EXISTS projects_technologies (
    id SERIAL PRIMARY KEY,
    "projectId" INTEGER NOT NULL,
    "technologyId" INTEGER NOT NULL,
    "addedIn" TIMESTAMP NOT NULL,
    FOREIGN KEY ("projectId") REFERENCES projects (id) ON DELETE CASCADE,
    FOREIGN KEY ("technologyId") REFERENCES technologies (id) ON DELETE CASCADE
);
