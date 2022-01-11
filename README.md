# The Clinic Workshop

## Requirements

* Node 16
* Docker
* Windows/Mac OS/Linux

## Introducing clinic

* `clinic` is a suite of open source tools aimed at helping you find bottlenecks
and performance issues in your applications.
* The tools are meant to be easy to use and "zero conf".
* Read about more clinic on the website, https://clinicjs.org

## Installing clinic & autocannon

* Before we do anything you need to install clinic from npm `npm install -g clinic`
* To check that it works try listing the help `clinic --help`
* Intall autocannon, our benchmarking tool `npm install -g autocannon`

## Using clinic doctor

* Instead of running two different terminals you can use the clinic `--on-port <cmd>` flag.
* The `--on-port` script is executed when the benchmark scripts spawns a server that listens on a port.
* You can access the port in the script as `$PORT`.
* Try re-running the benchmark, but use the `--on-port` flag to run `autocannon`.

```sh
clinic doctor --on-port 'autocannon http://localhost:$PORT' -- node hello-world/index.js
```
Alternatively you can run it like so

```sh
clinic doctor --autocannon [ / ] -- node code/hello-world/index.js
```
You can refer to the readme https://github.com/nearform/node-clinic for an example

# Next Exercise - npm-query-server

## Prep: Setting up a database

* For the upcoming exercises you need to use a MongoDB database running locally
* If you have docker installed you can get the full database with data using

```sh
docker pull mafintosh/npm-in-mongo
docker run -it -p 27017:27017 -d mafintosh/npm-in-mongo
```

## Prep: Getting some data 

* NOTE: Skip this step if the docker container worked
* To fill up an empty database, we've made a little helper script, https://github.com/nearform/import-npm-to-mongodb
* Use this to import npm metadata

```sh
npx import-npm-to-mongodb -s 20
```

# Investigating Mongo

```sh
docker ps | grep mongo # COPY CONTAINER ID
docker exec -it <CONTAINER ID> /bin/bash
```

* `mongo` should connect you to the db
* Run `use npm` to connect to the `npm` db.
* Try running the query:

 ```sh
 db.modules.find().sort({modified: -1}).limit(5)
 ```
