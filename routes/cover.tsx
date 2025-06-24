export default function CoverPage() {
  return (
    <div class="min-h-screen dark:bg-black bg-white dark:text-white/80 text-black/80">
      <div class="container mx-auto px-4 pt-32 pb-8">
        <div class="max-w-md mx-auto">
          <h1 class="text-3xl font-bold mb-8 text-center dark:text-white text-black">Cover Letter Generator</h1>
          
          <form 
            method="POST" 
            action="/cover/generate" 
            class="space-y-6"
          >
            <div>
              <label for="template" class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80">
                Template
              </label>
              <select 
                id="template" 
                name="template" 
                required
                class="w-full px-3 py-2 dark:bg-gray-900 bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black"
              >
                <option value="">Select a template</option>
                <option value="web3">Web3</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ai">AI</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
                <option value="lead">Lead</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <div>
              <label for="company" class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80">
                Company Name
              </label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                required
                placeholder="Enter company name"
                class="w-full px-3 py-2 dark:bg-gray-900 bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black dark:placeholder-gray-400 placeholder-gray-500"
              />
            </div>

            <div>
              <label for="position" class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80">
                Position
              </label>
              <input 
                type="text" 
                id="position" 
                name="position" 
                required
                placeholder="Enter position title"
                class="w-full px-3 py-2 dark:bg-gray-900 bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black dark:placeholder-gray-400 placeholder-gray-500"
              />
            </div>

            <button 
              type="submit"
              class="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-black focus:ring-offset-white"
            >
              Generate Cover Letter PDF
            </button>
          </form>

          <div class="mt-8 text-center">
            <a 
              href="/" 
              class="dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black transition-colors duration-200"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 