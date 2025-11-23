import { useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { useInternshipApplication } from '@/hooks/useInternshipApplication';
import { useTrainingPrograms } from '@/hooks/useTrainingPrograms';
import { User, BookOpen, FileText } from 'lucide-react';
import { EmptyState, Badge } from '@/components/ui';
import { InternshipApplication } from '@/types/internship.types';
import { TrainingProgram } from '@/types/training.types';
import styles from './StudentDashboardPage.module.css';

interface StudentDashboardPageProps {
  onNavigate?: (page: Page) => void;
}

/**
 * Get badge variant based on application status
 */
const getStatusVariant = (status: string): 'success' | 'danger' | 'warning' => {
  switch(status) {
    case 'Approved': return 'success';
    case 'Rejected': return 'danger';
    default: return 'warning';
  }
};

/**
 * Application Item Component
 */
interface ApplicationItemProps {
  application: InternshipApplication;
}

const ApplicationItem = memo<ApplicationItemProps>(({ application }) => {
  return (
    <div className={styles.applicationItem}>
      <div className={styles.applicationInfo}>
        <h3 className={styles.applicationTitle}>{application.course}</h3>
        <p className={styles.applicationDate}>Applied on: {application.date}</p>
      </div>
      <Badge variant={getStatusVariant(application.status)} className={styles.statusBadge}>
        {application.status}
      </Badge>
    </div>
  );
});

ApplicationItem.displayName = 'ApplicationItem';

/**
 * Training Card Component
 */
interface TrainingCardProps {
  program: TrainingProgram;
  onViewDetails: () => void;
}

const TrainingCard = memo<TrainingCardProps>(({ program, onViewDetails }) => {
  return (
    <div className={styles.trainingCard}>
      <h3 className={styles.trainingTitle}>{program.title}</h3>
      <p className={styles.trainingDescription}>{program.description}</p>
      <button 
        onClick={onViewDetails} 
        className={styles.trainingLink}
        type="button"
        aria-label={`View details for ${program.title}`}
      >
        View Details
      </button>
    </div>
  );
});

TrainingCard.displayName = 'TrainingCard';

/**
 * Profile Card Component
 */
interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    createdAt?: string;
  };
}

