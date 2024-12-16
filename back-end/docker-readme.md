# comandos


Iniciar todos os containers(docker-compose)
```
docker compose up -d
```

Parar todos os containers
```
docker stop $(docker ps -q)  
```

Remover todos os containers
```
docker rm $(docker ps -a -q)
```