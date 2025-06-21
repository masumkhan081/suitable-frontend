export default function AddPhotoPage() {
  return (
    <div className="min-h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-gray-100">
        {/* Add your image here */}
      </div>
      <div className="col-span-1 h-full flex flex-col gap-6 justify-center items-center p-4">
        <div className="w-full max-w-md p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold">Add Your Photo</h2>
            <p className="text-gray-600 text-center">Upload a clear photo of yourself. This will help others recognize you.</p>
            
            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
              <span className="text-gray-500">+ Add Photo</span>
            </div>
            
            <div className="w-full mt-6 flex flex-col gap-2">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Upload Photo
              </button>
              <button className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
                Skip for Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
