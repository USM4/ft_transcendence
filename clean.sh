#!/bin/bash
docker system prune -a -f
docker builder prune -a -f
docker volume prune -f
docker network prune -f   