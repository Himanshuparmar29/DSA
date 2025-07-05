import React from 'react';
import { 
  Sun, 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer, 
  Calendar, 
  TrendingUp, 
  Leaf, 
  Star,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

const ResponseFormatter = ({ data, language }) => {
  // Add null/undefined checks for data
  if (!data || typeof data !== 'object') {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {data || "No data available"}
        </p>
      </div>
    );
  }

  const { type, sections } = data;

  const getIcon = (type) => {
    switch (type) {
      case 'weather': return <Sun className="h-5 w-5" />;
      case 'crops': return <Calendar className="h-5 w-5" />;
      case 'market': return <TrendingUp className="h-5 w-5" />;
      case 'pest': return <AlertTriangle className="h-5 w-5" />;
      case 'schemes': return <Star className="h-5 w-5" />;
      case 'fertilizer': return <Droplets className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'weather': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'crops': return 'bg-green-50 border-green-200 text-green-800';
      case 'market': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'pest': return 'bg-red-50 border-red-200 text-red-800';
      case 'schemes': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'fertilizer': return 'bg-cyan-50 border-cyan-200 text-cyan-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getTypeTitle = (type, language) => {
    const titles = {
      weather: language === 'gujarati' ? 'હવામાન સલાહ' : 'Weather Advice',
      crops: language === 'gujarati' ? 'પાક માર્ગદર્શન' : 'Crop Guidance',
      market: language === 'gujarati' ? 'બજાર માહિતી' : 'Market Information',
      pest: language === 'gujarati' ? 'જીવાત નિયંત્રણ' : 'Pest Control',
      schemes: language === 'gujarati' ? 'સરકારી યોજનાઓ' : 'Government Schemes',
      fertilizer: language === 'gujarati' ? 'ખાતર અને પાણી' : 'Fertilizer & Water',
      general: language === 'gujarati' ? 'સામાન્ય માહિતી' : 'General Information'
    };
    return titles[type] || titles.general;
  };

  const parseWeatherInfo = (weatherText) => {
    if (!weatherText) return {};
    
    const tempMatch = weatherText.match(/(\d+\.?\d*)°C/g);
    const humidityMatch = weatherText.match(/(\d+)%/);
    const windMatch = weatherText.match(/(\d+\.?\d*)\s*m\/s/);
    const cityMatch = weatherText.match(/([\u0A80-\u0AFF\w\s]+)\s*માં|in\s+([\w\s]+)\s*is/);
    
    return {
      temperature: tempMatch ? tempMatch[0] : null,
      humidity: humidityMatch ? humidityMatch[0] : null,
      windSpeed: windMatch ? windMatch[0] : null,
      city: cityMatch ? (cityMatch[1] || cityMatch[2]) : null
    };
  };

  const formatAdviceList = (advice) => {
    if (!advice || !Array.isArray(advice)) return [];
    return advice.filter(item => item && item.trim().length > 0);
  };

  const renderWeatherCard = () => {
    if (!sections || !sections.weather) return null;
    
    const weatherInfo = parseWeatherInfo(sections.weather);
    
    return (
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Sun className="h-5 w-5 text-orange-600" />
          <h4 className="font-semibold text-orange-800">
            {language === 'gujarati' ? 'હવામાન માહિતી' : 'Weather Information'}
          </h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {weatherInfo.temperature && (
            <div className="bg-white rounded-lg p-2 text-center">
              <Thermometer className="h-4 w-4 text-red-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">
                {language === 'gujarati' ? 'તાપમાન' : 'Temperature'}
              </div>
              <div className="font-semibold text-red-600">{weatherInfo.temperature}</div>
            </div>
          )}
          
          {weatherInfo.humidity && (
            <div className="bg-white rounded-lg p-2 text-center">
              <Droplets className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">
                {language === 'gujarati' ? 'નમી' : 'Humidity'}
              </div>
              <div className="font-semibold text-blue-600">{weatherInfo.humidity}</div>
            </div>
          )}
          
          {weatherInfo.windSpeed && (
            <div className="bg-white rounded-lg p-2 text-center">
              <Wind className="h-4 w-4 text-gray-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">
                {language === 'gujarati' ? 'પવન' : 'Wind'}
              </div>
              <div className="font-semibold text-gray-600">{weatherInfo.windSpeed}</div>
            </div>
          )}
          
          {weatherInfo.city && (
            <div className="bg-white rounded-lg p-2 text-center">
              <MapPin className="h-4 w-4 text-green-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">
                {language === 'gujarati' ? 'સ્થાન' : 'Location'}
              </div>
              <div className="font-semibold text-green-600">{weatherInfo.city}</div>
            </div>
          )}
        </div>
        
        {/* Display weather text content */}
        <div className="bg-white rounded-lg p-3 mt-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {sections.weather}
          </p>
        </div>
      </div>
    );
  };

  const renderAdviceSection = () => {
    if (!sections || !sections.advice) return null;
    
    const advice = formatAdviceList(sections.advice);
    if (!advice.length) return null;

    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h4 className="font-semibold text-green-800">
            {language === 'gujarati' ? 'ખેતી સલાહ' : 'Agricultural Advice'}
          </h4>
        </div>
        
        <div className="space-y-2">
          {advice.map((item, index) => (
            <div key={index} className="flex items-start space-x-2 bg-white rounded-lg p-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCropSection = () => {
    if (!sections || !sections.crops) return null;

    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="h-5 w-5 text-green-600" />
          <h4 className="font-semibold text-green-800">
            {language === 'gujarati' ? 'પાક માર્ગદર્શન' : 'Crop Guidance'}
          </h4>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {sections.crops}
          </p>
        </div>
      </div>
    );
  };

  const renderMarketSection = () => {
    if (!sections || !sections.prices) return null;

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h4 className="font-semibold text-blue-800">
            {language === 'gujarati' ? 'બજાર ભાવ' : 'Market Prices'}
          </h4>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {sections.prices}
          </p>
        </div>
      </div>
    );
  };

  const renderPestSection = () => {
    if (!sections || !sections.pests) return null;

    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h4 className="font-semibold text-red-800">
            {language === 'gujarati' ? 'જીવાત નિયંત્રણ' : 'Pest Control'}
          </h4>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {sections.pests}
          </p>
        </div>
      </div>
    );
  };

  const renderSchemeSection = () => {
    if (!sections || !sections.schemes) return null;

    return (
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Star className="h-5 w-5 text-purple-600" />
          <h4 className="font-semibold text-purple-800">
            {language === 'gujarati' ? 'સરકારી યોજનાઓ' : 'Government Schemes'}
          </h4>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {sections.schemes}
          </p>
        </div>
      </div>
    );
  };

  const renderFertilizerSection = () => {
    if (!sections || !sections.fertilizer) return null;

    return (
      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Droplets className="h-5 w-5 text-cyan-600" />
          <h4 className="font-semibold text-cyan-800">
            {language === 'gujarati' ? 'ખાતર અને પાણી' : 'Fertilizer & Water'}
          </h4>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {sections.fertilizer}
          </p>
        </div>
      </div>
    );
  };

  const hasStructuredContent = sections && (
    sections.weather || sections.advice || sections.crops || 
    sections.prices || sections.pests || sections.schemes || sections.fertilizer
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className={`flex items-center space-x-2 mb-4 p-2 rounded-lg border ${getTypeColor(type)}`}>
        {getIcon(type)}
        <span className="font-semibold text-sm">{getTypeTitle(type, language)}</span>
      </div>

      {/* Content Sections */}
      {renderWeatherCard()}
      {renderAdviceSection()}
      {renderCropSection()}
      {renderMarketSection()}
      {renderPestSection()}
      {renderSchemeSection()}
      {renderFertilizerSection()}

      {/* Fallback for unstructured content */}
      {!hasStructuredContent && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {data.rawText || "No content available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResponseFormatter;