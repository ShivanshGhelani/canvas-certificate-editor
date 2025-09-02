import React from 'react';
import { FaCertificate } from 'react-icons/fa';

const Sidebar = () => {
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
            <div className="flex-1 overflow-y-auto p-5">
                <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FaCertificate className="text-blue-500" />
                        Certificate Templates
                    </h3>

                    <div className="flex flex-col gap-3">
                        {[
                            { title: 'Academic Achievement', desc: 'Classic academic certificate design' },
                            { title: 'Professional Award', desc: 'Modern professional certificate' },
                            { title: 'Course Completion', desc: 'Training course certificate' },
                            { title: 'Appreciation', desc: 'Certificate of appreciation' }
                        ].map((template, index) => (
                            <div 
                                key={index} 
                                className="p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm"
                            >
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                                    {template.title}
                                </h4>
                                <p className="text-xs text-gray-500">
                                    {template.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
