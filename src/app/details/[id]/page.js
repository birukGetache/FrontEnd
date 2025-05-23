"use client";
import axios from "axios";
import { usePathname ,useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import BottomNavBar from '../../components/BottomNavBar';
import TanaFotter from "../../components/TanaFotter"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
// import { useNavigation } from "react-router-dom";
const DetailPage = () => {
  const [price , setPrice] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [truepromo , setTruePromo] = useState(null);
  const [waiting , setWaiting] = useState(false)
    const { t, i18n } = useTranslation(); // Get the current language from i18n
  const router = useRouter();
  const pathname = usePathname(); // Get the current path of the page
  const id = pathname.split("/").pop(); 
  console.log(id)
  const [destinations, setDestinations] = useState('');
  const [light , setLight] = useState(true)
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const isDark = saved === 'true';
  
    if (isDark) {
      setLight(false)
    } else {
     setLight(true)
    }
  }, []);
  useEffect(() => {
      const fetchDestinations = async () => {
        try {
          const response = await fetch(`http://localhost:5000/destinations/${id}`); // Replace with your API endpoint
          const data = await response.json();
          console.log(data)
          setDestinations(data.titles[i18n.language]);
          setPrice(data.price)
          console.log(data)
        } catch (error) {
          console.error("Error fetching destinations:", error);
        }
      };
  
      fetchDestinations();
    }, []);
 
  
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    promocode:'',
    middleName:'',
    preferredDate: '',
    destinationID :id,
    departureLocation: 'Bahir Dar',
    destinationLocation: '',
    numberOfPassengers: 1,
    paymentMethod: '',
    currency: 'USD',
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      destinationLocation: destinations, // Update the formData state
    }));
  }, [destinations]);
  const handleChange = async (e) => {
    const { name, value } = e.target;
  
    // Update form state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name=="promocode"&&(value.length > 0 && value.length < 8)) {
      setWaiting(true);
    } else if (value.length === 0) {
      setWaiting(false);
      setTruePromo(null); // Reset promo status when empty
    } else {
      setWaiting(false);
    }

   
  
    // Only check promo when 'promocode' is typed and is 8 characters
    if (name === "promocode" && value.length === 8) {
      try {
        const response = await fetch("http://localhost:5000/checkPromo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ promoCode: value }), // Send it as an object!
        });
  
        const data = await response.json();
        console.log("Promo response:", data);
        // Optional: Handle valid/invalid promo UI here
        if (data.valid) {
          // e.g., setDiscount(data.discount), show success
          console.log("✅ Valid Promo Code!");
          setTruePromo(true)
        } else {
          // e.g., show error message
          console.log("❌ Invalid Promo Code");
          setTruePromo(false)
        }
      } catch (error) {
        console.error("Error checking promo code:", error);
      }
    }
  };
  

  const rate = exchangeRates[formData.currency] ?? 1;
  const convertedPrice = (price * rate).toFixed(2);


  
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/ETB");
        const data = await response.json();
        console.log("Exchange Rates:", data); // ✅ DEBUG
        setExchangeRates(data.rates || {});
      } catch (err) {
        console.error("Error fetching exchange rates", err);
      }
    };

    fetchRates();
  }, []);


