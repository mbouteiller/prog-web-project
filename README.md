
# prog-web-project
SI5 Programmable Web course project - Polytech Sophia-Antipolis

Students: [LOSCIALE Vivian](https://github.com/vivianlosciale), [MÉTÉREAU Frédéric](https://github.com/MetereauFrederic), [DUCROCQ Charly](https://github.com/CharlyDucrocq), [BOUTEILLER Martin](https://github.com/mbouteiller)

## Setup
Execute the sh file `setup.sh` located at the root of the project.
Or
Execute the command line `npm install` on the front/back directories
and execute the command line `install -g newman` on the postman directory.

## Run the project
If you want to launch:
- the client, use the `run_front.sh`
- the server, use the `run_back.sh`

## API docs
You can access the API docs at [http://localhost:5000/api](http://localhost:5000/api).

## Test the server
You can test the server api route with postman by running `run_test.sh` file.

## Project architecture
- `/front` : the client side of our projet made in react.
- `/back` : the server side of our project made in nestjs
