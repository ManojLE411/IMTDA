import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  Award,
  Target,
  Eye,
  Briefcase,
  Users,
  Send,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import { Page } from '@/constants';
import { useEmployees } from '@/hooks/useEmployees';
import styles from './AboutPage.module.css';

interface AboutPageProps {
  onNavigate?: (page: Page) => void;
}

// Move static data outside component to avoid recreating on every render
const STATS = [
  { value: '12+', label: 'Years of Excellence', description: 'In software delivery and AI-led innovation.' },
  { value: '150+', label: 'Products & Platforms', description: 'Launched for clients across fintech, logistics, and edtech.' },
  { value: '200+', label: 'Certified Experts', description: 'Solving complex challenges in every phase of digital transformation.' },
  { value: '50+', label: 'Global Customers', description: 'Partnering with companies in India, APAC, and the US.' },
];

const FEATURES = [
  { title: 'Trusted Company', description: 'Reliable delivery, transparent execution, measurable outcomes.', icon: Award },
  { title: 'Professional Work', description: 'Modern engineering paired with design-led thinking.', icon: Briefcase },
  { title: 'Award Winning', description: 'Recognized for solutions that marry quality with speed.', icon: Target },
  { title: 'Help Anytime', description: 'Dedicated teams available across time zones and channels.', icon: MessageCircle },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { employees: teamMembers, loading } = useEmployees();
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Scroll to team section handler with cleanup
  const scrollToTeam = useCallback(() => {
    if (teamSectionRef.current) {
      setIsScrolling(true);
      teamSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set new timeout
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        scrollTimeoutRef.current = null;
      }, 1000);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Use useMemo for derived data that depends on teamMembers
  const hasTeamMembers = useMemo(() => teamMembers && teamMembers.length > 0, [teamMembers]);

  return (
    <div className={styles.pageContainer}>
      {/* Hero */}
      <div className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>About Us</p>
          <h1 className={styles.heroTitle}>
            Crafting digital experiences built for scale, speed, and trust.
          </h1>
          <p className={styles.heroDescription}>
            IMTDA Infotech partners with ambitious teams to engineer software, data, and AI solutions that accelerate growth,
            unlock insights, and delight customers across every channel.
          </p>
          {onNavigate && (
            <div className={styles.heroButtons}>
              <button 
                onClick={() => onNavigate(Page.CONTACT)} 
                className={styles.primaryButton}
              >
                <Send size={16} /> Talk to us
              </button>
              <button 
                onClick={scrollToTeam}
                disabled={isScrolling}
                className={styles.secondaryButton}
              >
                <Users size={16} /> Meet the team
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentSection}>
        {/* Stats */}
        <div className={styles.statsGrid}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <p className={styles.statValue}>{stat.value}</p>
              <h3 className={styles.statLabel}>{stat.label}</h3>
              <p className={styles.statDescription}>{stat.description}</p>
            </div>
          ))}
        </div>

        {/* About Copy */}
        <div className={styles.aboutSection}>
          <div>
            <h2 className={styles.sectionTitle}>Powerful agency for enterprise transformation.</h2>
            <p className={styles.sectionText}>
              We blend strategy, engineering, and AI to deliver bespoke platforms that run securely, scale gracefully,
              and keep humans at the center. From discovery workshops to product launches, our cross-disciplinary teams
              stay aligned with your goals and operate transparently.
            </p>
            <div className={styles.tagContainer}>
              <span className={styles.tag}>Strategy</span>
              <span className={styles.tag}>Engineering</span>
              <span className={styles.tag}>AI & Automation</span>
              <span className={styles.tag}>Delivery Excellence</span>
            </div>
          </div>
          <div className={styles.featuresContainer}>
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Icon />
                  </div>
                  <div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className={styles.principlesSection}>
          <div className={styles.principlesHeader}>
            <span className={styles.principlesLabel}>Principles</span>
            <div className={styles.principlesDivider}></div>
          </div>
          <div className={styles.principlesGrid}>
            <div className={styles.principleCard}>
              <div className={styles.principleHeader}>
                <Eye className={styles.principleIcon} />
                <h3 className={styles.principleTitle}>Vision</h3>
              </div>
              <p className={styles.principleText}>
                To be the go-to innovation partner for next-gen enterprises, powering intelligent & trustworthy products.
              </p>
              <p className={styles.principleTagline}>See beyond the horizon</p>
            </div>
            <div className={styles.principleCard}>
              <div className={styles.principleHeader}>
                <Target className={styles.principleIcon} />
                <h3 className={styles.principleTitle}>Mission</h3>
              </div>
              <p className={styles.principleText}>
                Deliver secure, scalable, and AI-powered software that answers real business problems with measurable impact.
              </p>
              <p className={styles.principleTagline}>Build with intent</p>
            </div>
            <div className={styles.principleCard}>
              <div className={styles.principleHeader}>
                <Award className={styles.principleIcon} />
                <h3 className={styles.principleTitle}>Values</h3>
              </div>
              <p className={styles.principleText}>
                Empathy, experimentation, and accountability drive how we engage, create, and deliver for every partner.
              </p>
              <p className={styles.principleTagline}>Be human. Be bold.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamSectionRef} className={styles.teamSection}>
          <div className={styles.teamHeader}>
            <div>
              <div className={styles.teamTitleContainer}>
                <Users className={styles.teamIcon} />
                <h2 className={styles.teamTitle}>Meet Our Core Team</h2>
              </div>
              <p className={styles.teamDescription}>
                Our strategic partners, product leads, and technologists work shoulder-to-shoulder with your team from day one.
              </p>
            </div>
            <span className={styles.teamBadge}>Trusted</span>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className={styles.loadingContainer}>
              <Loader2 className={styles.loadingIcon} />
              <p className={styles.loadingText}>Loading team members...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !hasTeamMembers && (
            <div className={styles.emptyContainer}>
              <Users className={styles.emptyIcon} />
              <p className={styles.emptyText}>No team members available at the moment.</p>
            </div>
          )}

          {/* Team Members Grid */}
          {!loading && hasTeamMembers && (
            <div className={styles.teamGrid}>
              {teamMembers.map((member) => (
                <article key={member.name} className={styles.memberCard}>
                  <div className={styles.memberImageContainer}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className={styles.memberImage}
                      onError={(e) => {
                        // Fallback image if the image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(member.name);
                      }}
                    />
                    <div className={styles.memberImageOverlay}></div>
                  </div>
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    <p className={styles.memberSummary}>{member.summary}</p>
                    <div className={styles.memberSkills}>
                      {member.skills && member.skills.map((skill) => (
                        <span key={skill} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

