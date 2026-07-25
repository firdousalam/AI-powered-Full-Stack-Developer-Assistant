# Chapter 10 - Docker & Kubernetes

> **Containerize and deploy DevPilot AI using Docker, Docker Compose, Kubernetes, and Helm for a production-ready local development environment.**

---

# 📖 Chapter Overview

So far, we have built almost every major component of DevPilot AI:

- Chrome Extension
- React Dashboard
- Node.js Backend
- Ollama Integration
- AI Router
- MCP Gateway
- ChromaDB
- MongoDB
- OCR
- Voice
- RAG Pipeline

Now it's time to package everything into containers and deploy the complete platform using Docker and Kubernetes.

This chapter focuses on making DevPilot AI portable, scalable, and production-ready.

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Containerize all services
- Create optimized Dockerfiles
- Use multi-stage Docker builds
- Build Docker Compose environments
- Deploy services on Kubernetes
- Configure ConfigMaps and Secrets
- Expose services using Ingress
- Package deployments with Helm
- Scale applications
- Monitor application health

---

# 🏗 Deployment Architecture

```text
                    Chrome Extension
                           │
                           ▼
                    React Dashboard
                           │
                     HTTPS / REST
                           ▼
                   NGINX Ingress Controller
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
  Frontend Service     Backend API      Ollama Service
        │                  │                  │
        │                  ▼                  ▼
        │           MCP Gateway         AI Models
        │                  │
        ▼                  ▼
    ChromaDB         MongoDB
        │                  │
        └──────────────┬───┘
                       ▼
              Persistent Volumes
```

---

# 🏗 Kubernetes Architecture

```text
                     Kubernetes Cluster

             +----------------------------------+

             |        NGINX Ingress             |

             +----------------------------------+

                    │

        ┌───────────┼─────────────┐

        ▼           ▼             ▼

Frontend API     Backend API    Ollama

        │           │             │

        ▼           ▼             ▼

 MongoDB      ChromaDB      MCP Services

        │

 Persistent Volumes
```

---

# 🛠 Technology Stack

| Layer | Technology |
|---------|------------|
| Containerization | Docker |
| Local Development | Docker Compose |
| Orchestration | Kubernetes |
| Package Manager | Helm |
| Ingress | NGINX Ingress Controller |
| Storage | Persistent Volumes |
| Secrets | Kubernetes Secrets |
| Configuration | ConfigMaps |
| Monitoring | Health Probes |

---

# 📂 Deployment Folder Structure

```text
deployment/

├── docker/
│
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   ├── ollama.Dockerfile
│   └── docker-compose.yml
│
├── kubernetes/
│
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── ingress.yaml
│   │
│   ├── frontend/
│   ├── backend/
│   ├── mongodb/
│   ├── chromadb/
│   ├── ollama/
│   └── pvc/
│
└── helm/
    └── devpilot/
```

---

# 🐳 Docker Services

Our application consists of several containers.

| Service | Purpose |
|----------|----------|
| Frontend | React Dashboard |
| Backend | Express API |
| MongoDB | Application Database |
| ChromaDB | Vector Database |
| Ollama | Local AI Models |
| MCP Gateway | Developer Tool Integration |
| NGINX | Reverse Proxy |

---

# 🐳 Dockerfile Best Practices

Each service should use:

- Multi-stage builds
- Small base images
- Non-root users
- Health checks
- Environment variables
- Layer caching

Example:

```Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
```

---

# 🐳 Docker Compose

Docker Compose starts all services locally.

```text
Frontend

↓

Backend

↓

MongoDB

↓

ChromaDB

↓

Ollama

↓

MCP Gateway
```

Useful Commands:

```bash
docker compose up -d

docker compose ps

docker compose logs

docker compose down
```

---

# ☸ Kubernetes Resources

We will create:

- Namespace
- Deployment
- Service
- ConfigMap
- Secret
- PersistentVolumeClaim
- Ingress
- HorizontalPodAutoscaler (Later)

---

# 📦 Namespace

Keep application resources isolated.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: devpilot-ai
```

---

# 🚀 Deployments

Each application runs as a Deployment.

Deployments:

- frontend
- backend
- mongodb
- chromadb
- ollama

Benefits:

- Auto healing
- Rolling updates
- Replica management

---

# 🌐 Services

Create ClusterIP services.

```text
frontend-service

backend-service

mongodb-service

chromadb-service

ollama-service
```

---

# ⚙ ConfigMaps

Store non-sensitive configuration.

Examples:

- API URLs
- Default AI model
- Chunk size
- Feature flags

Example:

```yaml
APP_NAME=DevPilot AI

DEFAULT_MODEL=qwen2.5-coder

