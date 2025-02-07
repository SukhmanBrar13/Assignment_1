/*******************************************************
 * Higher-order function for unit conversion
 *******************************************************/
function createConverter(fromUnit, toUnit) {
    /**
     * Returns a function that takes in a numeric "value" and
     * applies the correct conversion based on fromUnit -> toUnit.
     */
    return function (value) {
      let result;
  
      // Normalize to a key, e.g. "lb->kg", "kg->lb", etc.
      const conversionKey = `${fromUnit}->${toUnit}`;
  
      switch (conversionKey) {
        // Weight
        case "lb->kg":
          // 1 lb ≈ 0.453592 kg
          result = value * 0.453592;
          break;
        case "kg->lb":
          // 1 kg ≈ 2.20462 lb
          result = value * 2.20462;
          break;
  
        // Distance
        case "mi->km":
          // 1 mile ≈ 1.60934 km
          result = value * 1.60934;
          break;
        case "km->mi":
          // 1 km ≈ 0.621371 miles
          result = value * 0.621371;
          break;
  
        // Temperature
        case "c->f":
          // °F = °C * 9/5 + 32
          result = value * 9/5 + 32;
          break;
        case "f->c":
          // °C = (°F - 32) * 5/9
          result = (value - 32) * 5/9;
          break;
  
        default:
          // If the function doesn't recognize the key, just return the original value
          result = value;
          break;
      }
      return result;
    };
  }

  /*******************************************************
 * Text-to-Speech Function for Accessibility
 *******************************************************/
function speakResult(text) {
  if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.volume = 1; // Ensure volume is max
      utterance.rate = 1;   // Normal speaking rate
      utterance.pitch = 1;  // Normal pitch
      speechSynthesis.cancel(); // Stop any ongoing speech
      speechSynthesis.speak(utterance);
  } else {
      console.warn("Speech synthesis not supported in this browser.");
  }
}

  /*******************************************************
   * Attach event listeners once DOM is loaded
   *******************************************************/
  document.addEventListener("DOMContentLoaded", () => {
    // Tab switching logic
    document.querySelectorAll('button[data-tab-target]').forEach(button => {
      button.addEventListener('click', () => {
        // Hide all tab sections
        document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
  
        // Show the targeted section
        const target = button.getAttribute('data-tab-target');
        document.querySelector(target).classList.remove('hidden');
        document.addEventListener("DOMContentLoaded", () => {
          function handleConversion(inputElement, buttonElement, outputElement, fromUnit, toUnit) {
              buttonElement.addEventListener("click", () => {
                  const value = parseFloat(inputElement.value);
                  if (!isNaN(value)) {
                      const converter = createConverter(fromUnit, toUnit);
                      const converted = converter(value);
                      const resultText = `${value} ${fromUnit} = ${converted.toFixed(3)} ${toUnit}`;
                      outputElement.textContent = resultText;
                      
                      // Ensure user interaction before triggering speech
                      setTimeout(() => speakResult(resultText), 500);
                  }
              });
          }
      
          handleConversion(document.getElementById("lbInput"), document.getElementById("btnLbToKg"), document.getElementById("weightResult"), "lb", "kg");
          handleConversion(document.getElementById("kgInput"), document.getElementById("btnKgToLb"), document.getElementById("weightResult"), "kg", "lb");
          handleConversion(document.getElementById("milesInput"), document.getElementById("btnMilesToKm"), document.getElementById("distanceResult"), "mi", "km");
          handleConversion(document.getElementById("kmInput"), document.getElementById("btnKmToMiles"), document.getElementById("distanceResult"), "km", "mi");
          handleConversion(document.getElementById("celsiusInput"), document.getElementById("btnCtoF"), document.getElementById("temperatureResult"), "°C", "°F");
          handleConversion(document.getElementById("fahrenheitInput"), document.getElementById("btnFtoC"), document.getElementById("temperatureResult"), "°F", "°C");
      });
      
      });
    });
  
    /****** WEIGHT ******/
    const lbInput = document.getElementById("lbInput");
    const btnLbToKg = document.getElementById("btnLbToKg");
    const kgInput = document.getElementById("kgInput");
    const btnKgToLb = document.getElementById("btnKgToLb");
    const weightResult = document.getElementById("weightResult");
  
    btnLbToKg.addEventListener("click", () => {
      const value = parseFloat(lbInput.value);
      if (!isNaN(value)) {
        // Create a converter from lb -> kg
        const lbToKg = createConverter("lb", "kg");
        const converted = lbToKg(value);
        weightResult.textContent = `${value} lb = ${converted.toFixed(3)} kg`;
      }
    });
  
    btnKgToLb.addEventListener("click", () => {
      const value = parseFloat(kgInput.value);
      if (!isNaN(value)) {
        // Create a converter from kg -> lb
        const kgToLb = createConverter("kg", "lb");
        const converted = kgToLb(value);
        weightResult.textContent = `${value} kg = ${converted.toFixed(3)} lb`;
      }
    });
  
    /****** DISTANCE ******/
    const milesInput = document.getElementById("milesInput");
    const btnMilesToKm = document.getElementById("btnMilesToKm");
    const kmInput = document.getElementById("kmInput");
    const btnKmToMiles = document.getElementById("btnKmToMiles");
    const distanceResult = document.getElementById("distanceResult");
  
    btnMilesToKm.addEventListener("click", () => {
      const value = parseFloat(milesInput.value);
      if (!isNaN(value)) {
        // Create a converter from mi -> km
        const milesToKm = createConverter("mi", "km");
        const converted = milesToKm(value);
        distanceResult.textContent = `${value} mi = ${converted.toFixed(3)} km`;
      }
    });
  
    btnKmToMiles.addEventListener("click", () => {
      const value = parseFloat(kmInput.value);
      if (!isNaN(value)) {
        // Create a converter from km -> mi
        const kmToMiles = createConverter("km", "mi");
        const converted = kmToMiles(value);
        distanceResult.textContent = `${value} km = ${converted.toFixed(3)} mi`;
      }
    });
  
    /****** TEMPERATURE ******/
    const celsiusInput = document.getElementById("celsiusInput");
    const btnCtoF = document.getElementById("btnCtoF");
    const fahrenheitInput = document.getElementById("fahrenheitInput");
    const btnFtoC = document.getElementById("btnFtoC");
    const temperatureResult = document.getElementById("temperatureResult");
  
    btnCtoF.addEventListener("click", () => {
      const value = parseFloat(celsiusInput.value);
      if (!isNaN(value)) {
        // Create a converter from c -> f
        const cToF = createConverter("c", "f");
        const converted = cToF(value);
        temperatureResult.textContent = `${value} °C = ${converted.toFixed(2)} °F`;
      }
    });
  
    btnFtoC.addEventListener("click", () => {
      const value = parseFloat(fahrenheitInput.value);
      if (!isNaN(value)) {
        // Create a converter from f -> c
        const fToC = createConverter("f", "c");
        const converted = fToC(value);
        temperatureResult.textContent = `${value} °F = ${converted.toFixed(2)} °C`;
      }
    });
  });
  


