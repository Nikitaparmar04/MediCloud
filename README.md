# 🏥 MediCare Hub - Highly Available AWS Architecture

A **fault-tolerant medical application** deployed on AWS using the **Reliability Pillar** of the AWS Well-Architected Framework. This project demonstrates building a self-healing, highly available infrastructure for healthcare applications.

![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![EC2](https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white)
![RDS](https://img.shields.io/badge/Amazon_RDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white)
![Route53](https://img.shields.io/badge/Route_53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white)
![CloudWatch](https://img.shields.io/badge/CloudWatch-FF4F8B?style=for-the-badge&logo=amazoncloudwatch&logoColor=white)

---

## 📋 Project Overview

**MediCare Hub** is a lightweight medical application used by clinics to manage patient records and appointment tracking. 

### ❌ The Problem (Before)
Originally hosted using traditional infrastructure, it lacked:
- **Fault Tolerance** - Single point of failure
- **High Availability** - No redundancy across zones
- **Auto-Recovery** - Manual intervention needed for failures
- **Data Resilience** - Risk of losing critical medical data

> ⚠️ Any single EC2 or database failure could lead to **downtime** and **loss of access to critical medical data**.

### ✅ The Solution (After)
The application is now **lifted and shifted to AWS** using best practices from the **Reliability Pillar** of the AWS Well-Architected Framework. The new infrastructure:
- Auto-recovers from failures
- Continues serving users during disruptions
- Handles instance crashes and AZ outages gracefully

---

## 🎯 Project Objectives

As a **Solutions Architect** focused on reliability engineering, this project demonstrates:

| Objective | AWS Service | Purpose |
|-----------|-------------|---------|
| Multi-AZ Architecture | VPC, Subnets | Fault tolerance across Availability Zones |
| Auto Scaling | EC2 Auto Scaling | Self-healing & automatic capacity adjustment |
| DNS Failover | Route 53 | Intelligent routing with health checks |
| Database Resilience | RDS Multi-AZ | Automatic database failover |
| Shared Storage | EFS | Persistent, shared file system across instances |
| Monitoring | CloudWatch | Real-time metrics and alarms |

---

## 🏗️ AWS Architecture

```
                                    ┌─────────────────────────────────────────────────────────┐
                                    │                        AWS Cloud                         │
                                    │  ┌─────────────────────────────────────────────────────┐│
                                    │  │                         VPC                          ││
         ┌──────────┐               │  │  ┌────────────────────┐  ┌────────────────────┐     ││
         │  Users   │               │  │  │   Availability     │  │   Availability     │     ││
         └────┬─────┘               │  │  │     Zone 1         │  │     Zone 2         │     ││
              │                     │  │  │                    │  │                    │     ││
              ▼                     │  │  │  ┌──────────────┐  │  │  ┌──────────────┐  │     ││
       ┌─────────────┐              │  │  │  │ Public Subnet│  │  │  │ Public Subnet│  │     ││
       │  Route 53   │◄─────────────┼──┼──┤  │              │  │  │  │              │  │     ││
       │(DNS+Health) │              │  │  │  │  ┌────────┐  │  │  │  │  ┌────────┐  │  │     ││
       └──────┬──────┘              │  │  │  │  │  EC2   │  │  │  │  │  │  EC2   │  │  │     ││
              │                     │  │  │  │  │(Web+API)│  │  │  │  │(Web+API)│  │  │     ││
              ▼                     │  │  │  │  └────┬───┘  │  │  │  └────┬───┘  │  │     ││
     ┌────────────────┐             │  │  │  └───────┼──────┘  │  └───────┼──────┘  │     ││
     │ Load Balancer  │◄────────────┼──┼──┤          │         │         │         │     ││
     │     (ALB)      │             │  │  │          ▼         │         ▼         │     ││
     └────────────────┘             │  │  │    ┌─────────────────────────────┐     │     ││
              │                     │  │  │    │           EFS               │     │     ││
              │                     │  │  │    │    (Shared Storage)         │     │     ││
              ▼                     │  │  │    └─────────────────────────────┘     │     ││
     ┌────────────────┐             │  │  │                                        │     ││
     │  Auto Scaling  │             │  │  │  ┌────────────────┐  ┌────────────────┐│     ││
     │     Group      │             │  │  │  │ Private Subnet │  │ Private Subnet ││     ││
     └────────────────┘             │  │  │  │  ┌──────────┐  │  │  ┌──────────┐  ││     ││
                                    │  │  │  │  │ RDS      │◄─┼──┼─►│ RDS      │  ││     ││
                                    │  │  │  │  │ (Primary)│  │  │  │(Standby) │  ││     ││
                                    │  │  │  │  └──────────┘  │  │  └──────────┘  ││     ││
                                    │  │  │  └────────────────┘  └────────────────┘│     ││
                                    │  │  └────────────────────────────────────────┘     ││
                                    │  └─────────────────────────────────────────────────┘│
                                    │                                                      │
                                    │         ┌────────────────────────────────┐          │
                                    │         │      CloudWatch Monitoring      │          │
                                    │         │   (Metrics, Alarms, Dashboards) │          │
                                    │         └────────────────────────────────┘          │
                                    └─────────────────────────────────────────────────────┘
```

---

## 🛠️ AWS Services Used

### Compute & Networking
| Service | Configuration | Purpose |
|---------|---------------|---------|
| **Amazon VPC** | Multi-AZ with Public/Private Subnets | Network isolation |
| **Amazon EC2** | t2.micro/t3.micro in Auto Scaling Group | Application hosting |
| **Application Load Balancer** | Cross-zone load balancing | Traffic distribution |
| **Auto Scaling Group** | Min: 2, Max: 4, Health checks | Self-healing & scaling |

### Database & Storage
| Service | Configuration | Purpose |
|---------|---------------|---------|
| **Amazon RDS** | MySQL/PostgreSQL Multi-AZ | Database with automatic failover |
| **Amazon EFS** | Regional file system | Shared storage for uploads |

### DNS & Routing
| Service | Configuration | Purpose |
|---------|---------------|---------|
| **Route 53** | Health checks + Failover routing | DNS management & failover |

### Monitoring
| Service | Configuration | Purpose |
|---------|---------------|---------|
| **CloudWatch** | Custom metrics & alarms | Monitoring & alerting |

---

## 🔧 Application Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Axios** - API communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB/MySQL** - Database
- **JWT** - Authentication

---

## 📁 Project Structure

```
MediCare_Hub/
├── frontend/                 # React Frontend (Deployed to EC2)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   └── routes.jsx        # Application routes
│   └── package.json
│
├── backend/                  # Node.js Backend (Deployed to EC2)
│   ├── config/               # Configuration files
│   ├── middleware/           # Express middleware
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── uploads/              # File uploads (mounted to EFS)
│   └── server.js             # Entry point
│
└── README.md
```

---

## 🚀 Deployment Architecture

### Step 1: VPC Setup
- Create VPC with CIDR block
- Create 2 Public Subnets (different AZs)
- Create 2 Private Subnets (different AZs)
- Configure Internet Gateway & NAT Gateway
- Set up Route Tables

### Step 2: Database Layer (RDS Multi-AZ)
- Launch RDS instance with Multi-AZ enabled
- Configure in Private Subnets
- Set up Security Groups

### Step 3: Storage Layer (EFS)
- Create EFS file system
- Configure mount targets in each AZ
- Mount to EC2 instances for shared storage

### Step 4: Compute Layer (EC2 + Auto Scaling)
- Create Launch Template with user data
- Configure Auto Scaling Group across AZs
- Set up health checks and scaling policies

### Step 5: Load Balancing (ALB)
- Create Application Load Balancer
- Configure Target Groups
- Set up health checks

### Step 6: DNS & Failover (Route 53)
- Configure hosted zone
- Create health checks
- Set up failover routing policy

### Step 7: Monitoring (CloudWatch)
- Create custom dashboards
- Set up alarms for critical metrics
- Configure SNS notifications

---

## 📊 Reliability Features

| Feature | Implementation | Benefit |
|---------|----------------|---------|
| **Multi-AZ Deployment** | Resources in 2+ AZs | Survives AZ failure |
| **Auto Scaling** | Min 2, Max 4 instances | Self-healing capacity |
| **Health Checks** | ALB + Route 53 | Automatic failover |
| **RDS Multi-AZ** | Synchronous standby | Zero data loss failover |
| **EFS** | Regional storage | Shared, persistent data |
| **CloudWatch Alarms** | CPU, Memory, Disk | Proactive monitoring |

---

## 📈 Key Learning Outcomes

After completing this project, you'll master:

- ✅ Designing **fault-tolerant Multi-AZ architectures**
- ✅ **Auto-scaling EC2 instances** with health checks and recovery
- ✅ Configuring **DNS failover** using Route 53 health checks
- ✅ Setting up **Multi-AZ RDS** for database resilience
- ✅ Implementing **shared storage with EFS**
- ✅ Building **self-healing infrastructure** on AWS
- ✅ Applying **AWS Well-Architected Framework** best practices

---

## 🔗 AWS Well-Architected Framework

This project aligns with the **Reliability Pillar** principles:

| Design Principle | Implementation |
|------------------|----------------|
| Automatically recover from failure | Auto Scaling + Health Checks |
| Test recovery procedures | Simulate AZ failures |
| Scale horizontally | Multiple EC2 instances behind ALB |
| Stop guessing capacity | Auto Scaling based on demand |
| Manage change through automation | Infrastructure as Code |

---

## 👩‍💻 Author

**Nikita Parmar**  
*Solutions Architect*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Nikitaparmar04)

---

<p align="center">
  <b>🏗️ Built with AWS Best Practices for Reliability</b>
  <br>
  <i>Ensuring healthcare data is always available when it matters most</i>
</p>
