const LanguageSelector = ({ language, onChange }) => {
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'am', name: 'Amharic' },
      { code: 'sp', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'ar', name: 'Arabic' }
    ];
  
    return (
      <div className="space-y-2 mb-6 bg-white">
        <h2 className="text-lg font-semibold text-gray-700">Select Language</h2>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <label key={lang.code} className="inline-flex items-center">
              <input
                type="radio"
                name="language"
                value={lang.code}
                checked={language === lang.code}
                onChange={() => onChange(lang.code)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{lang.name}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  export default LanguageSelector;