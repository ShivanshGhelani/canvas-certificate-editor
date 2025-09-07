import React, { useState, useEffect } from 'react';
import DimensionSelector from './DimensionSelector';

const Sidebar = ({ onTemplateLoad }) => {
    const [selectedDimension, setSelectedDimension] = useState('portrait');

    // Listen for dimension changes
    useEffect(() => {
        const handleDimensionChange = (event) => {
            setSelectedDimension(event.detail.dimension);
        };

        window.addEventListener('dimensionChanged', handleDimensionChange);
        return () => window.removeEventListener('dimensionChanged', handleDimensionChange);
    }, []);

    // Function to load template by triggering template loading event
    const handleTemplateClick = (templateId) => {
        console.log('Template clicked:', templateId);
        
        // Trigger template loading through custom event
        const event = new CustomEvent('templateLoadRequested', {
            detail: {
                templateId: templateId,
                dimension: selectedDimension
            }
        });
        window.dispatchEvent(event);
    };

    // Portrait templates with meaningful names
    const portraitTemplates = [
        {
            id: 'academic-achievement',
            name: 'Academic Achievement Certificate',
            description: 'Perfect for graduation and academic accomplishments',
            elements: 6,
            icon: (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            id: 'professional-award',
            name: 'Professional Excellence Award',
            description: 'Ideal for workplace recognition and achievements',
            elements: 5,
            icon: (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            id: 'course-completion',
            name: 'Course Completion Certificate',
            description: 'Great for training programs and skill development',
            elements: 6,
            icon: (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            id: 'appreciation-certificate',
            name: 'Certificate of Appreciation',
            description: 'Perfect for recognizing contributions and efforts',
            elements: 5,
            icon: (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363 1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        }
    ];

    // Landscape templates with meaningful names
    const landscapeTemplates = [
        {
            id: 'elegant-black-gold-seminar',
            name: 'Elegant Seminar Certificate',
            description: 'Black and gold design for professional seminars',
            elements: 7,
            icon: (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            id: 'navy-tech-webinar',
            name: 'Technology Webinar Certificate',
            description: 'Modern navy and turquoise for tech events',
            elements: 6,
            icon: (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    const currentTemplates = selectedDimension === 'landscape' ? landscapeTemplates : portraitTemplates;
    return (
        <div className='w-80 h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden'>
            {/* Header */}
            <div className='p-4 border-b border-gray-200 flex items-center justify-center'>
                <div className="flex items-center space-x-3">
                    <img
                        src="/logo/ksv.png"
                        alt="KSV Logo"
                        className="h-8 w-8 object-contain"
                    />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Campus<span className="text-blue-600">Connect</span>
                        </h1>
                        <p className="text-sm text-gray-500">
                            Certificate Management
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <DimensionSelector />
                
                {/* Certificate Templates */}
                <div className="p-4">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Certificate Templates</h2>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                        Choose a template - all elements are editable, draggable, and deletable
                        <span className="block text-xs text-blue-600 mt-1">
                            Showing {selectedDimension} templates
                        </span>
                    </p>
                    
                    {/* Template List */}
                    <div className="space-y-3">
                        {currentTemplates.map((template) => (
                            <div 
                                key={template.id}
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                                onClick={() => handleTemplateClick(template.id)}
                            >
                                <div className="flex items-center mb-2">
                                    <div className="bg-blue-100 p-1.5 rounded mr-3">
                                        {template.icon}
                                    </div>
                                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                                </div>
                                <p className="text-sm text-gray-600">{template.description}</p>
                                <div className="mt-2 text-xs text-green-600 font-medium">{template.elements} elements</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
