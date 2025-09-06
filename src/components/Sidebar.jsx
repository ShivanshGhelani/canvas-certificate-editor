import React from 'react';
import TemplateManager from './TemplateManager';

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
                <TemplateManager onTemplateLoad={onTemplateLoad} />
            </div>
        </div>
    );
};

export default Sidebar;
