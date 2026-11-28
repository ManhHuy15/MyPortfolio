import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '@/assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Work Experience & Education</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="05/2026 - Present"
            iconStyle={{ background: '#2563eb', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Full Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">INFINIQ Viet Nam</h4>
            <p style={{ marginTop: '8px', lineHeight: '1.6' }}>
              • Core developer for <strong>Daewoo E&C Vina Groupware</strong> enterprise platform.<br/>
              • Built dynamic approval workflows, asset management (800+ assets), centralized authentication & RBAC for 600+ corporate accounts.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="01/2026 - 05/2026"
            iconStyle={{ background: '#2563eb', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Full Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Bright Soft Solution Ltd</h4>
            <p style={{ marginTop: '8px', lineHeight: '1.6' }}>
              • Engineered core modules for <strong>Mario Education</strong> multi-tenant SaaS across 100+ international schools.<br/>
              • Optimized real-time speech-to-text integration (~98% latency reduction) and high-performance reporting dashboards.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="04/2024 - 09/2025"
            iconStyle={{ background: '#2563eb', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Full Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">KIS Vietnam Creative</h4>
            <p style={{ marginTop: '8px', lineHeight: '1.6' }}>
              • Developed <strong>NarSus</strong> real-time monitoring and diagnostics web app for enterprise NAS devices.<br/>
              • Migrated <strong>Interactive WhiteBoard</strong> cross-platform application from Xamarin.Forms to modern .NET MAUI.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="10/2021 - 12/2025"
            iconStyle={{ background: '#0284c7', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Software Engineering (Bachelor)</h3>
            <h4 className="vertical-timeline-element-subtitle">FPT University</h4>
            <p style={{ marginTop: '8px', lineHeight: '1.6' }}>
              • <strong>GPA:</strong> 3.3 / 4.0<br/>
              • <strong>Graduation Project:</strong> F-CTF System Performance Optimization — Awarded <strong>9.7/10</strong> by the defense committee.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
