import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '@/assets/styles/Expertise.scss';

const labelsFirst = [
    "ASP.NET Core",
    "C#",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Java",
    "Python",
    "EF Core",
    "Dapper",
    "Node.js",
    "SignalR"
];

const labelsSecond = [
    "PostgreSQL",
    "SQL Server",
    "Redis",
    "MariaDB",
    "MySQL",
    "Hangfire",
    "Atomic Lua Scripts",
    "Multi-tenancy Architecture",
    "High Concurrency"
];

const labelsThird = [
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "Argo Workflows",
    "Nginx",
    "Prometheus",
    "Grafana",
    "Loki (PLG Stack)",
    "Cloudflare R2",
    "AWS S3"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise & Skills</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Full Stack Web Development</h3>
                    <p>2.5+ years of hands-on experience developing end-to-end web applications. Strong expertise in building clean architecture backends with ASP.NET Core & C#, paired with modern, responsive frontends using React, Next.js, and TypeScript.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDatabase} size="3x"/>
                    <h3>Databases & High-Concurrency</h3>
                    <p>Experienced in architecting multi-tenant databases with strict tenant data isolation, optimizing complex queries, and eliminating race conditions during peak windows using atomic Redis Lua scripts.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>Microservices, K8s & DevOps</h3>
                    <p>Containerizing microservices via Docker & Kubernetes, provisioning automated sandboxes via Argo Workflows, establishing CI/CD with GitHub Actions, and implementing full-stack observability with Prometheus, Grafana, and Loki (PLG Stack).</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
