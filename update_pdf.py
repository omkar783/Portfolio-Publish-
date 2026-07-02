from fpdf import FPDF
import os

FONT_DIR = r"C:\Windows\Fonts"

class ResumePDF(FPDF):
    def __init__(self):
        super().__init__("P", "pt", "Letter")
        self.set_auto_page_break(auto=True, margin=54)
        self.add_font("Calibri", "", os.path.join(FONT_DIR, "calibri.ttf"))
        self.add_font("Calibri", "B", os.path.join(FONT_DIR, "calibrib.ttf"))
        self.add_font("Calibri", "I", os.path.join(FONT_DIR, "calibrii.ttf"))
        self.add_font("Calibri", "BI", os.path.join(FONT_DIR, "calibriz.ttf"))

    def section_heading(self, title):
        self.ln(10)
        self.set_font("Calibri", "B", 11)
        self.set_text_color(0, 0, 0)
        self.cell(0, 14, title.upper(), new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(0, 0, 0)
        self.set_line_width(0.5)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(6)

    def body_text(self, text, size=10):
        self.set_font("Calibri", "", size)
        self.set_text_color(0, 0, 0)
        self.multi_cell(0, 13.5, text, new_x="LMARGIN", new_y="NEXT")

    def bullet(self, text, size=10):
        self.set_font("Calibri", "", size)
        self.set_text_color(0, 0, 0)
        x0 = self.l_margin + 10
        self.set_x(x0)
        self.cell(8, 13, "\u2022")
        self.set_x(x0 + 8)
        w = self.w - self.r_margin - x0 - 8
        self.multi_cell(w, 13, text, new_x="LMARGIN", new_y="NEXT")

    def date_on_right(self, date_str, y_offset=-13):
        self.set_font("Calibri", "", 10)
        dw = self.get_string_width(date_str)
        y = self.get_y()
        self.set_xy(self.w - self.r_margin - dw, y + y_offset)
        self.cell(dw + 2, 14, date_str)
        self.set_y(y)


pdf = ResumePDF()
pdf.set_margins(54, 54, 54)
pdf.add_page()

# Header
pdf.set_font("Calibri", "B", 19)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 24, "OMKAR ASHRUBA MURKUTE", new_x="LMARGIN", new_y="NEXT")

pdf.set_font("Calibri", "", 11)
pdf.cell(0, 16, "Junior DevOps Engineer | Linux | AWS | Azure | Docker | Kubernetes | CI/CD | Nginx", new_x="LMARGIN", new_y="NEXT")

pdf.set_font("Calibri", "", 10)
pdf.cell(0, 14, "+91-9881732998 | omkarmurkute5631@gmail.com | linkedin.com/in/omkarm0209 | Maharashtra, India", new_x="LMARGIN", new_y="NEXT")

# ===== PROFESSIONAL SUMMARY =====
pdf.section_heading("Professional Summary")
pdf.body_text(
    "Results-driven DevOps Engineer with 1+ year of hands-on production experience managing 7+ client environments "
    "across AWS and Azure \u2014 delivering 99%+ uptime, a 96% reduction in release cycle times, and zero SSL incidents "
    "since day one. Proficient in Linux server administration (LAMP/LEMP), CI/CD automation (GitHub Actions, Jenkins, "
    "Bitbucket Pipelines), cloud infrastructure (AWS EC2, S3, IAM, VPC, Auto Scaling, CloudWatch), containerization "
    "(Docker, Kubernetes), and Infrastructure as Code (Terraform). Microsoft Certified: Azure Fundamentals (AZ-900)."
)

# ===== TECHNICAL SKILLS =====
pdf.section_heading("Technical Skills")

