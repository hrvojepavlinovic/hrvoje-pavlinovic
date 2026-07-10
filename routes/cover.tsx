export default function CoverPage() {
  return (
    <div class="min-h-screen dark:bg-black bg-white dark:text-white/80 text-black/80">
      <div class="container mx-auto px-4 pt-32 pb-8">
        <div class="max-w-md mx-auto">
          <h1 class="text-3xl font-bold text-center dark:text-white text-black">
            Application Kit
          </h1>
          <p class="mt-3 mb-8 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Private working page for generating a role-specific cover letter and
            choosing the right CV format.
          </p>

          <div class="mb-8 grid grid-cols-2 gap-3">
            <a
              href="/cv/pdf"
              class="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-100"
            >
              Human-readable CV
            </a>
            <a
              href="/cv/ats"
              class="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-100"
            >
              ATS-friendly CV
            </a>
          </div>

          <form
            method="POST"
            action="/cover/generate"
            class="space-y-6"
          >
            <div>
              <label
                for="template"
                class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80"
              >
                Template
              </label>
              <select
                id="template"
                name="template"
                required
                class="w-full px-3 py-2 dark:bg-black bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black"
              >
                <option value="">Select a template</option>
                <option value="web3">Web3</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ai">AI</option>
                <option value="backend">Backend</option>
                <option value="product">Backend + Product</option>
                <option value="fullstack">Fullstack</option>
                <option value="lead">Lead</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <div>
              <label
                for="recipient"
                class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80"
              >
                Recipient (optional)
              </label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                placeholder="e.g. Tuomas or Hiring Team"
                maxlength={120}
                class="w-full px-3 py-2 dark:bg-black bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black dark:placeholder-gray-400 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                for="motivation"
                class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80"
              >
                Why this company (optional)
              </label>
              <textarea
                id="motivation"
                name="motivation"
                rows={4}
                maxlength={900}
                placeholder="One specific, honest paragraph. Avoid repeating the job description."
                class="w-full resize-y px-3 py-2 dark:bg-black bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black dark:placeholder-gray-400 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                for="evidence"
                class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80"
              >
                Most relevant evidence (optional)
              </label>
              <textarea
                id="evidence"
                name="evidence"
                rows={4}
                maxlength={900}
                placeholder="A concrete project, system, result, or domain connection worth emphasizing."
                class="w-full resize-y px-3 py-2 dark:bg-black bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black dark:placeholder-gray-400 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                for="company"
                class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                placeholder="Enter company name"
                class="w-full px-3 py-2 dark:bg-black bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black dark:placeholder-gray-400 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                for="position"
                class="block text-sm font-medium mb-2 dark:text-white/80 text-black/80"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                required
                placeholder="Enter position title"
                class="w-full px-3 py-2 dark:bg-black bg-gray-100 dark:border-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white text-black dark:placeholder-gray-400 placeholder-gray-500"
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
