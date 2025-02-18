# CASH FLOW

## What is it?
This is an web app designed to run localy. This is was a freelance work for someone who has a small business e needed some to manage cash flow. The language available is portuguese only.

## How it works?
- Create an account using email/nickname and password
- Create and manage your services
- Create and manage your employee
- Create and manage other costs
- Create and manage your services requests
- View a summary of your cash management in a detailed Dashboard and filter by week, month, year or any period

## What is it made of?
I decided to use [Golang](https://go.dev/) to make a compiled app to be easely executed.

### Backend
  I'm using [Gin](https://gin-gonic.com/) for server and [Gorm](https://gorm.io/) to manage database which is [SQLite](https://www.sqlite.org/).

### Frontend
  I'm using [ReactJS](https://react.dev/) with [Typescript](https://www.typescriptlang.org/). For styling [TailwindCSS](https://tailwindcss.com/).


### Structure
  Using golang I built two servers: one for RestAPI and another one, a static server, for web UI. The servers are compiled in a single executable file and the web UI is built for production

## How can I use it?
- Install all dependencies for Go and Node/React
- Build the react application for production:
```
bash scripts/build-static.sh
```
- Build the go application
```
bash scripts/build.sh
```
- Execute the file "cash" located in folter "build"

After build the applications you just need to run the executable file and it should open automatically the web UI in your browser. 