const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect all required fields except 'promocode', 'email', and 'phone'
    const requiredFields = Object.entries(formData).filter(([key]) => !["promocode", "email", "phone"].includes(key));

    // Find empty fields (excluding 'promocode', 'email', and 'phone')
    const emptyFields = requiredFields.filter(([key, value]) => !value).map(([key]) => key);

    // Check if either 'email' or 'phone' is filled
    const hasEmail = formData.email && formData.email.trim() !== "";
    const hasPhone = formData.phone && formData.phone.trim() !== "";

    if (!hasEmail && !hasPhone) {
        emptyFields.push("email or phone"); // Indicate missing contact info
    }

    if (emptyFields.length > 0) {
        // Display a toast with the list of missing fields
        toast.error(`Please fill in all the fields! Missing fields: ${emptyFields.join(", ")}`);
        return;
    }

    // If all required fields are filled, proceed with form submission
    try {
      console.log("we are here baby")
      console.log("we are here nati and baby")
        const response = await axios.post("http://localhost:5000/PostTransaction", formData);
        console.log("we are here nati")
        console.log(response.data);

        // Corrected payment method condition
        if ( formData.paymentMethod === "paypal") {
            console.log("Redirecting to payment URL...");
            window.location.href = response.data.url; // Redirect to payment URL
            console.log(response.data.paymentUrl)
        } else if(formData.paymentMethod === "Chapa"){
            console.log("Redirecting to checkout URL...");
            //window.location.href = response.data.checkoutUrl; // Redirect to checkout URL
            window.location.href = response.data.paymentUrl; // Redirect to checkout URL
            console.log( response.data.paymentUrl)
        }else if(formData.paymentMethod === "stripe"){
            console.log("Redirecting to checkout URL...");
            //window.location.href = response.data.checkoutUrl; // Redirect to checkout URL
            window.location.href = response.data.checkoutUrl; 
        }
        
    } catch (error) {
        console.error("Transaction failed:", error);
        toast.error("Transaction failed. Please try again.");
    }
};






  const validatePhone = (phone) => {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone);
  };



  

  if (!destinations) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 ">
 
    <div className="relative w-20 h-20 flex justify-center items-center">
      {/* Rotating Border */}
      <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
      {/* Inner Circle */}
      <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
    </div>
  </div>;; // Display loading while fetching data
  }

  return (
<div className={`space-y-8 pt-14 font-playfair text-[#85726a] min-h-screen ${light ? 'bg-white' : 'bg-black'} `}>
    {/* Header Image Section */}
    <BottomNavBar></BottomNavBar>
    {/* Form Container */}
    <div className="max-w-4xl mx-auto p-6 md:p-8 border border-blue-500/40 
    bg-gradient-to-br from-white/25 to-white/10 
    text-blue-600 font-semibold text-sm 
     shadow-black/10 rounded-xl shadow-xl">
      <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">{t('BookBoatTransport')}</h2>
      <ToastContainer />
  
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Information Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-slate-700">{t('PersonalInfo')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-600 mb-1">{t("FirstName")}</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t("EnterFirstName")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="middleName" className="block text-sm font-medium text-slate-600 mb-1">{t("MiddleName")}</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder={t("EnterMiddleName")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-600 mb-1">{t("LastName")}</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t("EnterLastName")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">{t('Email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("EnterEmail")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-600 mb-1">{t("Phone")}</label>
              <input
                type="text"
                id="phoneNumber"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("EnterPhone")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
  
        {/* Travel Information Section */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-medium text-slate-700">{t('TravelDetails')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="departureLocation" className="block text-sm font-medium text-slate-600 mb-1">{t('Departure')}</label>
              <input
                type="text"
                id="departureLocation"
                name="departureLocation"
                value="Bahir Dar"
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed"
                required
              />
            </div>
            <div>
              <label htmlFor="destinationLocation" className="block text-sm font-medium text-slate-600 mb-1">{t('DestinationLocation')}</label>
              <input
                type="text"
                id="destinationLocation"
                name="destinationLocation"
                value={destinations}
                onChange={handleChange}
                placeholder={t("EnterDestination")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-slate-600 mb-1">{t('Preferred')}</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="numberOfPassengers" className="block text-sm font-medium text-slate-600 mb-1">{t('Passengers')}</label>
              <input
                type="number"
                id="numberOfPassengers"
                name="numberOfPassengers"
                value={formData.numberOfPassengers}
                onChange={handleChange}
                min="1"
                placeholder="1"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="promo" className="block text-sm font-medium text-slate-600 mb-1">{t('Promocode')}</label>
              <input
                type="text"
                id="promocode"
                name="promocode"
                value={formData.promocode}
                onChange={handleChange}
                placeholder={t("EnterPromo")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="typeOfTransport" className="block text-sm font-medium text-slate-600 mb-1">{t('Transport')}</label>
            <select
              id="typeOfTransport"
              name="typeOfTransport"
              value={formData.typeOfTransport}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            >
              <option value="">{t('SelectType')}</option>
              <option value="ferry">{t('Ferry')}</option>
            </select>
          </div>
        </div>
  
        {/* Payment Information Section */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-medium text-slate-700">{t('PaymentInfo')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-slate-600 mb-1">{t('Currency')}</label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              >
                <option value="USD">{t('USD')}</option>
                <option value="Birr">{t('Birr')}</option>
                <option value="EUR">{t('EUR')}</option>
                <option value="GBP">{t('GBP')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-slate-600 mb-1">{t('PaymentMethod')}</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              >
               {formData.currency== "Birr" ?  
               <>
               <option value="">{t('SelectType')}</option>
               <option value="Chapa">{t('Chapa')}</option>
               </>
               : 
               <>
                <option value="stripe">{t('CreditCard')}</option>
                <option value="paypal">{t('PayPal')}</option>
              </>
              } 
              </select>
            </div>
          </div>
        </div>
       {waiting && <div class="flex items-center p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50" role="alert">
  <svg class="w-5 h-5 mr-2 text-yellow-700 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v4m0 8v4m8-8h-4m-8 0H4m15.36-5.36l-2.83 2.83M6.64 6.64l2.83 2.83m0 5.06l-2.83 2.83m11.31 0l-2.83-2.83" />
  </svg>
  <span class="text-sm font-medium">Waiting for promo code verification...</span>
</div>} 
{truepromo === false &&(
      <p className="text-sm text-red-500 mt-1">Invalid promo code. Price remains the same.</p>
)}

 <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-sm mx-auto my-4 flex justify-between items-center">
  <div>
    <h2 className="text-sm font-medium text-gray-600">Price Per Passenger</h2>
    <p className="text-blue-600 text-lg font-bold">{convertedPrice} &nbsp;&nbsp;&nbsp;{formData.currency} </p>
  </div>

{truepromo === true && (
  <div>
    <h2 className="text-sm font-medium text-gray-600">Total Price (with promo)</h2>
    <p className="text-green-600 text-lg font-bold">
      {convertedPrice * formData.numberOfPassengers - 10}&nbsp;&nbsp;&nbsp;&nbsp;{formData.currency}
    </p>
  </div>
)}

{(truepromo === false || truepromo === null) && (
  <div>
    <h2 className="text-sm font-medium text-gray-600">Total Price</h2>
    <p className="text-red-600 text-lg font-bold">
      {convertedPrice * formData.numberOfPassengers}&nbsp;&nbsp;&nbsp;&nbsp;{formData.currency}
    </p>

  </div>
)}

</div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-slate-800 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {t('BookNow')} <span className="text-lg">✨</span>
        </button>
      </form>
    </div>
    <TanaFotter></TanaFotter>
  </div>
  );
};

export default DetailPage;