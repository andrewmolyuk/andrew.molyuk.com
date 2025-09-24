---
title: 'Howto setup MongoDb in AWS with Docker'
date: 2023-06-20T22:38:35+03:00
draft: false
tags: ['mongodb', 'aws', 'replica', 'docker']
image: 'index.png'
---

In our company, we have an internal application that utilizes MongoDB. The application consists of multiple microservices, each interacting with its own MongoDB instance. While the application doesn't experience heavy loads, it's critical for our business, so we need it to be resilient. Creating multiple MongoDB instances for each service seemed impractical and costly. Therefore, we opted for a unified resilient MongoDB cluster. Since we currently don't require sharding, we'll only be using MongoDB replicas. In this article, I'll describe how I set up replicas in AWS using Docker and how we use them in our application.

<!--more-->

## Database and Containerization Nationwide

First, I'll say a few words about our infrastructure and the motivation to use Docker for databases.

In our company, we have services that use MongoDB. All of them are deployed in AWS and logically separated by EC2 instances and responsibility zones. All services run in containers, including databases. This whole setup is almost unmanaged. Therefore, we decided to start by dividing the entire estate into two categories based on data handling. The first category is databases, resilient queues, and other services that interact with disk storage. The second category is services that only process this data and do not store anything related to the system's state. Thus, we obtained stateful and stateless categories. All services in the stateless category can be launched wherever there are resources available. Services in the stateful category must be launched in one place to avoid data access issues.

Naturally, databases should be in the stateful category. And naturally, the question arises: why do we need Docker for databases, especially since there is a constant sacred war on this topic in the community. But we won't discuss that now.

We decided to use Docker for databases. Firstly, it's aesthetically pleasing. Secondly, it allows us to use the same approach for all services, making development and maintenance simpler. Thirdly, it allows us to use an identical environment for development and for live services in AWS. Naturally, we won't store data in the containers themselves; instead, we'll use volumes attached to the containers.

In case of container issues, restarting it is sufficient without affecting the cluster's functionality and data access. In case of volume or host issues, we can simply remove it from replication and create a new one. In case of AWS zone problems, we can raise additional replicas in working zones and connect them to the cluster. In case of AWS problems, there's nothing we can do, and the issues then affect everyone in the industry, making customer interaction difficult at all levels, which can be ignored within the scope of our application.

## What is MongoDB Replica?

A bit of theory. Lots of words. Little code. If you're not interested, feel free to skip ahead.

So, we decided to use MongoDB replicas. What is it? A replica is a set of MongoDB instances that store the same set of data. One of the instances is primary, and the others are secondaries. Data is written to the primary node and replicated to the secondaries. In the event of the primary node failing, one of the secondaries becomes primary, and operations continue. If a secondary node fails, it simply restarts and resumes operation. If all nodes fail, the cluster stops functioning and requires human intervention. However, such a failure is highly unlikely if all nodes are deployed in different AWS zones.

To avoid overloading the primary node, reads can be directed to the secondary nodes. However, if a secondary node falls behind the primary, it may lag by a few seconds. This is normal and shouldn't cause issues. If a secondary node lags by several minutes, it becomes a problem requiring human intervention. We haven't encountered such a situation, and all data in the cluster replicates within milliseconds. But it's important to understand that such a situation is possible, and data enters the cluster asynchronously.

Read settings can vary. For example, you can configure reads to only occur on the primary node, only on secondary nodes, or with a preference for the primary node, then the secondaries. You can also configure reads from the nearest node based on the network map. This can be useful if secondary nodes are in different AWS zones and you need to minimize response time. However, in this case, you should be prepared for potentially outdated data.

Nodes listen to each other, and this process is called "heartbeat." Each node constantly checks others for availability to take action if something happens. When the primary node fails, a secondary node becomes primary and starts accepting writes. An algorithm selects the primary node based on priority. The node with the highest priority becomes primary. Priority is set in the node's configuration and can be any value. However, this doesn't mean that the node with the lowest priority can't become primary. It can become primary if the node with the highest priority is unavailable.

In some cases, you may add an arbiter to the replica. An arbiter is a node that doesn't store data but actively participates in selecting the primary node. An arbiter can be useful if you have two nodes in a replica and can't add a third due to, for example, high cost. But this isn't our case, so we won't use arbiters.

