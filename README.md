# NodeJS application and MySQL application docker containers deployment in Kubernetes
A containerized `nodejs` app connected to a `mysql:5` `docker` container and run individually on a `minikube` cluster.

## Provided
1. Container deployment `YAML` files
   - Mysql deployment `configuration` file.
   - Custom Node app deployment `configuration` file.
2. However, you have to ensure that you have created the nodeapp image and evaluated your minikube ip to read your local docker registry.

### To make k8s read your local docker registry and build image
- Run `eval $(minikube -p minikube docker-env)`. But make sure that `minikube cluster` is already up and running.
- Then build the custom node app `image` by running `docker build -t k8s_node .` in project root directory.
---

### Applying configuration files
To apply the configuration files run the following:

    - k apply -f k apply -f k8s-mysql-deployment.yml
    - k apply -f k apply -f k8s-node-deployment.yml
  
  `k` is an alias of `"minikube kubectl --"`.

  ---
## Other files
1. `docker-compose` `configuration` file incase you dont want to run the same in a `minikube cluster`.
2. `Dockerfile` to help you in building the app `image`.

# Links
- [Kubernetes](https://kubernetes.io "Kubernetes official website")
- [Docker](https:www.docker.com "Docker Official Website")

