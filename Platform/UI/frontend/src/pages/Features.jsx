import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileAlt, faSearch, faUserCheck, faComments, faClipboardList, faUsersCog, faCommentAlt } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

function Features() {
  return (
    <section className="F_container">
      <h2 className="header">NOS SERVICES</h2>
      <div className="features">
        <div className="card">
          <span><FontAwesomeIcon icon={faUserPlus} /></span>
          <h4>User Registration</h4>
          <p>
            Register as a student or supervisor. Provide necessary information and create an account to access platform features.
          </p>
        </div>
        <div className="card">
          <span><FontAwesomeIcon icon={faFileAlt} /></span>
          <h4>Project Submission</h4>
          <p>
            Submit project proposals as a supervisor or student. Include project details, objectives, and required skills.
          </p>
        </div>
        <div className="card">
          <span><FontAwesomeIcon icon={faSearch} /></span>
          <h4>Project Search and Filtering</h4>
          <p>
            Search for projects based on keywords, supervisor name, or project type. Refine search results using filters.
          </p>
        </div>
        <div className="card">
          <span><FontAwesomeIcon icon={faUserCheck} /></span>
          <h4>Supervisor Selection</h4>
          <p>
            View supervisor profiles and request supervision. Choose supervisors based on expertise and availability.
          </p>
        </div>
        <div className="card">
          <span><FontAwesomeIcon icon={faComments} /></span>
          <h4>Communication Tools</h4>
          <p>
            Communicate with supervisors through messaging or email. Schedule meetings and discussions within the platform.
          </p>
        </div>
        <div className="card">
          <span><FontAwesomeIcon icon={faClipboardList} /></span>
          <h4>Project Tracking</h4>
          <p>
            Track project progress and receive feedback from supervisors. Stay updated on project milestones and deadlines.
          </p>
        </div>
        <div className="card">
          <span><FontAwesomeIcon icon={faUsersCog} /></span>
          <h4>Automatic Assignment</h4>
          <p>
            Assign projects to students automatically based on preferences and availability. Ensure fairness in project distribution.
          </p>
        </div>
        <div className="card">
          <span><FontAwesomeIcon icon={faCommentAlt} /></span>
          <h4>Notification System</h4>
          <p>
            Receive notifications about project updates, new messages, and upcoming deadlines. Stay informed about platform activities.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
