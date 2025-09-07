import React from 'react';
import DimensionSelector from './DimensionSelector';

const Sidebar = ({ onTemplateLoad }) => {
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
                    </p>
                    
                    {/* Template List */}
                    <div className="space-y-3">
                        {/* Academic Achievement */}
                        <div 
                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                            onClick={() => onTemplateLoad && onTemplateLoad('academic')}
                        >
                            <div className="flex items-center mb-2">
                                <div className="bg-blue-100 p-1.5 rounded mr-3">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-gray-900">Academic Achievement</h3>
                            </div>
                            <p className="text-sm text-gray-600">Classic academic certificate design</p>
                            <div className="mt-2 text-xs text-green-600 font-medium">6 elements</div>
                        </div>
                        
                        {/* Professional Award */}
                        <div 
                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                            onClick={() => onTemplateLoad && onTemplateLoad('professional')}
                        >
                            <div className="flex items-center mb-2">
                                <div className="bg-blue-100 p-1.5 rounded mr-3">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-gray-900">Professional Award</h3>
                            </div>
                            <p className="text-sm text-gray-600">Modern professional certificate</p>
                            <div className="mt-2 text-xs text-green-600 font-medium">5 elements</div>
                        </div>
                        
                        {/* Course Completion */}
                        <div 
                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                            onClick={() => onTemplateLoad && onTemplateLoad('course')}
                        >
                            <div className="flex items-center mb-2">
                                <div className="bg-blue-100 p-1.5 rounded mr-3">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-gray-900">Course Completion</h3>
                            </div>
                            <p className="text-sm text-gray-600">Training course certificate</p>
                            <div className="mt-2 text-xs text-green-600 font-medium">6 elements</div>
                        </div>
                        
                        {/* Appreciation Certificate */}
                        <div 
                            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                            onClick={() => onTemplateLoad && onTemplateLoad('appreciation')}
                        >
                            <div className="flex items-center mb-2">
                                <div className="bg-blue-100 p-1.5 rounded mr-3">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-gray-900">Appreciation Certificate</h3>
                            </div>
                            <p className="text-sm text-gray-600">Certificate of appreciation</p>
                            <div className="mt-2 text-xs text-green-600 font-medium">5 elements</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
