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

  const handleCv = (style) => {
    setCv(style);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
      experiences: [
        ...formData.experiences,
        { jobTitle: '', company: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const addLeadership = () => {
    setFormData({
      ...formData,
      leaderships: [
        ...formData.leaderships,
        { role: '', organization: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    const drawHR = () => {
      doc.setLineWidth(0.5);
      doc.line(10, yPos, 200, yPos);
      yPos += 5;
    };

    if (cv === 'cv1') {
   
      doc.setFont('times', 'bold');
      doc.setFontSize(22);
      doc.text(formData.name || 'Your Name', 10, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setFont('times', 'normal');
      doc.text(
        `${formData.email || 'your.email@example.com'}  •  ${formData.phone || '(123) 456-7890'}  •  ${formData.website || 'your-website.com'}`,
        10,
        yPos
      );
      yPos += 8;
      doc.text(
        `${formData.linkedin || 'linkedin.com/in/yourprofile'}  •  ${formData.github || 'github.com/yourgithub'}`,
        10,
        yPos
      );
      yPos += 8;
      drawHR();

      doc.setFont('times', 'bold');
      doc.setFontSize(16);
      doc.text('EDUCATION', 10, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setFont('times', 'bold');
      doc.text(formData.university || 'Your University', 10, yPos);
      yPos += 8;
      doc.setFont('times', 'normal');
      doc.text(`${formData.degree || 'Your Degree'} | GPA: ${formData.gpa || 'N/A'}`, 10, yPos);
      yPos += 8;
      doc.text(`Honors: ${formData.honors || 'None'}`, 10, yPos);
      yPos += 8;
      doc.text(`Relevant Coursework: ${formData.coursework || 'None'}`, 10, yPos);
      yPos += 8;
      drawHR();

      doc.setFont('times', 'bold');
      doc.setFontSize(16);
      doc.text('SKILLS', 10, yPos);
      yPos += 10;

      doc.setFontSize(12);
      doc.setFont('times', 'bold');
      doc.text('Programming Languages:', 10, yPos);
      doc.setFont('times', 'normal');
      doc.text(formData.languages || 'None', 60, yPos);
      yPos += 8;

      doc.setFont('times', 'bold');
      doc.text('Tech/Tools:', 10, yPos);
      doc.setFont('times', 'normal');
      doc.text(formData.tools || 'None', 45, yPos);
      yPos += 10;
      drawHR();

      if (formData.experiences.length > 0) {
        doc.setFont('times', 'bold');
        doc.setFontSize(16);
        doc.text('EXPERIENCE', 10, yPos);
        yPos += 10;

        autoTable(doc, {
          startY: yPos,
          head: [['Job Title', 'Company', 'Duration', 'Description']],
          body: formData.experiences.map((exp) => [
            exp.jobTitle,
            exp.company,
            `${exp.startDate} - ${exp.endDate}`,
            exp.description,
          ]),
          theme: 'grid',
        });
        yPos = doc.autoTable.previous.finalY + 5;
        drawHR();
      }

      if (formData.leaderships.length > 0) {
        doc.setFont('times', 'bold');
        doc.setFontSize(16);
        doc.text('LEADERSHIP & INVOLVEMENT', 10, yPos);
        yPos += 10;

        autoTable(doc, {
          startY: yPos,
          head: [['Role', 'Organization', 'Duration', 'Description']],
          body: formData.leaderships.map((lead) => [
            lead.role,
            lead.organization,
            `${lead.startDate} - ${lead.endDate}`,
            lead.description,
          ]),
          theme: 'grid',
        });
      }
    }

    if (cv === 'cv2') {
      
      doc.setFont('times', 'bold');
      doc.setFontSize(16);
      doc.text(formData.name || 'Your Name', 10, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont('times', 'normal');
      doc.text(
        `${formData.email || 'your.email@example.com'}  ${formData.phone || '(123) 456-7890'}  ${formData.website || 'your-website.com'}`,
        10,
        yPos
      );
      yPos += 6;
      doc.text(
        `${formData.linkedin || 'linkedin.com/in/yourprofile'}  ${formData.github || 'github.com/yourgithub'}`,
        10,
        yPos
      );
      yPos += 10;
      drawHR();

      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.text('EDUCATION', 10, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont('times', 'bold');
      doc.text(formData.university || 'Your University', 10, yPos);
      yPos += 6;
      doc.setFont('times', 'normal');
      doc.text(`${formData.degree || 'Your Degree'} | GPA: ${formData.gpa || 'N/A'}`, 10, yPos);
      yPos += 6;
      doc.text(`Honors: ${formData.honors || 'None'}`, 10, yPos);
      yPos += 6;
      doc.text(`Relevant Coursework: ${formData.coursework || 'None'}`, 10, yPos);
      yPos += 10;
      drawHR();

      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.text('SKILLS', 10, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont('times', 'bold');
      doc.text('Programming Languages:', 10, yPos);
      doc.setFont('times', 'normal');
      doc.text(formData.languages || 'None', 50, yPos);
      yPos += 6;

      doc.setFont('times', 'bold');
      doc.text('Tech/Tools:', 10, yPos);
      doc.setFont('times', 'normal');
      doc.text(formData.tools || 'None', 40, yPos);
      yPos += 10;
      drawHR();

      if (formData.experiences.length > 0) {
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text('EXPERIENCE', 10, yPos);
        yPos += 8;

        formData.experiences.forEach((exp) => {
          doc.setFontSize(10);
          doc.setFont('times', 'bold');
          doc.text(`${exp.jobTitle} | ${exp.company}`, 10, yPos);
          yPos += 6;
          doc.setFont('times', 'normal');
          doc.text(`${exp.startDate} - ${exp.endDate}`, 10, yPos);
          yPos += 6;
          doc.text(exp.description, 10, yPos, { maxWidth: 180 });
          yPos += 10;
        });

        drawHR();
      }

      if (formData.leaderships.length > 0) {
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text('LEADERSHIP & INVOLVEMENT', 10, yPos);
        yPos += 8;

        formData.leaderships.forEach((lead) => {
          doc.setFontSize(10);
          doc.setFont('times', 'bold');
          doc.text(`${lead.role} | ${lead.organization}`, 10, yPos);
          yPos += 6;
          doc.setFont('times', 'normal');
          doc.text(`${lead.startDate} - ${lead.endDate}`, 10, yPos);
          yPos += 6;
          doc.text(lead.description, 10, yPos, { maxWidth: 180 });
          yPos += 10;
        });
      }
    }

    doc.save('resume.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center p-6 text-white">

    
<h1 className="text-3xl font-bold mb-10">Create Your Resume</h1>  
<div className="flex flex-wrap gap-6">
  <div
    className={`cursor-pointer transition-transform  m-4 transform ${cv === 'cv1' ? 'scale-125 border-4 border-white' : 'hover:scale-110'}`}
    onClick={() => handleCv('cv1')}
  >
    <Image src="/cv.png" alt="CV Style 1" width={250} height={150} className="shadow-lg" />
  </div>
  <div
    className={`cursor-pointer transition-transform transform m-5 ${cv === 'cv2' ? 'scale-125 border-4 border-white' : 'hover:scale-110'}`}
    onClick={() => handleCv('cv2')}
  >
    <Image src="/cv2.png" alt="CV Style 2" width={250} height={150} className=" shadow-lg" />
  </div>
</div>

       
       <div className="bg-white text-black rounded-xl shadow-xl p-6 mt-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center mb-4">Personal Information</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <input type="text" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" id="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" id="website" placeholder="Website" value={formData.website} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" id="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" id="github" placeholder="GitHub" value={formData.github} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <h2 className="text-xl font-bold text-center mt-6 mb-4">Education</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" id="university" placeholder="University" value={formData.university} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" id="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" id="gpa" placeholder="GPA" value={formData.gpa} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" id="honors" placeholder="Honors" value={formData.honors} onChange={handleChange} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <h2 className="text-xl font-bold text-center mt-6 mb-4">Skills</h2>
        <input type="text" id="languages" placeholder="Programming Languages" value={formData.languages} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" id="tools" placeholder="Tech/Tools" value={formData.tools} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2" />

      
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
