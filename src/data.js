const data = {
  hero: {
    name: "Omkar Murkute",
    title: "Junior DevOps Engineer",
    subtitle: "Linux • AWS • Azure • Docker • Kubernetes • CI/CD • Nginx",
    tagline: "Managing 7+ production environments across AWS, Azure, and DigitalOcean with 99%+ uptime and 96% faster release cycles.",
    email: "omkarmurkute5631@gmail.com",
    linkedin: "https://linkedin.com/in/omkarm0209",
  },
  about: [
    "Results-driven DevOps Engineer with 1+ year of hands-on production experience managing 7+ client environments across AWS and Azure — delivering 99%+ uptime, a 96% reduction in release cycle times, and zero SSL incidents since day one.",
    "Proficient in Linux server administration (LAMP/LEMP), CI/CD automation (GitHub Actions, Jenkins, Bitbucket Pipelines), cloud infrastructure (AWS EC2, S3, IAM, VPC, Auto Scaling, CloudWatch), containerization (Docker, Kubernetes), and Infrastructure as Code (Terraform). Microsoft Certified: Azure Fundamentals (AZ-900).",
  ],
  skills: [
    { category: "Cloud & Infrastructure", items: ["AWS (EC2, S3, IAM, VPC, ALB/NLB)", "Azure (AKS, ACR, Key Vault)", "DigitalOcean", "Cloudways"] },
    { category: "Containers & Kubernetes", items: ["Docker (multi-stage, Compose)", "Kubernetes (AKS, Helm, Ingress, HPA)"] },
    { category: "CI/CD & Version Control", items: ["GitHub Actions", "Jenkins", "Bitbucket Pipelines", "Git"] },
    { category: "Infrastructure as Code", items: ["Terraform (AWS, Azure, DO)", "Shell Scripting (Bash)", "Cron"] },
    { category: "Web Servers & Stacks", items: ["Nginx", "Apache", "LAMP / LEMP", "Node.js • Python • PHP"] },
    { category: "Monitoring & Security", items: ["Prometheus / Loki / Grafana", "AWS CloudWatch", "SSL/TLS (LetsEncrypt)", "UFW / iptables"] },
    { category: "Databases & Caching", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"] },
    { category: "AI & LLM Tooling", items: ["Anthropic Claude API", "Prompt Engineering", "Claude Code", "Model Context Protocol (MCP)"] },
  ],
  experience: [
    { role: "Junior DevOps Engineer", company: "Noesis Tech, Maharashtra, India", period: "May 2026 – Present", points: [
      "Achieved 99%+ uptime across 7+ client production environments by hardening Linux servers with UFW/iptables, SSH key enforcement, and virtual host isolation — eliminating all deployment failures within the first month.",
      "Reduced release cycle by 96% (from 2 hours to 5 minutes) by building automated CI/CD pipelines with GitHub Actions and Jenkins, enabling 3x more frequent deployments with zero manual intervention.",
      "Improved mean time to resolution (MTTR) by 85%+ — from hours to under 20 minutes — by deploying AWS CloudWatch dashboards, centralized log monitoring, and real-time alerting across all client environments.",
    ]},
    { role: "Junior DevOps Engineer", company: "Gaftech Revolution India Pvt. Ltd.", period: "Jun 2025 – May 2026", points: [
      "Administered Linux (Ubuntu) production servers: implemented SSH hardening, UFW, iptables, Nginx and Apache configurations, SSL/TLS certificates, DNS routing, and virtual host isolation.",
      "Deployed and managed AWS infrastructure (EC2, S3, IAM, VPC, Security Groups); provisioned multi-cloud environments using Terraform (IaC) across Azure, DigitalOcean, and Cloudways.",
      "Built and maintained Jenkins CI/CD pipelines for automated deployments; containerized applications with Docker and managed end-to-end deployment workflows.",
      "Automated routine operational tasks with Shell scripting; proactively monitored system performance, troubleshot production issues, and ensured high availability across all environments.",
    ]},
    { role: "Microsoft Cloud Intern", company: "KasNet Technologies Pvt. Ltd., India", period: "Dec 2023 – Feb 2024", points: [
      "Completed a 6-week Microsoft Certification internship covering AZ-900, AI-900, PL-900, and DP-900, building foundational expertise across Azure, AI, Power Platform, and data services.",
      "Worked hands-on with Azure Cloud Services including resource provisioning, IAM, and core infrastructure concepts in a guided production-support environment.",
      "Developed IT projects using Microsoft Power BI for data visualization and reporting, gaining practical experience in business intelligence workflows.",
    ]},
  ],
  projects: [
    { name: "Containerized CI/CD Pipeline", desc: "Implemented multi-stage Docker builds with environment-based configurations, Nginx reverse proxy, and automated GitHub Actions pipelines, streamlining deployments across dev and production environments.", tags: ["Docker", "GitHub Actions", "Nginx"] },
    { name: "SSL Automation Platform", desc: "Automated SSL certificate provisioning and renewal across 7+ domains using LetsEncrypt and CloudFlare full HTTPS mode — achieving zero certificate expiry incidents since implementation.", tags: ["LetsEncrypt", "CloudFlare", "SSL"] },
    { name: "Infrastructure Monitoring System", desc: "Built centralized real-time alerting and log collection using AWS CloudWatch dashboards and Loki, improving incident tracking and reducing MTTR by 85%+ across production servers.", tags: ["AWS", "CloudWatch", "Loki"] },
    { name: "Self-Hosted Error Monitoring", desc: "Deployed GlitchTip via Docker Compose for centralized Sentry-compatible error monitoring, alerting, and debugging across multiple client environments — replacing paid SaaS with a cost-effective self-hosted solution.", tags: ["GlitchTip", "Docker", "PostgreSQL"] },
    { name: "Secure Credential Management", desc: "Provisioned a self-hosted Vaultwarden team vault with encrypted secret storage and role-based access control, enabling secure credential sharing across engineering teams.", tags: ["Vaultwarden", "Docker", "Security"] },
    { name: "Self-Hosted AI Inference", desc: "Deployed Ollama and OpenClaw for local LLM inference and AI tooling, enabling private, cost-effective AI-powered workflows without reliance on external APIs.", tags: ["Ollama", "Docker", "AI"] },
  ],
  education: [
    { title: "Bachelor of Engineering in Information Technology", desc: "SKNCOE, Pune — Savitribai Phule Pune University (SPPU) | 2021 – 2025" },
  ],
  certifications: [
    "Microsoft Certified: Azure Fundamentals (AZ-900) — Microsoft | Feb 2024",
    "DevOps Internship Certificate — Noesis Tech | Dec 2025 – May 2026",
    "Diploma in Java Development Training (A+ Grade) — VibrantMinds Technologies | Jul – Dec 2025",
    "Anthropic Academy — Claude with the Anthropic API, Building with the Claude API, Claude Code in Action, Introduction to Model Context Protocol | Jun 2026",
    "Java Assessment Certificate — CareerNinja.io (LearnTube)",
  ],
  contact: [
    { title: "Email", value: "omkarmurkute5631@gmail.com", link: "mailto:omkarmurkute5631@gmail.com" },
    { title: "Phone", value: "+91-9881732998" },
    { title: "LinkedIn", value: "linkedin.com/in/omkarm0209", link: "https://linkedin.com/in/omkarm0209" },
    { title: "Location", value: "Maharashtra, India" },
  ],
  stats: [
    { target: 7, label: "Environments", format: null },
    { target: 99, label: "Uptime", format: "%" },
    { target: 96, label: "Faster Releases", format: "%" },
    { target: 85, label: "Reduced MTTR", format: "%" },
  ],
}

export default data
