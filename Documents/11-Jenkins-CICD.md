# Chapter 11 - Jenkins CI/CD Pipeline

> **Automate the complete Zeba AI build, test, Docker image creation, and Kubernetes deployment using Jenkins, GitHub, Docker, Helm, and Kubernetes.**

---

# 📖 Chapter Overview

In the previous chapter, we successfully containerized Zeba AI and deployed it to Kubernetes.

Deploying manually every time is inefficient and error-prone.

In this chapter, we'll build a complete **Enterprise CI/CD Pipeline** using **Jenkins**, allowing every code push to automatically:

- Build the application
- Run quality checks
- Execute tests
- Build Docker images
- Push images to Docker Hub
- Deploy using Helm
- Verify Kubernetes deployment

By the end of this chapter, you'll have a production-style CI/CD pipeline similar to those used in enterprise organizations.

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Install Jenkins
- Configure Docker with Jenkins
- Configure Kubernetes access
- Create Jenkins Pipelines
- Build React applications
- Build Node.js applications
- Build Docker images
- Push Docker images
- Deploy with Helm
- Verify Kubernetes deployments
- Handle pipeline failures
- Manage credentials securely

---

# 🏗 CI/CD Architecture

```text
                    Developer

                        │

                        ▼

                GitHub Repository

                        │

               Git Push / Pull Request

                        │

                        ▼

                    Jenkins

                        │

      ┌─────────────────┼───────────────────┐

      ▼                 ▼                   ▼

 Build Frontend    Build Backend      Run Tests

      ▼                 ▼                   ▼

 Docker Build    Docker Build      Code Quality

      └─────────────────┬───────────────────┘

                        ▼

              Push Docker Images

                        ▼

                 Docker Hub Registry

                        ▼

                   Helm Upgrade

                        ▼

                Kubernetes Cluster

                        ▼

                 Deployment Verify
```

---

# 🛠 Technology Stack

| Layer | Technology |
|---------|------------|
| CI Server | Jenkins LTS |
| Source Control | GitHub |
| Build Tool | Node.js + npm |
| Containerization | Docker |
| Registry | Docker Hub |
| Orchestration | Kubernetes |
| Package Manager | Helm |
| Deployment | Helm Upgrade |
| Notifications | Email / Slack (Optional) |

---

# 📂 Project Structure

```text
devpilot-ai/

├── frontend/

├── backend/

├── chrome-extension/

├── deployment/
│
├── helm/
│
├── Jenkinsfile
│
├── docker-compose.yml
│
└── README.md
```

---

# 🚀 Jenkins Installation

Install Jenkins using Docker.

```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

Verify:

```text
http://localhost:8080
```

---

# 🔌 Required Jenkins Plugins

Install:

- Git
- GitHub
- Docker Pipeline
- Kubernetes CLI
- Kubernetes
- Pipeline
- Credentials Binding
- Blue Ocean
- NodeJS
- Workspace Cleanup
- Email Extension (Optional)

---

# 🔐 Jenkins Credentials

Store securely using Jenkins Credentials.

Examples:

- GitHub Personal Access Token
- Docker Hub Username
- Docker Hub Password / Token
- Kubernetes Config
- Helm Credentials (if required)
- JWT Secret (optional)

Never hardcode credentials inside the pipeline.

---

# 🏗 Pipeline Stages

```text
Checkout

↓

Install Dependencies

↓

Lint

↓

Unit Tests

↓

Build Frontend

↓

Build Backend

↓

Docker Build

↓

Docker Push

↓

Helm Upgrade

↓

Verify Deployment

↓

Cleanup
```

---

# 📥 Stage 1 - Checkout

Clone the GitHub repository.

```groovy
stage('Checkout') {
    steps {
        checkout scm
    }
}
```

---

# 📦 Stage 2 - Install Dependencies

Install frontend packages.

```bash
cd frontend

npm install
```

Install backend packages.

```bash
cd backend

npm install
```

---

# 🧹 Stage 3 - Code Quality

Run:

```bash
npm run lint
```

Optional:

- ESLint
- Prettier
- TypeScript checks

---

# 🧪 Stage 4 - Unit Testing

Execute automated tests.

Frontend:

```bash
npm test
```

Backend:

```bash
npm test
```

Generate test reports.

---

# 🏗 Stage 5 - Build Applications

Frontend:

```bash
npm run build
```

Backend:

```bash
npm run build
```

Artifacts:

- React Build
- Node.js Build

---

# 🐳 Stage 6 - Docker Build

Build Docker images.

Frontend

```bash
docker build \
-t username/devpilot-frontend:v1 \
-f deployment/docker/frontend.Dockerfile .
```

Backend

```bash
docker build \
-t username/devpilot-backend:v1 \
-f deployment/docker/backend.Dockerfile .
```

---

# 📤 Stage 7 - Push Images

Login

```bash
docker login
```

Push

```bash
docker push username/devpilot-frontend:v1

