import React, { useState } from 'react';
import { FaCertificate, FaAward, FaGraduationCap, FaTrophy } from 'react-icons/fa';

const TemplateManager = ({ onTemplateLoad }) => {
  console.log('TemplateManager rendered with onTemplateLoad:', !!onTemplateLoad);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'academic-achievement',
      name: 'Academic Achievement',
      description: 'Classic academic certificate design',
      icon: FaGraduationCap,
      elements: [
        {
          id: 'title',
          type: 'text',
          content: 'Certificate of Achievement',
          x: 400,
          y: 150,
          fontSize: 36,
          fontWeight: 'bold',
          fontFamily: 'Cinzel',
          color: '#2c3e50',
          textAlign: 'center'
        },
        {
          id: 'subtitle',
          type: 'text',
          content: 'This is to certify that',
          x: 400,
          y: 220,
          fontSize: 18,
          fontFamily: 'Lora',
          color: '#34495e',
          textAlign: 'center'
        },
        {
          id: 'recipient',
          type: 'text',
          content: 'Student Name',
          x: 400,
          y: 280,
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'Playfair Display',
          color: '#2a6df4',
          textAlign: 'center'
        },
        {
          id: 'description',
          type: 'text',
          content: 'has successfully completed the requirements and is awarded this certificate',
          x: 400,
          y: 350,
          fontSize: 16,
          fontFamily: 'Lora',
          color: '#34495e',
          textAlign: 'center'
        },
        {
          id: 'course',
          type: 'text',
          content: 'Course/Program Name',
          x: 400,
          y: 420,
          fontSize: 24,
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
          color: '#2c3e50',
          textAlign: 'center'
        },
        {
          id: 'date',
          type: 'text',
          content: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          x: 200,
          y: 520,
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#34495e',
          textAlign: 'left'
        }
      ]
    },
    {
      id: 'professional-award',
      name: 'Professional Award',
      description: 'Modern professional certificate',
      icon: FaAward,
      elements: [
        {
          id: 'title',
          type: 'text',
          content: 'Professional Excellence Award',
          x: 400,
          y: 140,
          fontSize: 40,
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
          color: '#1a237e',
          textAlign: 'center'
        },
        {
          id: 'subtitle',
          type: 'text',
          content: 'Presented to',
          x: 400,
          y: 200,
          fontSize: 20,
          fontFamily: 'Lato',
          color: '#424242',
          textAlign: 'center'
        },
        {
          id: 'recipient',
          type: 'text',
          content: 'Employee Name',
          x: 400,
          y: 260,
          fontSize: 36,
          fontWeight: 'bold',
          fontFamily: 'Raleway',
          color: '#e91e63',
          textAlign: 'center'
        },
        {
          id: 'description',
          type: 'text',
          content: 'For outstanding performance and dedication to excellence',
          x: 400,
          y: 330,
          fontSize: 18,
          fontFamily: 'Open Sans',
          color: '#424242',
          textAlign: 'center'
        },
        {
          id: 'department',
          type: 'text',
          content: 'Department/Division',
          x: 400,
          y: 390,
          fontSize: 20,
          fontWeight: '600',
          fontFamily: 'Poppins',
          color: '#1a237e',
          textAlign: 'center'
        }
      ]
    },
    {
      id: 'course-completion',
      name: 'Course Completion',
      description: 'Training course certificate',
      icon: FaCertificate,
      elements: [
        {
          id: 'title',
          type: 'text',
          content: 'Certificate of Completion',
          x: 400,
          y: 160,
          fontSize: 38,
          fontWeight: 'bold',
          fontFamily: 'Cormorant Garamond',
          color: '#2e7d32',
          textAlign: 'center'
        },
        {
          id: 'subtitle',
          type: 'text',
          content: 'This certifies that',
          x: 400,
          y: 220,
          fontSize: 16,
          fontFamily: 'Libre Baskerville',
          color: '#37474f',
          textAlign: 'center'
        },
        {
          id: 'recipient',
          type: 'text',
          content: 'Participant Name',
          x: 400,
          y: 280,
          fontSize: 30,
          fontWeight: 'bold',
          fontFamily: 'Dancing Script',
          color: '#d32f2f',
          textAlign: 'center'
        },
        {
          id: 'description',
          type: 'text',
          content: 'has successfully completed the training program',
          x: 400,
          y: 340,
          fontSize: 16,
          fontFamily: 'Merriweather',
          color: '#37474f',
          textAlign: 'center'
        },
        {
          id: 'course',
          type: 'text',
          content: 'Course Title',
          x: 400,
          y: 400,
          fontSize: 22,
          fontWeight: 'bold',
          fontFamily: 'Oswald',
          color: '#2e7d32',
          textAlign: 'center'
        },
        {
          id: 'duration',
          type: 'text',
          content: 'Duration: 40 Hours',
          x: 400,
          y: 450,
          fontSize: 14,
          fontFamily: 'Roboto',
          color: '#546e7a',
          textAlign: 'center'
        }
      ]
    },
    {
      id: 'appreciation',
      name: 'Appreciation Certificate',
      description: 'Certificate of appreciation',
      icon: FaTrophy,
      elements: [
        {
          id: 'title',
          type: 'text',
          content: 'Certificate of Appreciation',
          x: 400,
          y: 150,
          fontSize: 36,
          fontWeight: 'bold',
          fontFamily: 'Great Vibes',
          color: '#8e24aa',
          textAlign: 'center'
        },
        {
          id: 'subtitle',
          type: 'text',
          content: 'Gratefully presented to',
          x: 400,
          y: 210,
          fontSize: 18,
          fontFamily: 'Parisienne',
          color: '#4a148c',
          textAlign: 'center'
        },
        {
          id: 'recipient',
          type: 'text',
          content: 'Honoree Name',
          x: 400,
          y: 270,
          fontSize: 34,
          fontWeight: 'bold',
          fontFamily: 'Allura',
          color: '#d32f2f',
          textAlign: 'center'
        },
        {
          id: 'description',
          type: 'text',
          content: 'In recognition of outstanding service and valuable contributions',
          x: 400,
          y: 340,
          fontSize: 16,
          fontFamily: 'Lora',
          color: '#424242',
          textAlign: 'center'
        },
        {
          id: 'organization',
          type: 'text',
          content: 'Organization Name',
          x: 400,
          y: 400,
          fontSize: 20,
          fontWeight: '600',
          fontFamily: 'Cinzel',
          color: '#8e24aa',
          textAlign: 'center'
        }
      ]
    }
  ];

  const loadTemplate = (template) => {
    console.log('Loading template:', template.name);
    setSelectedTemplate(template);
    if (onTemplateLoad) {
      onTemplateLoad(template);
    }
    
    // Also trigger global template loading for any listening systems
    const event = new CustomEvent('templateLoaded', { 
      detail: template 
    });
    window.dispatchEvent(event);
  };

  console.log('Rendering', templates.length, 'templates');

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaCertificate className="text-blue-500" />
        Certificate Templates
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Choose a template - all elements are editable, draggable, and deletable
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {templates.map(template => {
          const IconComponent = template.icon;
          return (
            <div 
              key={template.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedTemplate?.id === template.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => loadTemplate(template)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <IconComponent className="text-blue-500 text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {template.description}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {template.elements.length} elements
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedTemplate && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Template loaded:</strong> {selectedTemplate.name}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Double-click any element to edit text. Drag to move. Click delete button (×) to remove elements.
          </p>
        </div>
      )}
    </div>
  );
};

export default TemplateManager;