skills_data = [
    ("Programming & Scripting: ", "Bash, Shell Scripting, Python, Java"),
    ("Cloud Platforms: ", "AWS (EC2, S3, IAM, VPC, Auto Scaling, ALB/NLB/CLB, CloudWatch), Azure, DigitalOcean, Cloudways"),
    ("DevOps Tools: ", "Docker, Kubernetes, Jenkins, GitHub Actions, Bitbucket Pipelines, Terraform"),
    ("Operating Systems: ", "Ubuntu, Linux"),
    ("Version Control: ", "Git, GitHub, Bitbucket"),
    ("Web Servers: ", "Nginx, Apache"),
    ("Monitoring: ", "AWS CloudWatch, Prometheus, Grafana, Loki"),
    ("Self-Hosted Tools: ", "GlitchTip (Sentry-compatible error monitoring), Vaultwarden, Ollama, OpenClaw"),
    ("Networking: ", "DNS, SSL/TLS, TCP/IP, UFW, iptables, Load Balancer, Security Groups, SSH Tunneling"),
    ("Databases: ", "MySQL, MongoDB, PostgreSQL, Redis"),
    ("AI & LLM Tooling: ", "Anthropic Claude API, Prompt Engineering, Claude Code, Model Context Protocol (MCP)"),
]

for label, items in skills_data:
    pdf.set_font("Calibri", "B", 10)
    pdf.set_text_color(0, 0, 0)
    lw = pdf.get_string_width(label)
    pdf.cell(lw, 12.5, label)
    pdf.set_font("Calibri", "", 10)
    rw = pdf.w - pdf.r_margin - pdf.l_margin - lw
    pdf.multi_cell(rw, 12.5, items, new_x="LMARGIN", new_y="NEXT")

# ===== PROFESSIONAL EXPERIENCE =====
pdf.section_heading("Professional Experience")

# --- Job 1 ---
pdf.set_font("Calibri", "B", 10.5)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 14, "Junior DevOps Engineer", new_x="LMARGIN", new_y="NEXT")
pdf.date_on_right("May 2026 \u2013 Present", y_offset=-14)

pdf.set_font("Calibri", "", 10)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 13, "Noesis Tech, Maharashtra, India", new_x="LMARGIN", new_y="NEXT")

pdf.bullet(
    "Achieved 99%+ uptime across 7+ client production environments by hardening Linux servers with UFW/iptables, "
    "SSH key enforcement, and virtual host isolation \u2014 eliminating all deployment failures within the first month."
)
pdf.bullet(
    "Reduced release cycle by 96% (from 2 hours to 5 minutes) by building automated CI/CD pipelines with GitHub "
    "Actions and Jenkins, enabling 3x more frequent deployments with zero manual intervention."
)
pdf.bullet(
    "Improved mean time to resolution (MTTR) by 85%+ \u2014 from hours to under 20 minutes \u2014 by deploying "
    "AWS CloudWatch dashboards, centralized log monitoring, and real-time alerting across all client environments."
)
pdf.ln(6)

# --- Job 2 ---
pdf.set_font("Calibri", "B", 10.5)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 14, "Junior DevOps Engineer", new_x="LMARGIN", new_y="NEXT")
pdf.date_on_right("Jun 2025 \u2013 May 2026", y_offset=-14)

pdf.set_font("Calibri", "", 10)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 13, "Gaftech Revolution India Pvt. Ltd.", new_x="LMARGIN", new_y="NEXT")

pdf.bullet(
    "Administered Linux (Ubuntu) production servers: implemented SSH hardening, UFW, iptables, Nginx and Apache "
    "configurations, SSL/TLS certificates, DNS routing, and virtual host isolation."
)
pdf.bullet(
    "Deployed and managed AWS infrastructure (EC2, S3, IAM, VPC, Security Groups); provisioned multi-cloud "
    "environments using Terraform (IaC) across Azure, DigitalOcean, and Cloudways."
)
pdf.bullet(
    "Built and maintained Jenkins CI/CD pipelines for automated deployments; containerized applications with "
    "Docker and managed end-to-end deployment workflows."
)
pdf.bullet(
    "Automated routine operational tasks with Shell scripting; proactively monitored system performance, "
    "troubleshot production issues, and ensured high availability across all environments."
)
pdf.ln(6)

# --- Job 3 ---
pdf.set_font("Calibri", "B", 10.5)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 14, "Microsoft Cloud Intern", new_x="LMARGIN", new_y="NEXT")
pdf.date_on_right("Dec 2023 \u2013 Jan 2024", y_offset=-14)

pdf.set_font("Calibri", "", 10)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 13, "KasNet Technologies Pvt. Ltd., India", new_x="LMARGIN", new_y="NEXT")