const ProfileCard = memo<ProfileCardProps>(({ user }) => {
  const memberSince = useMemo(() => {
    return user.createdAt 
      ? new Date(user.createdAt).getFullYear() 
      : new Date().getFullYear();
  }, [user.createdAt]);

  return (
    <div className={styles.profileCard}>
      <h3 className={styles.profileTitle}>My Profile</h3>
      <div className={styles.profileInfo}>
        <div className={styles.profileItem}>
          <span className={styles.profileLabel}>Full Name</span>
          <span className={styles.profileValue}>{user.name}</span>
        </div>
        <div className={styles.profileItem}>
          <span className={styles.profileLabel}>Email</span>
          <span className={styles.profileValue}>{user.email}</span>
        </div>
        <div className={styles.profileItem}>
          <span className={styles.profileLabel}>Phone</span>
          <span className={styles.profileValue}>{user.phone || 'N/A'}</span>
        </div>
        <div className={styles.profileItem}>
          <span className={styles.profileLabel}>Member Since</span>
          <span className={styles.profileValue}>{memberSince}</span>
        </div>
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';

/**
 * Welcome Header Component
 */
interface WelcomeHeaderProps {
  userName: string;
  userEmail: string;
  onNavigateToTraining: () => void;
  onNavigateToInternships: () => void;
}

const WelcomeHeader = memo<WelcomeHeaderProps>(({ 
  userName, 
  userEmail, 
  onNavigateToTraining, 
  onNavigateToInternships 
}) => {
  const userInitial = useMemo(() => userName.charAt(0).toUpperCase(), [userName]);

  return (
    <div className={styles.welcomeHeader}>
      <div className={styles.avatar} aria-label={`${userName}'s avatar`}>
        {userInitial}
      </div>
      <div className={styles.welcomeInfo}>
        <h1 className={styles.welcomeTitle}>Welcome back, {userName}!</h1>
        <p className={styles.welcomeSubtitle}>
          <User size={16} aria-hidden="true" /> Student Profile • {userEmail}
        </p>
      </div>
      <div className={styles.welcomeActions}>
        <button 
          onClick={onNavigateToTraining} 
          className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
          type="button"
          aria-label="Browse training programs"
        >
          Browse Training
        </button>
        <button 
          onClick={onNavigateToInternships} 
          className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
          type="button"
          aria-label="Apply for a new internship"
        >
          Apply New Internship
        </button>
      </div>
    </div>
  );
});

WelcomeHeader.displayName = 'WelcomeHeader';

/**
 * Main Student Dashboard Page Component
 */
export const StudentDashboardPage = ({ onNavigate }: StudentDashboardPageProps) => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { applications, loading: applicationsLoading } = useInternshipApplication();
  const { programs, loading: programsLoading } = useTrainingPrograms();

  // Memoize filtered applications to avoid recalculating on every render
  const myApplications = useMemo(() => {
    if (!currentUser) return [];
    return applications.filter(
      (app: InternshipApplication) => 
        app.email === currentUser.email || app.studentId === currentUser.id
    );
  }, [applications, currentUser]);

  // Memoize recommended programs to avoid recalculating on every render
  const recommendedPrograms = useMemo(() => {
    return programs.slice(0, 2);
  }, [programs]);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleNavigateToTraining = useCallback(() => {
    if (onNavigate) {
      onNavigate(Page.TRAINING);
    } else {
      navigate('/training');
    }
  }, [onNavigate, navigate]);

  const handleNavigateToInternships = useCallback(() => {
    if (onNavigate) {
      onNavigate(Page.INTERNSHIPS);
    } else {
      navigate('/internships');
    }
  }, [onNavigate, navigate]);

  const handleNavigateToContact = useCallback(() => {
    if (onNavigate) {
      onNavigate(Page.CONTACT);
    } else {
      navigate('/contact');
    }
  }, [onNavigate, navigate]);

  // Early return for unauthenticated users
  if (!currentUser) {
    return (
      <div className={styles.loginRequired}>
        <div className={styles.loginRequiredText}>Please log in to view your dashboard.</div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <WelcomeHeader
          userName={currentUser.name}
          userEmail={currentUser.email}
          onNavigateToTraining={handleNavigateToTraining}
          onNavigateToInternships={handleNavigateToInternships}
        />

        <div className={styles.mainGrid}>
          {/* Left Column: Applications Status */}
          <div>
            {/* Internship Applications */}
            <div className={`${styles.card} ${styles.applicationCard}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <FileText size={20} className={styles.cardTitleIcon} aria-hidden="true" /> 
                  My Internship Applications
                </h2>
                <span className={styles.cardBadge} aria-label={`${myApplications.length} applications`}>
                  {myApplications.length}
                </span>
              </div>
              
              <div className={styles.cardBody}>
                {applicationsLoading ? (
                  <EmptyState
                    type="loading"
                    title="Loading Applications"
                    message="Please wait while we load your applications..."
                    className={styles.emptyState}
                  />
                ) : myApplications.length > 0 ? (
                  <div className={styles.applicationsList} role="list">
                    {myApplications.map((app) => (
                      <ApplicationItem key={app.id} application={app} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    type="empty"
                    title="No Applications Yet"
                    message="You haven't applied for any internships yet."
                    action={
                      <button 
                        onClick={handleNavigateToInternships} 
                        className={styles.emptyLink}
                        type="button"
                        aria-label="Browse available internships"
                      >
                        Browse Internships
                      </button>
                    }
                    className={styles.emptyState}
                  />
                )}
              </div>
            </div>

            {/* Recommended Training */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <BookOpen size={20} className={styles.cardTitleIcon} aria-hidden="true" /> 
                  Recommended Training Programs
                </h2>
              </div>
              <div className={styles.cardBody}>
                {programsLoading ? (
                  <EmptyState
                    type="loading"
                    title="Loading Programs"
                    message="Please wait while we load training programs..."
                    className={styles.emptyState}
                  />
                ) : recommendedPrograms.length > 0 ? (
                  <div className={styles.trainingGrid} role="list">
                    {recommendedPrograms.map((prog) => (
                      <TrainingCard 
                        key={prog.id} 
                        program={prog}
                        onViewDetails={handleNavigateToTraining}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    type="empty"
                    title="No Training Programs"
                    message="No training programs available at the moment."
                    className={styles.emptyState}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Profile & Stats */}
          <div>
            <ProfileCard user={currentUser} />

            <div className={styles.helpCard}>
              <h3 className={styles.helpTitle}>Need Help?</h3>
              <p className={styles.helpDescription}>
                Contact our support team for queries regarding your application status.
              </p>
              <button 
                onClick={handleNavigateToContact} 
                className={styles.helpButton}
                type="button"
                aria-label="Contact support team"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

