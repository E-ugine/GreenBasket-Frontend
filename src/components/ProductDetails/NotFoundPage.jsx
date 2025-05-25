export default function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = 'https://cybasoft.com';
  };

  const handleContact = () => {
    window.location.href = 'https://cybasoft.com';
  };

  return (
    <div className="md:flex min-h-screen font-sans antialiased">
      {/* Left side - Content */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-sm m-8">
          {/* 404 Text */}
          <div className="text-pink-600 text-5xl md:text-9xl font-black">
            404
          </div>

          {/* Purple divider line */}
          <div className="w-16 h-1 bg-purple-400 my-3 md:my-6"></div>

          {/* Error message */}
          <p className="text-gray-600 text-2xl md:text-3xl font-light mb-8 leading-normal">
            Oh no! Either we missed something or you can't type!
          </p>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleGoHome}
              className="bg-indigo-400 text-white font-bold uppercase tracking-wide py-3 px-6 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200 block w-full md:w-auto"
            >
              Go Home
            </button>
            
            <button
              onClick={handleContact}
              className="bg-transparent text-gray-700 font-bold uppercase tracking-wide py-3 px-6 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200 block w-full md:w-auto ml-0 md:ml-2"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="relative pb-full md:flex md:pb-0 md:min-h-screen w-full md:w-1/2">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat md:bg-left lg:bg-center"
          style={{
            backgroundImage: 'url(https://snag.gy/fkJWca.jpg)'
          }}
        >
        </div>
      </div>
    </div>
  );
}