docker push username/devpilot-backend:v1
```

---

# ☸ Stage 8 - Kubernetes Deployment

Deploy using Helm.

```bash
helm upgrade --install \
devpilot-ai \
./deployment/helm/devpilot
```

Benefits:

- Version control
- Easy rollback
- Configurable values

---

# ❤️ Stage 9 - Deployment Verification

Verify Pods.

```bash
kubectl get pods
```

Verify Services.

```bash
kubectl get svc
```

Verify Ingress.

```bash
kubectl get ingress
```

Optional Health Check:

```bash
curl http://localhost/api/health
```

---

# 🧹 Stage 10 - Cleanup

Remove unused Docker images.

```bash
docker system prune -f
```

Clean Jenkins workspace.

---

# 🔄 Complete Pipeline Flow

```text
Git Push

↓

Webhook

↓

Jenkins

↓

Checkout

↓

Install

↓

Lint

↓

Test

↓

Build

↓

Docker Build

↓

Docker Push

↓

Helm Upgrade

↓

Kubernetes

↓

Health Check

↓

Success
```

---

# 📄 Jenkinsfile Structure

Recommended stages:

```text
pipeline

├── Checkout

├── Install

├── Lint

├── Test

├── Build

├── Docker Build

├── Docker Push

├── Deploy

├── Verify

└── Cleanup
```

---

# 🧪 Testing Checklist

Verify:

- Jenkins job starts automatically
- Git checkout succeeds
- Dependencies install
- Tests pass
- Docker images build
- Docker images push
- Helm deployment succeeds
- Pods become Ready
- Services respond
- Ingress routes correctly

---

# 🐞 Common Issues

## Docker Permission Denied

Possible Causes:

- Jenkins user not in Docker group
- Docker socket permissions

Solution:

```bash
sudo usermod -aG docker jenkins
```

---

## Kubernetes Authentication Failed

Possible Causes:

- Missing kubeconfig
- Incorrect cluster context

Verify:

```bash
kubectl config current-context
```

---

## Docker Push Failed

Possible Causes:

- Invalid credentials
- Repository missing
- Image tag mismatch

---

## Helm Upgrade Failed

Possible Causes:

- Invalid values.yaml
- Existing release conflicts
- Kubernetes unavailable

---

## Jenkins Workspace Issues

Solution:

```bash
Clean Workspace
```

before each build.

---

# 📊 Pipeline Dashboard

Useful Metrics:

- Build Number
- Build Duration
- Test Results
- Deployment Status
- Docker Image Version
- Kubernetes Health
- Last Successful Build

---

# 🔒 Security Best Practices

- Store secrets in Jenkins Credentials
- Use Docker Hub access tokens
- Avoid plaintext passwords
- Limit Kubernetes permissions
- Rotate credentials periodically
- Protect Jenkins with authentication
- Enable HTTPS in production

---

# 🚀 Future Enhancements

In later chapters, we can add:

- GitHub Webhooks
- SonarQube Code Quality
- Trivy Container Scanning
- OWASP Dependency Check
- Slack Notifications
- Email Notifications
- ArgoCD GitOps
- Canary Deployments
- Blue-Green Deployments
- Multi-Environment Pipelines (Dev, QA, Prod)

---

# 📁 Deliverables

By the end of this chapter, you will have:

- ✅ Jenkins Installed
- ✅ Docker Integrated
- ✅ GitHub Connected
- ✅ Secure Credentials
- ✅ Automated Pipeline
- ✅ Docker Image Build
- ✅ Docker Hub Push
- ✅ Helm Deployment
- ✅ Kubernetes Verification
- ✅ Production-Ready CI/CD Workflow

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat: implement Jenkins CI/CD pipeline"

git push origin develop
```

---

# 📖 Summary

In this chapter, we automated the complete Zeba AI delivery process using Jenkins. The pipeline now performs source checkout, dependency installation, code quality checks, testing, application builds, Docker image creation, image publishing, Helm-based Kubernetes deployment, and deployment verification. This CI/CD workflow provides a reliable and repeatable deployment process that closely mirrors enterprise software development practices.

---

# ⏭ Next Chapter

## Chapter 12 – GitHub Integration & AI Code Intelligence

In the next chapter, we will extend Zeba AI with GitHub-powered features, including:

- GitHub OAuth Authentication
- Repository Browser
- Repository Chat (RAG)
- Pull Request Review
- Commit History Analysis
- Branch Comparison
- Issue & Pull Request Summaries
- AI Code Explanation
- Automated README Generation
- AI Commit Message Generator
- GitHub MCP Integration
- Code Intelligence Dashboard