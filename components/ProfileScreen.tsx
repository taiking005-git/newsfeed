
import React, { useState } from 'react';
import { ArrowLeftIcon, ChevronRightIcon, BellIcon, LogoutIcon } from './Icons';

interface ProfileScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const mockUser = {
    name: 'Casey Doe',
    email: 'casey.doe@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704c',
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ isOpen, onClose, onLogout }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-white dark:bg-gray-900 z-[70] flex flex-col transition-transform duration-300 ease-in-out"
            style={{ transform: isOpen ? 'translateX(0%)' : 'translateX(100%)' }}
        >
            <header className="flex-shrink-0 flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-2">
                <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Profile</h2>
            </header>

            <main className="flex-grow overflow-y-auto bg-gray-50 dark:bg-black">
                {/* Profile Header */}
                <div className="p-6 flex flex-col items-center text-center bg-white dark:bg-gray-900">
                    <img src={mockUser.avatarUrl} alt="User avatar" className="w-24 h-24 rounded-full mb-4 border-4 border-gray-200 dark:border-gray-700 shadow-lg"/>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{mockUser.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{mockUser.email}</p>
                    <button className="mt-4 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/50 rounded-full hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors">
                        Edit Profile
                    </button>
                </div>

                {/* Settings List */}
                <div className="mt-6 mx-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
                         <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <BellIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-4"/>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Notifications</span>
                            </div>
                            <label htmlFor="notifications-toggle" className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    id="notifications-toggle" 
                                    className="sr-only peer" 
                                    checked={notificationsEnabled} 
                                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                                />
                                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                            </label>
                        </div>
                         <button className="w-full text-left p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                 <span className="font-semibold text-gray-800 dark:text-gray-200">Account Settings</span>
                            </div>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="mt-6 mx-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
                         <button className="w-full text-left p-4 flex items-center justify-between">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">Privacy Policy</span>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </button>
                         <button className="w-full text-left p-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">Help & Support</span>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>


                {/* Logout Button */}
                <div className="p-4 mt-8">
                     <button 
                        onClick={onLogout}
                        className="w-full flex items-center justify-center p-3 font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                        <LogoutIcon className="w-6 h-6 mr-2"/>
                        Log Out
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProfileScreen;
