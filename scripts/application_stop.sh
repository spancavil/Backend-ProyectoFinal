#!/bin/bash

#Stopping existing node servers
echo "Stopping any existing node servers with pm2"
pm2 stop my-api