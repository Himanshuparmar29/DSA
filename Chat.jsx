import React, { useState, useRef, useEffect } from 'react';
import { Send, Leaf, User, Bot, Loader2, Sun, Cloud, Droplets, MapPin, TrendingUp, Calendar, Phone, Star } from 'lucide-react';
import axios from 'axios';
import ResponseFormatter from './ResponseFormatter';

const KrishiMitr = () => {
  const [language, setLanguage] = useState('english');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your farming assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
      isStructured: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_BASE_URL = 'https://b93c-49-34-160-92.ngrok-free.app';

  // Language content
  const content = {
    gujarati: {
      title: "કૃષિમિત્ર",
      subtitle: "ગુજરાતના ખેડૂતો માટે AI સહાયક",
      quickActions: "ઝડપી સેવાઓ",
      quickHelp: "તુરંત સહાય",
      chatTitle: "KrishiMitr સહાયક",
      chatStatus: "ઓનલાઇન અને મદદ માટે તૈયાર",
      active: "સક્રિય",
      thinking: "વિચાર કરી રહ્યો છે...",
      placeholder: "તમારો પ્રશ્ન અહીં લખો...",
      send: "મોકલો",
      footerText: "ગુજરાતના ખેડૂતોના ઉત્થાન માટે AI તકનીકનો ઉપયોગ કરીને બનાવેલ",
      available: "૨૪/૭ ઉપલબ્ધ",
      gujaratFocused: "ગુજરાત કેન્દ્રિત",
      farmerFriendly: "ખેડૂત મિત્ર",
      initialMessage: "નમસ્કાર! હું તમારો કૃષિ સહાયક છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
      errorMessage: "માફ કરશો, હાલમાં કનેક્શનમાં સમસ્યા છે. કૃપા કરીને પછીથી પ્રયાસ કરો.",
      actions: [
        { 
          text: "આજની મૌસમી સલાહ", 
          icon: <Sun className="h-5 w-5" />,
          triggerText: "આજની મૌસમી સલાહ"
        },
        { 
          text: "પાક માટે શ્રેષ્ઠ સમય", 
          icon: <Calendar className="h-5 w-5" />,
          triggerText: "પાકનો સમય"
        },
        { 
          text: "કીડા-મકોડાની સમસ્યા", 
          icon: <Leaf className="h-5 w-5" />,
          triggerText: "જીવાતની સમસ્યા"
        },
        { 
          text: "ખાતર અને પાણીની સલાહ", 
          icon: <Droplets className="h-5 w-5" />,
          triggerText: "ખાતર અને પાણીની સલાહ"
        },
        { 
          text: "બજારની કિંમત", 
          icon: <TrendingUp className="h-5 w-5" />,
          triggerText: "બજાર ભાવ"
        },
        { 
          text: "ખેતી કલ્યાણ યોજનાઓ", 
          icon: <Star className="h-5 w-5" />,
          triggerText: "કૃષિ યોજના"
        }
      ]
    },
    english: {
      title: "KrishiMitr",
      subtitle: "AI Assistant for Gujarat's Farmers",
      quickActions: "Quick Actions",
      quickHelp: "Instant Help",
      chatTitle: "KrishiMitr Assistant",
      chatStatus: "Online & Ready to Help",
      active: "Active",
      thinking: "Thinking...",
      placeholder: "Type your question here...",
      send: "Send",
      footerText: "Built with AI technology for the prosperity of Gujarat's farmers",
      available: "24/7 Available",
      gujaratFocused: "Gujarat Focused",
      farmerFriendly: "Farmer Friendly",
      initialMessage: "Hello! I'm your farming assistant. How can I help you today?",
      errorMessage: "Sorry, I'm having trouble connecting right now. Please try again later.",
      actions: [
        { 
          text: "Today's Weather Advice", 
          icon: <Sun className="h-5 w-5" />,
          triggerText: "Today's weather advice"
        },
        { 
          text: "Best Time for Crops", 
          icon: <Calendar className="h-5 w-5" />,
          triggerText: "Best time for crops"
        },
        { 
          text: "Pest Problems", 
          icon: <Leaf className="h-5 w-5" />,
          triggerText: "Pest problems"
        },
        { 
          text: "Fertilizer & Water Advice", 
          icon: <Droplets className="h-5 w-5" />,
          triggerText: "Fertilizer and water advice"
        },
        { 
          text: "Market Prices", 
          icon: <TrendingUp className="h-5 w-5" />,
          triggerText: "Market prices"
        },
        { 
          text: "Agricultural Schemes", 
          icon: <Star className="h-5 w-5" />,
          triggerText: "Agricultural schemes"
        }
      ]
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'gujarati' ? 'english' : 'gujarati';
    setLanguage(newLanguage);
    
    setMessages(prev => prev.map(msg => 
      msg.id === 1 ? { ...msg, text: content[newLanguage].initialMessage } : msg
    ));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced function to parse and structure the response
  const parseResponse = (responseText) => {
    try {
      // More flexible detection for structured agricultural responses
      const hasAgriculturalContent = (
        responseText.includes('weather') || responseText.includes('હવામાન') ||
        responseText.includes('crop') || responseText.includes('પાક') ||
        responseText.includes('market') || responseText.includes('બજાર') ||
        responseText.includes('pest') || responseText.includes('જીવાત') ||
        responseText.includes('fertilizer') || responseText.includes('ખાતર') ||
        responseText.includes('scheme') || responseText.includes('યોજના') ||
        responseText.includes('temperature') || responseText.includes('તાપમાન') ||
        responseText.includes('advice') || responseText.includes('સલાહ') ||
        responseText.includes('price') || responseText.includes('ભાવ') ||
        responseText.includes('°C') || responseText.includes('humidity') ||
        responseText.includes('wind') || responseText.includes('rain') ||
        responseText.includes('irrigation') || responseText.includes('સિંચાઈ') ||
        responseText.includes('sowing') || responseText.includes('harvest') ||
        responseText.includes('disease') || responseText.includes('રોગ') ||
        responseText.includes('subsidy') || responseText.includes('સબસિડી') ||
        responseText.length > 100 // Longer responses are likely to be structured
      );

      if (hasAgriculturalContent) {
        return {
          isStructured: true,
          data: parseAgriculturalResponse(responseText)
        };
      }
      return {
        isStructured: false,
        data: responseText
      };
    } catch (error) {
      console.error('Error parsing response:', error);
      return {
        isStructured: false,
        data: responseText
      };
    }
  };

  const parseAgriculturalResponse = (text) => {
    const sections = {};
    const lowerText = text.toLowerCase();
    
    // Enhanced weather parsing
    if (lowerText.includes('weather') || lowerText.includes('હવામાન') || 
        lowerText.includes('temperature') || lowerText.includes('તાપમાન') ||
        lowerText.includes('°c') || lowerText.includes('humidity') ||
        lowerText.includes('wind') || lowerText.includes('rain') ||
        lowerText.includes('climate') || lowerText.includes('forecast')) {
      sections.weather = text;
    }

    // Enhanced advice parsing - look for bullet points, numbered lists, or advice keywords
    const adviceKeywords = ['advice', 'સલાહ', 'recommend', 'suggest', 'should', 'કરવું', 'tips', 'guidance'];
    const hasAdviceKeywords = adviceKeywords.some(keyword => lowerText.includes(keyword));
    
    if (hasAdviceKeywords) {
      // Extract bullet points or numbered advice
      const bulletPoints = text.match(/[•\-\*]\s*(.+)/g) || [];
      const numberedPoints = text.match(/\d+\.\s*(.+)/g) || [];
      
      if (bulletPoints.length > 0) {
        sections.advice = bulletPoints.map(point => point.replace(/[•\-\*]\s*/, '').trim());
      } else if (numberedPoints.length > 0) {
        sections.advice = numberedPoints.map(point => point.replace(/\d+\.\s*/, '').trim());
      } else {
        // If no clear bullet points, split by sentences and filter advice-like sentences
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
        const adviceSentences = sentences.filter(sentence => 
          adviceKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
        );
        if (adviceSentences.length > 0) {
          sections.advice = adviceSentences.map(s => s.trim());
        }
      }
    }

    // Enhanced crop information parsing
    if (lowerText.includes('crop') || lowerText.includes('પાક') || 
        lowerText.includes('sowing') || lowerText.includes('harvest') ||
        lowerText.includes('planting') || lowerText.includes('બીજ') ||
        lowerText.includes('cultivation') || lowerText.includes('farming') ||
        lowerText.includes('season') || lowerText.includes('time')) {
      sections.crops = text;
    }

    // Enhanced market price parsing
    if (lowerText.includes('price') || lowerText.includes('ભાવ') || 
        lowerText.includes('market') || lowerText.includes('બજાર') ||
        lowerText.includes('₹') || lowerText.includes('rupee') ||
        lowerText.includes('cost') || lowerText.includes('rate') ||
        lowerText.includes('selling') || lowerText.includes('buying')) {
      sections.prices = text;
    }

    // Enhanced pest control parsing
    if (lowerText.includes('pest') || lowerText.includes('જીવાત') || 
        lowerText.includes('disease') || lowerText.includes('રોગ') ||
        lowerText.includes('insect') || lowerText.includes('કીડો') ||
        lowerText.includes('control') || lowerText.includes('નિયંત્રણ') ||
        lowerText.includes('fungus') || lowerText.includes('bacteria') ||
        lowerText.includes('virus') || lowerText.includes('infection')) {
      sections.pests = text;
    }

    // Enhanced schemes parsing
    if (lowerText.includes('scheme') || lowerText.includes('યોજના') || 
        lowerText.includes('subsidy') || lowerText.includes('સબસિડી') ||
        lowerText.includes('government') || lowerText.includes('સરકાર') ||
        lowerText.includes('benefit') || lowerText.includes('લાભ') ||
        lowerText.includes('policy') || lowerText.includes('program') ||
        lowerText.includes('loan') || lowerText.includes('credit')) {
      sections.schemes = text;
    }

    // Enhanced fertilizer parsing
    if (lowerText.includes('fertilizer') || lowerText.includes('ખાતર') || 
        lowerText.includes('water') || lowerText.includes('પાણી') ||
        lowerText.includes('irrigation') || lowerText.includes('સિંચાઈ') ||
        lowerText.includes('nutrient') || lowerText.includes('પોષક') ||
        lowerText.includes('manure') || lowerText.includes('compost') ||
        lowerText.includes('nitrogen') || lowerText.includes('phosphorus') ||
        lowerText.includes('potassium')) {
      sections.fertilizer = text;
    }

    return {
      type: getResponseType(text),
      sections: sections,
      rawText: text
    };
  };

  const getResponseType = (text) => {
    const lowerText = text.toLowerCase();
    
    // Priority-based type detection with more comprehensive matching
    if (lowerText.includes('weather') || lowerText.includes('હવામાન') || 
        lowerText.includes('temperature') || lowerText.includes('°c') ||
        lowerText.includes('climate') || lowerText.includes('forecast')) return 'weather';
    
    if (lowerText.includes('crop') || lowerText.includes('પાક') || 
        lowerText.includes('sowing') || lowerText.includes('harvest') ||
        lowerText.includes('planting') || lowerText.includes('season')) return 'crops';
    
    if (lowerText.includes('price') || lowerText.includes('ભાવ') || 
        lowerText.includes('market') || lowerText.includes('બજાર') ||
        lowerText.includes('₹') || lowerText.includes('cost')) return 'market';
    
    if (lowerText.includes('pest') || lowerText.includes('જીવાત') || 
        lowerText.includes('disease') || lowerText.includes('કીડો') ||
        lowerText.includes('infection') || lowerText.includes('control')) return 'pest';
    
    if (lowerText.includes('scheme') || lowerText.includes('યોજના') || 
        lowerText.includes('government') || lowerText.includes('સરકાર') ||
        lowerText.includes('subsidy') || lowerText.includes('policy')) return 'schemes';
    
    if (lowerText.includes('fertilizer') || lowerText.includes('ખાતર') || 
        lowerText.includes('water') || lowerText.includes('પાણી') ||
        lowerText.includes('irrigation') || lowerText.includes('nutrient')) return 'fertilizer';
    
    return 'general';
  };

  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      isStructured: false
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Sending message:', userMessage.text);
      const encodedMessage = textToSend.replace(/ /g, '+');
      const url = `${API_BASE_URL}/query/${encodedMessage}`;

      const response = await axios.post(url, userMessage, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      const responseText = response.data.top?.response || response.data.response || "Sorry, I couldn't process your request. Please try again.";
      const parsedResponse = parseResponse(responseText);

      const botMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isStructured: parsedResponse.isStructured,
        structuredData: parsedResponse.isStructured ? parsedResponse.data : null
      };

      console.log('Bot response:', botMessage); // Debug log
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: content[language].errorMessage,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isStructured: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = content[language].actions.map((action, index) => ({
    ...action,
    color: [
      "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
      "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
      "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
    ][index]
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50">
      {/* Professional Header */}
      <div className="bg-white shadow-lg border-b-4 border-green-600">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-2xl shadow-lg">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {content[language].title}
                </h1>
                <p className="text-gray-600 text-lg">{content[language].subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">
                    {language === 'gujarati' ? 'A' : 'અ'}
                  </span>
                  <div className="w-px h-4 bg-white bg-opacity-50"></div>
                  <span className="text-sm">
                    {language === 'gujarati' ? 'English' : 'ગુજરાતી'}
                  </span>
                </div>
              </button>
              
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Gujarat, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
                <h3 className="text-white font-semibold text-lg">{content[language].quickActions}</h3>
                <p className="text-green-100 text-sm">{content[language].quickHelp}</p>
              </div>
              <div className="p-4 space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action.triggerText)}
                    disabled={isLoading}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-md hover:scale-105 ${action.color} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} flex items-center space-x-3 text-left`}
                  >
                    {action.icon}
                    <span className="text-sm font-medium">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{content[language].chatTitle}</h3>
                    <p className="text-green-100 text-sm">{content[language].chatStatus}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-100 text-sm">{content[language].active}</span>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-green-25 to-white">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-full ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-r from-green-500 to-green-600'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white max-w-xs lg:max-w-md'
                          : 'bg-white text-gray-800 border border-green-100 max-w-full'
                      }`}>
                        {message.isStructured && message.structuredData ? (
                          <ResponseFormatter 
                            data={message.structuredData} 
                            language={language}
                          />
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        )}
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-md">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 border border-green-100 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                          <span className="text-gray-600 text-sm">{content[language].thinking}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="border-t border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={content[language].placeholder}
                      className="w-full border-2 border-green-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 text-gray-700 bg-white shadow-sm"
                      disabled={isLoading}
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                      <Leaf className="h-5 w-5" />
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Send className="h-5 w-5" />
                    <span className="font-medium">{content[language].send}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-3">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">KrishiMitr</h3>
            </div>
            <p className="text-gray-600 mb-4">
              {content[language].footerText}
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{content[language].available}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>{content[language].gujaratFocused}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="h-4 w-4 text-green-500" />
                <span>{content[language].farmerFriendly}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrishiMitr;