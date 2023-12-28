# React Project in Docker

This project is configured to run within a Docker container, making it easy to set up and consistent across any development environment.

## Prerequisites

Before starting, make sure you have Docker and Docker Compose installed on your machine. You can download and install them from [Docker Desktop](https://www.docker.com/products/docker-desktop).

## Setup

The project utilizes `docker-compose` for environment setup. The `docker-compose.yml` file contains all necessary configurations to build and run the application container.

## Basic Commands

### Building and Running the Project

To build and run the project in development mode:

```bash
docker-compose up --build
```

This command will build the Docker image and run the container. The application will be available at http://localhost:3000.

### Running the Project without rebuilding

To run the project without rebuilding the image:

```bash
docker-compose up
```

### Stopping the Project

To stop the project:

```bash
docker-compose down
```

### Volume Structure

react_data: A Docker volume for the application's source code. It allows for persistence and synchronization of the source code between the host and the container.

react_node_modules: A separate Docker volume for node_modules, ensuring that dependencies remain persistent and are not overwritten by the source code mounting.

### Installing new dependencies

To install new dependencies, you can run the `npm install` command from within the container:

```bash
docker-compose run --rm web npm install <package-name>
```

This will install the package and update the `package.json` and `package-lock.json` files.