The failure of the primary node can cause a delay in the application until a new primary node is chosen. Therefore, it's important for secondary nodes to also be in the same zone as the primary. Thus, if the primary node fails, the application can connect to a secondary node in the same zone and continue working without delays. This leads us to the conclusion that it makes sense to have at least two nodes in each zone. Then, it doesn't matter which node fails; the application can connect to another node in the same zone, and performance won't degrade.

If there's a need for load balancing, you can implement it at the driver level or simply specify "secondaryPreferred" in the read settings. Then reads will occur from secondary nodes if available and from the primary node if secondary nodes are unavailable. Thus, the load will be distributed among all nodes in the cluster using a round-robin algorithm. We'll use reading from the nearest node, as secondary nodes are in different zones.

The main downside of MongoDB replicas is their asynchronicity. Consider a situation where we have one primary node and two secondaries. When data is written to the primary node, it's replicated to the secondaries. Suppose one of the secondary nodes falls behind the primary and lags. In this case, we may get a request to read part of the data from the up-to-date secondary node and part of the data from the secondary node that isn't up-to-date. This can lead to incorrect application behavior. This situation is resolved by setting the "write concern" to "majority." Then a write is considered successful only if it's replicated to the majority of nodes. In our case, a write is considered successful only if it's replicated to the primary node and one of the secondaries. Thus, reads will occur only from the up-to-date node. This resolves the asynchronicity issue but increases the write time because a write is considered successful only after replication to the majority of nodes. This setting is the default behavior in MongoDB, but I would recommend verifying it in your case.

## Setting Up Replicas in AWS

Enough theory, let's dive into practice. First, let's set up replicas in AWS. For this, we'll need at least four instances, two in each of two different zones. I'll use `m7g.medium` instances on ARM architecture with Amazon Linux 2023. Once we've launched the instances, we'll need to install Docker and MongoDB on them.

### Installing Docker

To install Docker on Amazon Linux 2023, follow these steps:

- Update your instance packages using the command: sudo yum update -y.
- Install Docker by running the following commands:

```shell
sudo yum update
sudo yum install docker
sudo usermod -a -G docker ec2-user
newgrp docker
```

- Install docker-compose:

```shell
wget https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)
sudo mv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose
sudo chmod -v +x /usr/local/bin/docker-compose
```

- Start Docker by running the following commands:

```shell
sudo systemctl enable docker.service
sudo systemctl start docker.service
```

- Verify that Docker is installed correctly by running the commands:

```shell
sudo systemctl status docker.service
docker version
docker-compose version
```

Once Docker is installed, we can proceed to set up MongoDB on our instances.

### MongoDB Installation

To install MongoDB on Amazon Linux 2023, follow these steps:

- First, download the official MongoDB image from Docker Hub using the command:

```shell
sudo docker pull mongo
```

- Create a docker-compose.yml file with the following content:

```yaml
version: '3.8'
services:
  mongo:
    container_name: mongo
    image: mongo:latest
    command: mongod --replSet RS --port 27017 --bind_ip_all --setParameter disableSplitHorizonIPCheck=true
    restart: unless-stopped
    ports:
      - 27017:27017
    volumes:
      - mongo_data:/data/db
      - /etc/localtime:/etc/localtime:ro
    networks:
      - mongo
    logging:
      driver: json-file
      options:
        max-size: 10m
        max-file: '3'

networks:
  mongo:
    name: mongo
    driver: bridge

volumes:
  mongo_data:
    name: mongo_data
    driver: local
```

Please pay attention to the parameter `--setParameter disableSplitHorizonIPCheck=true`. It is necessary for MongoDB to work with IP addresses rather than just domain names. This is more convenient for us since we will be using IP addresses as node addresses. You can use domain names if you prefer, and then this parameter is not needed.

- Start the container using the command: `docker-compose up -d`.
- Verify that the container is running with the command: `docker ps`.

Now MongoDB will be running inside a Docker container on your Amazon Linux 2023 instance. You can connect to MongoDB using the IP address of your instance and port 27017.

So, we set up four instances and installed Docker and MongoDB on them. Moreover, the setup will be the same for all nodes. This process can be automated using Ansible or Terraform, but I won't do that now. As we discussed earlier, for replication, we need at least four nodes, two in each zone. I will use the following configuration:

| Node   | Zone       | IP Address |
| ------ | ---------- | ---------- |
| mongo1 | us-east-1a | 10.0.11.1  |
| mongo2 | us-east-1b | 10.0.12.1  |
| mongo3 | us-east-1a | 10.0.11.2  |
| mongo4 | us-east-1b | 10.0.12.2  |

