import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function XFollowersTracker() {
  const username = useSignal("");
  const trackedUsername = useSignal("");
  const isLoading = useSignal(false);
  const message = useSignal("");
  const isEditing = useSignal(false);

  // Load tracked username from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("trackedUsername");
    if (stored) {
      trackedUsername.value = stored;
    }
  }, []);

  const handleSubmit = async () => {
    const trimmedUsername = username.value.trim();
    
    if (!trimmedUsername) {
      message.value = "Please enter a valid X username";
      return;
    }

    // Basic username validation (alphanumeric, underscore, 1-15 chars)
    if (!/^[a-zA-Z0-9_]{1,15}$/.test(trimmedUsername)) {
      message.value = "Invalid username format. Use only letters, numbers, and underscores (1-15 characters)";
      return;
    }

    isLoading.value = true;
    message.value = "";

    try {
      // TODO: Replace with actual API call
      console.log("Tracking username:", trimmedUsername);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage and update state
      localStorage.setItem("trackedUsername", trimmedUsername);
      trackedUsername.value = trimmedUsername;
      username.value = "";
      isEditing.value = false;
      message.value = "";
      
    } catch (error) {
      message.value = "❌ Something went wrong. Please try again.";
      console.error("Error tracking username:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleEdit = () => {
    username.value = trackedUsername.value;
    isEditing.value = true;
    message.value = "";
  };

  const handleRemove = () => {
    localStorage.removeItem("trackedUsername");
    trackedUsername.value = "";
    username.value = "";
    isEditing.value = false;
    message.value = "";
  };

  const handleCancelEdit = () => {
    username.value = "";
    isEditing.value = false;
    message.value = "";
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Show input form if no tracked user or if editing
  if (!trackedUsername.value || isEditing.value) {
    return (
      <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-12">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
          {isEditing.value ? "Edit Tracked Username" : "Start Tracking"}
        </h3>
        
        <div class="flex gap-3">
          <div class="flex-1">
            <input
              type="text"
              value={username.value}
              onInput={(e) => username.value = (e.target as HTMLInputElement).value}
              onKeyPress={handleKeyPress}
              placeholder="Enter X username (without @)"
              disabled={isLoading.value}
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading.value || !username.value.trim()}
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg whitespace-nowrap"
          >
            {isLoading.value ? "..." : (isEditing.value ? "Update" : "Track User")}
          </button>
          {isEditing.value && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isLoading.value}
              class="px-4 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
        
        {message.value && (
          <p class={`text-sm mt-3 ${message.value.startsWith("✅") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {message.value}
          </p>
        )}
      </div>
    );
  }

  // Show tracked user info
  return (
    <div class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-12">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Currently Tracking</h3>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 font-semibold">𝕏</span>
          </div>
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">@{trackedUsername.value}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Monitoring followers and unfollowers
            </p>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button
            type="button"
            onClick={handleEdit}
            class="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleRemove}
            class="px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 font-medium rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
} 