CHROMADB_HOST=chromadb
```

---

# 🔐 Secrets

Sensitive values should be stored in Kubernetes Secrets.

Examples:

- JWT Secret
- MongoDB Password
- OAuth Client Secret
- Encryption Keys

Never commit secrets to Git.

---

# 💾 Persistent Volumes

Persistent storage is required for:

- MongoDB
- ChromaDB
- Ollama Models
- Uploaded Files

Benefits:

- Data survives pod restarts
- Easy backups
- Persistent AI models

---

# 🤖 Ollama Deployment

Deploy Ollama as its own service.

Recommended Models:

| Model | RAM |
|---------|------|
| Qwen2.5-Coder 7B | 4–5 GB |
| Gemma 3 4B | 3–4 GB |
| Phi-4 Mini | 3–4 GB |

Mount:

```text
/root/.ollama
```

using a Persistent Volume.

---

# 🧠 ChromaDB Deployment

Deploy ChromaDB as a standalone service.

Persistent storage:

```text
/chroma
```

Expose internally:

```text
ClusterIP
```

---

# 🗄 MongoDB Deployment

Store:

- Users
- Chats
- Prompt Library
- History
- Favorites
- Settings

Persistent Volume:

```text
/data/db
```

---

# 🌍 NGINX Ingress

Expose the application through one endpoint.

Example:

```text
/

↓

Frontend

/api

↓

Backend

/ollama

↓

AI

/chroma

↓

Vector DB
```

Benefits:

- Single URL
- HTTPS support
- Reverse Proxy
- Load balancing

---

# 📦 Helm Chart

Package everything into a reusable Helm chart.

Structure:

```text
helm/

devpilot/

├── Chart.yaml

├── values.yaml

├── templates/

│   ├── deployment.yaml

│   ├── service.yaml

│   ├── ingress.yaml

│   ├── configmap.yaml

│   ├── secret.yaml

│   └── pvc.yaml
```

---

# 🚀 Deployment Flow

```text
GitHub

↓

GitHub Actions

↓

Docker Build

↓

Docker Registry

↓

Helm Upgrade

↓

Kubernetes

↓

Running Pods
```

---

# 📊 Scaling

Increase replicas:

```yaml
replicas: 3
```

Benefits:

- High Availability
- Better Performance
- Zero Downtime Deployments

---

# ❤️ Health Checks

Configure:

Liveness Probe

```text
/api/health
```

Readiness Probe

```text
/api/ready
```

Benefits:

- Detect failures
- Restart unhealthy containers
- Prevent bad traffic

---

# 🔄 Rolling Updates

Deployment strategy:

```text
Old Pods

↓

New Pods

↓

Traffic Switch

↓

Old Pods Removed
```

Users experience zero downtime.

---

# 🧪 Testing Checklist

Verify:

- Docker images build successfully
- Docker Compose starts all services
- Backend connects to MongoDB
- Backend connects to ChromaDB
- Ollama models load correctly
- React frontend communicates with backend
- Kubernetes pods are running
- Services resolve correctly
- Ingress routes traffic
- Persistent volumes retain data

---

# 🐞 Common Issues

## Docker Build Failed

Possible Causes:

- Missing dependencies
- Incorrect Dockerfile
- Build context issues

---

## Kubernetes Pods Crash

Possible Causes:

- Environment variables missing
- Incorrect image
- Database unavailable

---

## Ingress Not Working

Possible Causes:

- NGINX Ingress not installed
- Wrong host configuration
- Service mismatch

---

## Ollama Not Responding

Possible Causes:

- Model not downloaded
- Low RAM
- Persistent volume not mounted

---

## MongoDB Connection Failed

Possible Causes:

- Wrong credentials
- Secret missing
- Service name mismatch

---

# 📈 Production Best Practices

- Use image version tags (avoid `latest`)
- Store secrets in Kubernetes Secrets
- Use Persistent Volumes
- Enable health probes
- Configure resource requests and limits
- Use rolling updates
- Separate development and production values
- Keep Helm values configurable

---

# 🚀 Future Enhancements

Future production improvements:

- Horizontal Pod Autoscaler (HPA)
- Vertical Pod Autoscaler (VPA)
- Prometheus Monitoring
- Grafana Dashboards
- Loki Log Aggregation
- ArgoCD GitOps
- Service Mesh (Istio)
- Multi-Cluster Deployment
- GPU Scheduling for Ollama
- Cloud Deployment (EKS, AKS, GKE)

---

# 📁 Deliverables

By the end of this chapter, you will have:

- ✅ Dockerized Frontend
- ✅ Dockerized Backend
- ✅ Docker Compose Environment
- ✅ MongoDB Deployment
- ✅ ChromaDB Deployment
- ✅ Ollama Deployment
- ✅ Kubernetes Deployments
- ✅ Services
- ✅ ConfigMaps
- ✅ Secrets
- ✅ Persistent Volumes
- ✅ NGINX Ingress
- ✅ Helm Chart
- ✅ Production-Ready Deployment

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat: dockerize and deploy DevPilot AI to Kubernetes"

git push origin develop
```

---

# 📖 Summary

In this chapter, we containerized the complete DevPilot AI platform using Docker and Docker Compose, then deployed it to Kubernetes using Deployments, Services, ConfigMaps, Secrets, Persistent Volumes, and NGINX Ingress. Finally, we packaged the deployment with Helm, creating a scalable and production-ready architecture that supports local development today and cloud deployment in later chapters.

---

# ⏭ Next Chapter

## Chapter 11 – Authentication & User Management

In the next chapter, we will secure DevPilot AI by implementing:

- JWT Authentication
- Google OAuth Login
- User Registration & Login
- Role-Based Access Control (RBAC)
- Refresh Tokens
- Session Management
- Protected Routes
- User Profiles
- API Authorization
- Secure Chrome Extension Authentication
- Multi-User Support
- Enterprise Security Best Practices