Thus, we will have two nodes in the `us-east-1a` zone and two nodes in the `us-east-1b` zone. I chose the node addresses arbitrarily; you can use any other addresses. The main thing is that they are in different zones.

### Setting Up Replicas

Now that we have all four nodes, we can set up replicas. To do this, we need to connect to one of the nodes, which will become the primary node. I'll use the `mongo1` node for this. To connect to it, run the following command:

```shell
docker exec -it mongo mongosh
```

After that, you'll enter the MongoDB interactive shell. Now we can set up replicas. To do this, run the following commands:

```shell
rs.initiate( {
   _id : "RS",
   members: [
      { _id: 0, host: "10.0.11.1:27017" },
      { _id: 1, host: "10.0.12.1:27017" },
      { _id: 2, host: "10.0.11.2:27017" },
      { _id: 3, host: "10.0.12.2:27017" }
   ]
})
```

Once this is done, replication will be configured, and you can check its status using the command: `rs.status()`. You should see a large JSON with the replica settings parameters, as well as the status of all nodes. All nodes should be in the `SECONDARY` status, except for one, which will be in the `PRIMARY` status. In my case, this is the `mongo1` node.

## Connecting to a Specific Replica

Now that replication is set up, we can connect to it from our local machine. To do this, we need to open an application to connect to MongoDB. I'll use [Studio 3T](https://studio3t.com/), but you can use any other client you prefer.

To connect to the replica, we need to specify all nodes that are part of the replica. In our case, this is not very convenient, so we can connect to one of the nodes.

Connect to the `mongo1` node using Studio 3T. If we are connected to the AWS VPN, we can connect directly to the node using its IP address. Otherwise, we will need to connect either via an SSH tunnel or via an SSH proxy. We use the SSM Agent to connect to our instances, so we can use an SSH proxy. To do this, we need to run the following command:

```shell
aws ssm start-session --target i-0123456789abcsdef --document-name AWS-StartPortForwardingSessionToRemoteHost \
  --parameters '{"portNumber":["27017"], "localPortNumber":["27017"]}'
```

AWS Session Manager is a separate topic that I may cover in a separate article. For now, just remember that we can connect to our instances via the SSM Agent.

This way, we can connect to the `mongo1` node through the local port `27017`. After that, we can connect to it using Studio 3T.

If we want to perform any write operations on the database, we should connect to the `PRIMARY` node. In this case, we can connect to the `mongo1` node since it is the `PRIMARY` node. If we only want to perform read operations, we can connect to any node, as they are all `SECONDARY` nodes.

To determine which node is the `PRIMARY`, we can execute the following command:

```shell
rs.isMaster()
```

As an alternative, to execute this command and get the address of the `PRIMARY` node, run the following command:

```shell
db.runCommand({"isMaster": 1})["primary"]
```

We can also check the replication status using the `rs.status()` command and determine who the `PRIMARY` node is.

## Connecting to the Replica from an Application

Now that we can connect to the replica from our local machine, we can connect to it from our application.

To do this, we need to specify all nodes that are part of the replica. You can configure the connection to the replica using the following connection string:

```shell
mongodb://10.0.11.1:27017,10.0.12.1:27017,10.0.11.2:27017,10.0.12.2:27017/database?replicaSet=RS&readPreference=nearest
```

In this case, we specify all nodes that are part of the replica, as well as the name of the replica `RS`. We also specify `readPreference=nearest` so that our application can read data from the nearest node. This allows us to avoid making requests to the `PRIMARY` node if not required and to access `SECONDARY` nodes in the same availability zone as our application.

For more detailed information about the MongoDB connection string, you can refer to the [official documentation](https://docs.mongodb.com/manual/reference/connection-string/).

And most importantly, don't forget about data backup, as replication is not a replacement for backup. We can perform backups from any `SECONDARY` node to avoid disrupting the operation of the `PRIMARY` node.

## Conclusion

In this article, we discussed how to set up MongoDB replication in AWS. We configured replication across two availability zones with two nodes in each zone. Additionally, we explored how to connect to the replica from our application. I demonstrated how this can be done using a connection string, as well as through AWS SSM Agent from a local machine. Certainly, there may be many aspects of this topic that I did not cover, but I hope this article will help you set up MongoDB replication quickly. In any case, if you have any questions, feel free to ask, and I'll do my best to answer them.
