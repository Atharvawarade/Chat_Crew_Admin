import React from 'react';
import AdmissionForm from './forms/AdmissionForm';
import CurriculumForm from './forms/CurriculumForm';
import FeeStructureForm from './forms/FeeStructureForm';
import ScholarshipForm from './forms/ScholarshipForm';
import InfrastructureForm from './forms/InfrastructureForm';
import AlumniForm from './forms/AlumniForm';
import UploadFormSimple from './UploadFormSimple'; // The preserved original form


const UploadFormExtended = ({ onReturn, collectionName }) => {
  const renderForm = () => {
    switch (collectionName) {
      case 'AdmissionData':
        return <AdmissionForm />;
      case 'CurriculumUpdates':
        return <CurriculumForm />;
      case 'FeeStructure':
        return <FeeStructureForm />;
      case 'ScholarshipData':
        return <ScholarshipForm />;
      case 'InfrastructureDetails':
        return <InfrastructureForm />;
      case 'AlumniNetwork':
        return <AlumniForm />;
      default:
        // Fallback to the original UploadFormSimple if no specialized form exists
        return (
          <>
            <h3>Custom form not available, using default upload form.</h3>
            <UploadFormSimple onReturn={onReturn} collectionName={collectionName} />
          </>
        );
    }
  };

  return (
    <div className="upload-form-container">
      <button onClick={onReturn} className="return-button">
        Return to Dashboard
      </button>
      {renderForm()}
    </div>
  );
};

export default UploadFormExtended;
