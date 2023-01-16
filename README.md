# Poker Backend

## Stack

- Express (typescript)

## Get Started

## Install dependencies

```
yarn
```

### Run application

```
yarn start
```

### Run tests

```
yarn test
```

## API

| Method | URL          | request body(required\*)                       | Description                    |
| ------ | ------------ | ---------------------------------------------- | ------------------------------ |
| GET    | /            | -                                              | displays port                  |
| GET    | /game/new    | -                                              | start a new game. draw 5 cards |
| POST   | /game/change | myCards*, toChange*, count=1                   | change cards                   |
| GET    | /auth        | -                                              | checks cookie to find user     |
| POST   | /auth/signup | username*, email*, password*, confirmPassword* | user signup                    |
| POST   | /auth/login  | email*, password*                              | user login                     |
| GET    | /auth/logout | -                                              | user logout(delete cookie)     |
