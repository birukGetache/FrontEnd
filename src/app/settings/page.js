"use client";
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import BottomNavBar from '../components/BottomNavBar';
import {
  FaMobileAlt,
  FaGlobe,
  FaQuestionCircle,
  FaInfoCircle,
  FaUserPlus,
} from 'react-icons/fa';

const settingsList = [
  { id: 6, title: 'Devices', icon: <FaMobileAlt className="text-indigo-600" size={24} /> },
  { id: 7, title: 'Language', icon: <FaGlobe className="text-indigo-600" size={24} /> },
  { id: 8, title: 'AskQuestion', icon: <FaQuestionCircle className="text-indigo-600" size={24} /> },
  { id: 9, title: 'TankwaFAQ', icon: <FaInfoCircle className="text-indigo-600" size={24} /> },
  { id: 10, title: 'InviteFriends', icon: <FaUserPlus className="text-indigo-600" size={24} /> },
];

export default function Settings() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNavigation = (id) => {
    router.push(`/settings/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-indigo-600 text-center">
            {t('Settings')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <ul className="grid gap-6">
            {settingsList.map((setting) => (
              <li
                key={setting.id}
                onClick={() => handleNavigation(setting.id)}
                className="group relative bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition">
                    {setting.icon}
                  </div>
                  <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {t(setting.title)}
                  </span>
                </div>
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-200 rounded-xl transition" />
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}