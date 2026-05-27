// Typography configuration rules
const fonts = ["Qwitcher Grypen", "Tulpen One", "Shadows Into Light"];
var rotating = 0; // Tracks which font index to apply next
/**
 * Full-Stack Fetch Sandbox Core Script
 */

// --- GLOBAL DEVELOPMENT SETTINGS ---
// Modes available: "console" (quiet logging) or "screen" (renders error box in UI)
const ERROR_MODE = "screen"; 
document.getElementById("fetchData").addEventListener("click", getRandomQuote);

function getRandomQuote() {
  clearDisplayErrors();

  fetch("https://newmanix.com/classes/it102/random_quotes.php")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status}`);
      }
      return res.text();
    })
    .then((data) => {
      
      // Dump raw unstyled text straight into the container
      //document.getElementById("result").innerHTML = data;
      const quoteContainer = document.getElementById("result");
      quoteContainer.innerHTML = data;
      // --- TYPOGRAPHY LOOP ROTATION ---
      // 1. Set the element's inline font-family to the current font index matching our counter
      quoteContainer.style.fontFamily = fonts[rotating];
      // 2. Add 1 to counter. The % remainder operator forces it to cycle back to 0 when it hits the limit!
      rotating = (rotating + 1) % fonts.length;


      // --- TRANSITION CONTROLLER ---
      // Remove the class, force a browser reflow trick, then re-add the class
      quoteContainer.classList.remove("fade-in");
      void quoteContainer.offsetWidth; 
      quoteContainer.classList.add("fade-in"); 
      })
      

    .catch((err) => {
      handleRoutingError(err);
    });
}


// --- AUTOMATION ENGINE ---
// 1. Run the function immediately when the DOM layout is loaded stable
document.addEventListener("DOMContentLoaded", () => {
    getRandomQuote(); 
    
    // 2. Set an infinite recurring timer loop (5000ms = 5 seconds)
    setInterval(getRandomQuote, 5000);
});

/*
document.getElementById("fetchData").addEventListener("click", () => {
  
  // Clear out any stale errors from a previous click attempt
  clearDisplayErrors();

  fetch("server.php")
    .then((res) => {
      // CRITICAL: Fetch promises do NOT reject on HTTP errors (like 404 or 500).
      // We must explicitly evaluate the response status flag.
      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status} (${res.statusText || 'Unknown State'})`);
      }
      return res.text();
    })
    .then((data) => {
      // Route the raw payload safely into our UI container
      document.getElementById("result").innerHTML = data;
    })
    .catch((err) => {
      // Handle missing files, network dropout, or Backend failures
      handleRoutingError(err);
    });
});
*/
/**
 * Dispatches errors to the chosen target based on configuration
 */
function handleRoutingError(error) {
  const errorMessage = `⚠️ FETCH FAILURE DETAILS:\n-------------------------\nMessage: ${error.message}\nType: ${error.name}`;
  
  if (ERROR_MODE === "screen") {
    const errorBox = document.getElementById("error-display");
    errorBox.textContent = errorMessage;
    errorBox.style.display = "block";
  } else {
    console.error("❌ AJAX Routing Error:", error);
  }
}

/**
 * Resets the visual layout state before firing a clean request
 */
function clearDisplayErrors() {
  const errorBox = document.getElementById("error-display");
  errorBox.textContent = "";
  errorBox.style.display = "none";
}


