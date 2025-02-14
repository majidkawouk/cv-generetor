'use client';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Image from 'next/image';

export default function ResumeBuilder() {
  const [cv, setCv] = useState('cv1');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    github: '',
    university: '',
    degree: '',
    gpa: '',
    honors: '',
    coursework: '',
    languages: '',
    tools: '',
    experiences: [],
    leaderships: [],
  });

  const handleCv = (style) => setCv(style);
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleExperienceChange = (e, index) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index][e.target.name] = e.target.value;
    setFormData({ ...formData, experiences: updatedExperiences });
  };

  const handleLeadershipChange = (e, index) => {
    const updatedLeaderships = [...formData.leaderships];
    updatedLeaderships[index][e.target.name] = e.target.value;
    setFormData({ ...formData, leaderships: updatedLeaderships });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
    });
  };

  const addLeadership = () => {
    setFormData({
      ...formData,
      leaderships: [...formData.leaderships, { role: '', organization: '', startDate: '', endDate: '', description: '' }],
    });
  };

  const generatePDF = () => {
    // Your existing PDF generation logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center p-6 text-white">
      <h1 className="text-3xl font-bold mb-5">Create Your Resume</h1>
      
      <div className="flex flex-wrap gap-6">
        <div className="cursor-pointer transition-transform transform hover:scale-110" onClick={() => handleCv('cv1')}>
          <Image src="/cv.png" alt="CV Style 1" width={250} height={150} className="rounded-lg shadow-lg" />
        </div>
        <div className="cursor-pointer transition-transform transform hover:scale-110" onClick={() => handleCv('cv2')}>
          <Image src="/cv2.png" alt="CV Style 2" width={250} height={150} className="rounded-lg shadow-lg" />
        </div>
      </div>

      <div className="bg-white text-black rounded-xl shadow-xl p-6 mt-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          {['name', 'email', 'phone', 'website', 'linkedin', 'github'].map((field) => (
            <input
              key={field}
              type="text"
              id={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold text-center mt-6 mb-4">Education</h2>
        <div className="grid grid-cols-2 gap-4">
          {['university', 'degree', 'gpa', 'honors'].map((field) => (
            <input
              key={field}
              type="text"
              id={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold text-center mt-6 mb-4">Skills</h2>
        {['languages', 'tools'].map((field) => (
          <input
            key={field}
            type="text"
            id={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
          />
        ))}

        <h2 className="text-xl font-bold text-center mt-6 mb-4">Experience</h2>
        {formData.experiences.map((exp, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mt-4 p-2 border rounded-md">
            {['jobTitle', 'company', 'startDate', 'endDate', 'description'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={exp[field]}
                onChange={(e) => handleExperienceChange(e, index)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="mt-3 w-full p-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          + Add Experience
        </button>

        <h2 className="text-xl font-bold text-center mt-6 mb-4">Leadership & Involvement</h2>
        {formData.leaderships.map((lead, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mt-4 p-2 border rounded-md">
            {['role', 'organization', 'startDate', 'endDate', 'description'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={lead[field]}
                onChange={(e) => handleLeadershipChange(e, index)}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={addLeadership}
          className="mt-3 w-full p-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          + Add Leadership & Involvement
        </button>

        <button
          onClick={generatePDF}
          className="mt-4 w-full p-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}