pdf.bullet(
    "Completed a 6-week Microsoft Certification internship covering AZ-900, AI-900, PL-900, and DP-900, "
    "building foundational expertise across Azure, AI, Power Platform, and data services."
)
pdf.bullet(
    "Worked hands-on with Azure Cloud Services including resource provisioning, IAM, and core infrastructure "
    "concepts in a guided production-support environment."
)
pdf.bullet(
    "Developed IT projects using Microsoft Power BI for data visualization and reporting, gaining practical "
    "experience in business intelligence workflows."
)

# ===== DEVOPS PROJECTS =====
pdf.section_heading("DevOps Projects")

projects = [
    ("Containerized CI/CD Pipeline \u2014 Docker, NGINX, GitHub Actions",
     "Implemented multi-stage Docker builds with environment-based configurations, Nginx reverse proxy, "
     "and automated GitHub Actions pipelines, streamlining deployments across dev and production environments."),
    ("SSL Automation Platform \u2014 LetsEncrypt, CloudFlare DNS",
     "Automated SSL certificate provisioning and renewal across 7+ domains using LetsEncrypt and CloudFlare "
     "full HTTPS mode \u2014 achieving zero certificate expiry incidents since implementation."),
    ("Infrastructure Monitoring System \u2014 AWS CloudWatch, Loki, Linux",
     "Built centralized real-time alerting and log collection using AWS CloudWatch dashboards and Loki, "
     "improving incident tracking and reducing MTTR by 85%+ across production servers."),
    ("Self-Hosted Error Monitoring \u2014 GlitchTip, Docker Compose, PostgreSQL",
     "Deployed GlitchTip via Docker Compose for centralized Sentry-compatible error monitoring, alerting, "
     "and debugging across multiple client environments \u2014 replacing paid SaaS with a cost-effective self-hosted solution."),
    ("Secure Credential Management \u2014 Vaultwarden, Docker",
     "Provisioned a self-hosted Vaultwarden team vault with encrypted secret storage and role-based access "
     "control, enabling secure credential sharing across engineering teams."),
    ("Self-Hosted AI Inference \u2014 Ollama, OpenClaw, Docker",
     "Deployed Ollama and OpenClaw for local LLM inference and AI tooling, enabling private, cost-effective "
     "AI-powered workflows without reliance on external APIs."),
]

for title, desc in projects:
    x0 = pdf.l_margin + 10
    pdf.set_x(x0)
    pdf.set_font("Calibri", "", 10)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(8, 13, "\u2022")
    pdf.set_font("Calibri", "B", 10)
    pdf.multi_cell(0, 13, title, new_x="LMARGIN", new_y="NEXT")
    pdf.set_x(x0 + 8)
    pdf.set_font("Calibri", "", 10)
    w = pdf.w - pdf.r_margin - x0 - 8
    pdf.multi_cell(w, 12.5, desc, new_x="LMARGIN", new_y="NEXT")

# ===== EDUCATION =====
pdf.section_heading("Education")

pdf.set_font("Calibri", "B", 10)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 13, "Bachelor of Engineering in Information Technology", new_x="LMARGIN", new_y="NEXT")
pdf.date_on_right("2021 \u2013 2025", y_offset=-13)

pdf.set_font("Calibri", "", 10)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 13, "SKNCOE, Pune \u2014 Savitribai Phule Pune University (SPPU)", new_x="LMARGIN", new_y="NEXT")

# ===== CERTIFICATIONS =====
pdf.section_heading("Certifications")

certs = [
    "Microsoft Certified: Azure Fundamentals (AZ-900) \u2014 Microsoft | Feb 2024",
    "Diploma in Java Development Training (A+ Grade) \u2014 VibrantMinds Technologies | Jul \u2013 Dec 2025",
    "Anthropic Academy \u2014 Claude with the Anthropic API, Building with the Claude API, Claude Code in Action, Introduction to Model Context Protocol | Jun 2026",
    "Java Assessment Certificate \u2014 CareerNinja.io (LearnTube)",
]

for c in certs:
    pdf.bullet(c, size=10)

output_path = r"C:\Users\NKS-WIN-Omkar\Downloads\Omkar_Murkute_DevOps_Resume_Updated.pdf"
pdf.output(output_path)
print(f"PDF created at: {output_path}")
print(f"Pages: {pdf.pages_count}")
