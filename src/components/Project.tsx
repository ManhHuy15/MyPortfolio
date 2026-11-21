import React, { useState } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TerminalIcon from '@mui/icons-material/Terminal';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import DnsIcon from '@mui/icons-material/Dns';
import DevicesIcon from '@mui/icons-material/Devices';
import '../assets/styles/Project.scss';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  role: string;
  period: string;
  highlight: string;
  icon: React.ReactNode;
  description: string;
  tags: string[];
  link?: string;
  linkText?: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "coach-saas",
    title: "Long-Distance Coach Management SaaS",
    category: "SaaS & Cloud",
    role: "Freelance Full Stack Developer",
    period: "12/2025 – 06/2026",
    highlight: "Multi-tenant • Atomic Redis Lua",
    icon: <DirectionsBusIcon />,
    description: "Multi-tenant SaaS platform enabling bus transport operators to manage fleets, schedule routes, and process real-time passenger bookings via Zalo Mini App. Engineered atomic seat reservation with Redis Lua scripts, Bao Kim gateway, Hangfire backups to Cloudflare R2, and automated GitHub Actions CI/CD.",
    tags: ["ASP.NET Core 8", "React", "Zalo SDK", "PostgreSQL", "Redis Lua", "Hangfire", "Docker", "Cloudflare R2", "Grafana/Loki"]
  },
  {
    id: "f-ctf",
    title: "F-CTF Platform Performance Optimization",
    category: "Microservices & K8s",
    role: "Full Stack Developer",
    period: "09/2025 – 12/2025",
    highlight: "Graduation: 9.7/10 • 5k+ Users",
    icon: <TerminalIcon />,
    description: "Re-engineered capture-the-flag platform post-FPTU Secathon 2025 into decoupled microservices serving 5,000+ concurrent contestants. Automated isolated challenge sandbox provisioning via Kubernetes & Argo Workflows APIs (<30s deployment) and eliminated scoring race conditions with Redis Lua scripts.",
    link: "https://iahn.fpt.edu.vn/du-an/fpt-capture-the-flag-fctf",
    linkText: "Project Reference",
    tags: ["ASP.NET Core 8", "Python", "React", "Docker", "Kubernetes", "Argo Workflows", "Redis", "MariaDB", "Prometheus", "Grafana"]
  },
  {
    id: "daewoo-groupware",
    title: "Daewoo E&C Vina Groupware",
    category: "Enterprise",
    role: "Full Stack Developer @ INFINIQ",
    period: "05/2026 – Present",
    highlight: "600+ Corporate Accounts • RBAC",
    icon: <BusinessIcon />,
    description: "Multi-company enterprise groupware platform centralizing HRM, dynamic approval workflows, asset management (800+ physical and digital assets), and meeting room/resource booking for 600+ corporate accounts across the corporation and subsidiaries.",
    tags: ["ASP.NET Core 10", "Next.js", "TypeScript", "Dapper", "PostgreSQL", "Redis", "Hangfire", "Tailwind CSS", "RBAC"]
  },
  {
    id: "mario-education",
    title: "Mario Education (EdTech SaaS)",
    category: "SaaS & Cloud",
    role: "Full Stack Developer @ Bright Soft",
    period: "01/2026 – 05/2026",
    highlight: "100+ International Schools",
    icon: <SchoolIcon />,
    description: "Multi-tenant SaaS tracking special education progress across 100+ international schools. Optimized real-time speech-to-text integration using Web Speech API (~98% latency reduction), built high-performance reporting dashboards, and optimized SQL Server queries for large-scale PDF/CSV exports.",
    link: "https://marioeducation.com/",
    linkText: "Visit Mario Education",
    tags: ["ASP.NET Core 8", "React.js", "SQL Server", "EF Core", "Web Speech API", "Reporting Engine"]
  },
  {
    id: "narsus",
    title: "NarSus - Remote NAS Monitoring System",
    category: "Enterprise",
    role: "Full Stack Developer @ KIS Vietnam",
    period: "01/2025 – 06/2025",
    highlight: "Real-time Diagnostics & Storage",
    icon: <DnsIcon />,
    description: "Enterprise web application enabling remote real-time monitoring, diagnostics, and management for Network Attached Storage (NAS) devices. Maintained and enhanced core system modules, refactored React UI components, and improved dashboard responsiveness.",
    tags: ["Java", "React.js", "Node.js", "PostgreSQL", "REST API", "Unit Testing"]
  },
  {
    id: "interactive-whiteboard",
    title: "Interactive WhiteBoard (IODATA)",
    category: "Cross-Platform",
    role: "Full Stack Developer @ KIS Vietnam",
    period: "07/2024 – 12/2024",
    highlight: "Commercial .NET MAUI Software",
    icon: <DevicesIcon />,
    description: "Cross-platform interactive educational software supporting high-performance digital drawing, note-taking, and real-time screen sharing. Migrated architecture from legacy Xamarin.Forms to modern .NET MAUI, ensuring smooth real-time stylus/touch rendering.",
    link: "https://www.iodata.jp/product/lcd/iwb/iwbapp-wb/",
    linkText: "Product Page",
    tags: ["C#", ".NET MAUI", "Xamarin.Forms", "Cross-Platform", "Real-time Graphics"]
  }
];

const categories = ["All", "SaaS & Cloud", "Enterprise", "Microservices & K8s", "Cross-Platform"];

function Project() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div className="projects-section" id="projects">
      <div className="projects-header">
        <h1>Featured Projects</h1>
        <p className="projects-subtitle">
          A showcase of scalable enterprise platforms, multi-tenant SaaS applications, 
          and high-concurrency microservices I have built and maintained.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div className="bento-card" key={project.id}>
            <div className="card-top">
              <div className="icon-badge-row">
                <div className="bento-icon-box">
                  {project.icon}
                </div>
                <span className="bento-highlight-badge">{project.highlight}</span>
              </div>

              <div className="bento-meta">
                <span className="bento-role">{project.role}</span>
                <span className="bento-period">{project.period}</span>
              </div>

              <h2 className="bento-title">{project.title}</h2>
            </div>

            <p className="bento-desc">{project.description}</p>

            <div className="bento-tags">
              {project.tags.map((tag, idx) => (
                <span className="tech-pill" key={idx}>{tag}</span>
              ))}
            </div>

            {project.link && (
              <div className="bento-footer">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bento-link"
                >
                  <span>{project.linkText || "View Reference"}</span>
                  <OpenInNewIcon fontSize="small" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
